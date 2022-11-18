import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';

const App = ({ Component, pageProps }: AppProps) => {
  const client = initializeApollo();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};
export default App;
