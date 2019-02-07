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

const Refetch = () => (
  <Query query={GET_DATA}>
    {({loading, error, data, refetch}) => {
      if (loading) return `Refetch loading`;
      if (error) return `Error!: ${error}`;
      return (
        <div>
            <h1>Refetch</h1>
            <button onClick={() => refetch()}>Fetch</button>
            { data.products.map(p => (
            <div key={p.id}>{JSON.stringify(p)}</div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Refetch;
