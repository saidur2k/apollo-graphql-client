import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_DATA = gql`
  {
    products {
      id
      name
      description
    }
  }
`;

const POLL_INTERVAL = 1000
const Polling = () => (
  <Query query={GET_DATA} pollInterval={POLL_INTERVAL}>
    {({loading, error, data, startPolling, stopPolling}) => {

      if (loading) {
        return <div>Loadin polling</div>;
      }

      if (error) return `Error!: ${error}`;
      
      return (
        <div>
          <h1>Polling</h1>
          { data.products.map(p => (
            <div>{JSON.stringify(p)}</div>
          ))}
          <button onClick={() => startPolling(POLL_INTERVAL)}>Start polling</button>
          <button onClick={() => stopPolling()}>Stop polling</button>
        </div>
      );
    }}
  </Query>
);

export default Polling;
