import React, { useContext, useEffect, useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

import { readAsStringAsync } from "expo-file-system";
import { useAssets } from "expo-asset";
import { RelativeColor } from '../../../contexts/theme-context';
import { getSavedWorld, setSavedWorld, WorldData } from '../../../saved-world';
import { View, Text } from 'react-native';
import Lottie from 'lottie-react-native';
import { getRandomElement, randomSeed } from '../math-utils';
import { g_setLoading } from '../../../contexts/load-context';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { selectLocationID, setLocationID } from '../../../slices/playerSlice';

export default function RenderMap() {

  const playerLocationID = useAppSelector(selectLocationID);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  function loadingHandler(value: boolean) {
    g_setLoading(value);
    setLoading(value);
  }

  useEffect(() => {
    loadingHandler(true);
  }, []);

  const backgroundColor = RelativeColor.getBackgroundColor();
  const textColor = RelativeColor.getTextColor();

  const [assets, assetsLoadingError] = useAssets([
    require('../terrain-gen-v2/index.html'),
    require('../terrain-gen-v2/_bundle.js.html'),
  ]);

  const [html, setHtml] = useState('');
  if (assets && assets[0] && assets[0].localUri) {
    readAsStringAsync(assets[0].localUri).then((data) => {
      setHtml(data);
    });
  }

  const [bundleJS, setBundleJS] = useState('');
  if (assets && assets[1] && assets[1].localUri) {
    readAsStringAsync(assets[1].localUri).then((data) => {
      setBundleJS(data);
    });
  }

  ///

  const webView = useRef<any>();

  function callInjection() {
    if (webView.current && bundleJS != '') {
      webView.current.injectJavaScript(`

        if(typeof injection_count === 'undefined'){
          var injection_count = 1;
        } else {
          injection_count++;
        }

        window.ReactNativeWebView.postMessage("LOG;~;Attempting code injection, count #"+injection_count);

        if(injection_count === 1){
          window.ReactNativeWebView.postMessage("READY-TO-INJECT;~;");
        }

        document.body.style.backgroundColor='${backgroundColor}';true;
        
        true;
      `);
    }
  }

  function handleMessage(e: WebViewMessageEvent) {
    const data = e.nativeEvent.data;

    const MessageType = {
      FINISH_LOAD: 'FINISH-LOAD',
      FINISH_GENERATE: 'FINISH-GENERATE',
      LOG: 'LOG',
      WARN: 'WARN',
      READY_TO_INJECT: 'READY-TO-INJECT',
    };

    let dParts = data.split(';~;');
    if (dParts[0] === MessageType.FINISH_GENERATE) {
      console.log('Finished generating!');

      const worldData = JSON.parse(dParts[1]) as WorldData;
      setSavedWorld(worldData);

      let newPlayerLocationID = getRandomElement(worldData.mapData.towns);
      console.log('Location: ' + newPlayerLocationID);
      dispatch(setLocationID(newPlayerLocationID));

      webView.current.injectJavaScript(`
        setPlayerData({
          version: '1.0',
          current_t_i: ${newPlayerLocationID},
        });
        true;
      `);

      loadingHandler(false);
    } else if (dParts[0] === MessageType.FINISH_LOAD) {
      console.log('Finished loading!');

      console.log('Location: ' + playerLocationID);

      webView.current.injectJavaScript(`
        setPlayerData({
          version: '1.0',
          current_t_i: ${playerLocationID},
        });
        true;
      `);

      loadingHandler(false);
    } else if (dParts[0] === MessageType.LOG) {
      console.log('WebView > ' + dParts[1]);
    } else if (dParts[0] === MessageType.WARN) {
      console.warn('WebView > ' + dParts[1]);
    } else if (dParts[0] === MessageType.READY_TO_INJECT) {

      let worldData = getSavedWorld();

      console.log('Injecting code...');
      webView.current.injectJavaScript(bundleJS + `

        ${((worldData != null) ? `loadState('${JSON.stringify(worldData)}');` : `newState('${randomSeed()}');`)}

        true;
      `);

    } else {
      console.warn('Unknown Webview Message: ' + data);
    }

  }

  return (
    <View style={{ flex: 1 }}>

      {
        (loading) ?
          <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 100, // works on ios
            elevation: 100, // works on android
            backgroundColor: backgroundColor,
          }}>
            <Lottie source={require('../../../assets/lottie/hexagon-loading.json')} autoPlay loop />
            <View style={{ top: '85%', }}>
              <Text style={{
                fontSize: 26,
                fontFamily: 'CrimsonText_600SemiBold',
                color: textColor,
                textAlign: 'center',
              }}> Loading world... </Text>
            </View>
          </View>
          :
          <View></View>
      }

      <WebView
        ref={webView}
        onLoad={callInjection}
        originWhitelist={['*']}
        source={{ html, baseUrl: '' }}
        onMessage={handleMessage}
      />

    </View>
  );

};