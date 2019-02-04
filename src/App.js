import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloLink, concat } from 'apollo-link'

import { ApolloProvider } from "react-apollo";
import Data from "./components/Data";
import Polling from "./components/Polling";
import Refetch from "./components/Refetch";
import Mutation from "./components/Mutation";
import Subscription from "./components/Subscription";
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities';

const hasSubscriptionOperation = ({ query: { definitions } }) =>
({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
}

const localGraphQL = "http://localhost:4000/graphql";


const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink(
    new SubscriptionClient('ws://localhost:4000/graphql', {
      reconnect: true,
      keepAlive: true
    }),
  ),
  createHttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
)


const client = new ApolloClient({ 
  link,
  uri: localGraphQL
});


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