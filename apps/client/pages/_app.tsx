import React from 'react';

import { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';
import { theme } from '~client/styles/theme';
import { GlobalStyle } from '~client/styles/global-style';

import * as Shared from '~client/shared';

import 'minireset.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Shared.Header.Component />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
