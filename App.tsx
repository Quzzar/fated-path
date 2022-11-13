import React, { useState } from 'react';

import { store } from './src/store';
import { Provider } from 'react-redux';

import { ThemeContext } from './src/contexts/theme-context';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import AppLoader from './AppLoader';

const queryClient = new QueryClient();

export default function App() {

  const [themeType, setThemeType] = useState('dark');

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ type: themeType, setType: setThemeType }}>
          <AppLoader />
        </ThemeContext.Provider>
      </QueryClientProvider>
    </Provider>
  );

}

