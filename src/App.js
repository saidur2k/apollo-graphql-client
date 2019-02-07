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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

const Index = () => <h2>Welcome</h2>;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <h2>Simple Apollo app </h2>
            <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/query/">DataQuery</Link>
              </li>
              <li>
                <Link to="/refetch/">Refetch</Link>
              </li>
              <li>
                <Link to="/polling/">Polling</Link>
              </li>
              <li>
                <Link to="/subscription/">Subscription</Link>
              </li>
            </ul>
            </nav>
            <hr />
            <Route path="/" exact component={Index} />
            <Route path="/query/" component={DataQuery} />
            <Route path="/subscription/" component={Subscription} />
            <Route path="/polling/" component={Polling} />
            <Route path="/refetch/" component={Refetch} />
            <hr />
            <Mutation />
          </div>
        </Router>
     </ApolloProvider>
    );
  }
}
export default App;