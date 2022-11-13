import React, { useContext } from 'react';

const ThemeContext = React.createContext({ type: '', setType: (type: string) => {} });

const Colors = {
  dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'],
  gray: ['#F8F9FA', '#F1F3F5', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#868E96', '#495057', '#343A40', '#212529'],
};

const RelativeColor = {
  getTextColor(){
    const theme = useContext(ThemeContext);
    return (theme.type == 'dark') ? Colors.gray[4] : Colors.dark[7];
  },
  getBorderColor(){
    const theme = useContext(ThemeContext);
    return (theme.type == 'dark') ? Colors.gray[2] : Colors.dark[8];
  },
  getBackgroundColor(){
    const theme = useContext(ThemeContext);
    return (theme.type == 'dark') ? Colors.dark[7] : Colors.gray[2];
  },
  getBackgroundBarColor(){
    const theme = useContext(ThemeContext);
    return (theme.type == 'dark') ? Colors.dark[8] : Colors.gray[3];
  }
};

export {
  ThemeContext,
  Colors,
  RelativeColor,
}