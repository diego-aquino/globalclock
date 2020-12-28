import { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { LocationContextProvider } from 'contexts/location';
import theme from 'styles/theme';
import GlobalStyle from 'styles/global';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <LocationContextProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </LocationContextProvider>
  </ThemeProvider>
);

export default App;
