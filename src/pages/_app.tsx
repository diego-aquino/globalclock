import { FC } from 'react';
import { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
