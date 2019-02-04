import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloLink, concat } from 'apollo-link'

import { ApolloProvider } from "react-apollo";
import Data from "./components/Data";
import Polling from "./components/Polling";
import Refetch from "./components/Refetch";
import Mutation from "./components/Mutation";
import Subscription from "./components/Subscription";
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { createHttpLink, HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities';
// import { createNetworkInterface } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

  // const client = new ApolloClient({
  //   uri: 'http://localhost:4000/graphql',
  //   cache: new InMemoryCache()
  // })


const localHTTPGraphQL = "http://localhost:4000/graphql";
const localWSGraphQL = "ws://localhost:4000/graphql";

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription',
  )

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink(
    new SubscriptionClient(localWSGraphQL, {
      reconnect: true,
    }),
  ),
  createHttpLink({
    uri: localHTTPGraphQL,
  }),
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My Apollo app </h2>
          {/* <Data /> */}
          {/* <Polling /> */}
          <Refetch />
          <Subscription />
          <Mutation/>
        </div>
     </ApolloProvider>
    );
  }
}
export default App;