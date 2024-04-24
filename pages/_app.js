import '../styles/globals.css';
import { WindowSizeProvider } from '@/context/window-size-context/window-size-context';
// import GoogleAnalytics from '@/components/shared/google-analytics/google-analytics';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <GoogleAnalytics /> */}
      <WindowSizeProvider>
        <Component {...pageProps} />
      </WindowSizeProvider>
    </>
  );
}
