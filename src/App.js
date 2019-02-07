import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloLink } from 'apollo-link'

import { ApolloProvider } from "react-apollo";
import DataQuery from "./components/DataQuery";
import Polling from "./components/Polling";
import Refetch from "./components/Refetch";
import Mutation from "./components/Mutation";
import Subscription from "./components/Subscription";
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory';

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
          <h2>Simple Apollo app </h2>
          <hr/>
          <h3>DataQuery</h3>
          <DataQuery />
          <hr/>
          <h3>Refetch</h3>
          <Refetch />
          <hr />
          <h3>Subscription</h3>
          <Subscription />
          <hr />
          <h3>Polling</h3>
          <Polling />
          <h3>Mutation</h3>
          <Mutation/>
        </div>
     </ApolloProvider>
    );
  }
}
export default App;