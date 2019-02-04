import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Data from "./components/Data";
import Polling from "./components/Polling";
import Refetch from "./components/Refetch";
import Mutation from "./components/Mutation";

const localGraphQL = "http://localhost:4000/graphql";

const client = new ApolloClient({
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
          <Mutation/>
        </div>
     </ApolloProvider>
    );
  }
}
export default App;