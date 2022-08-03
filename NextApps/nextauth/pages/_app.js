import 'reflect-metadata';
import { Provider } from 'next-auth/client';
import 'antd/dist/antd.css';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
