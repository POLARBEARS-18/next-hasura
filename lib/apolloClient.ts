import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // SSGとSSRで、常に新しいapolloクライアントを作成
  if (typeof window === 'undefined') return _apolloClient;
  // クライアントでもう一度apolloクライアントを作成
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};
