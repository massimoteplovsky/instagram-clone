import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const headers = {
  'x-hasura-admin-secret':
    'AV92ILFS55qTQ1tyKiFx1O37SYjteVFzAavCUQEPBkjfcdJ8Zdrdo6oM8XcnjcJJ',
};

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://instagram-react1.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
