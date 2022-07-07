import { UxWrapper } from "../contexts/uxContext";
import Layout from "../components/Layout/Layout";
import { AuthGuard } from "../contexts/AuthGuard";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UxWrapper>
      {pageProps.protected ? (
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </UxWrapper>
  );
}

export default MyApp;
