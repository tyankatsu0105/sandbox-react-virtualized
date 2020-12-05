import React from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { AppProps } from 'next/app';

import { theme } from '~client/modules/theme';
import 'minireset.css';
import '~client/styles/form-reset.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StyledThemeProvider theme={theme}>
      <Component {...pageProps} />
    </StyledThemeProvider>
  );
};

export default CustomApp;
