import { Provider } from 'next-auth/client';

import 'antd/dist/antd.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
        keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
      }}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
