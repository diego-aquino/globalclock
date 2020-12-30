import { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { LocationContextProvider } from 'contexts/location';
import theme from 'styles/theme';
import GlobalStyle from 'styles/global';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </LocationContextProvider>
    </ThemeProvider>
  </>
);

export default App;
