import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  console.log("MyApp - pageProps.siteSettings received:", pageProps.siteSettings);

  return (
    <Layout siteSettings={pageProps.siteSettings}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
