import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const getData = gql`
  {
    products {
      id
      name
      description
    }
  }
`;

const DataQuery = () => (
  <Query query={getData}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading…</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          <h1>Data</h1>
          { data.products.map(p => (
            <div key={p.id}>{JSON.stringify(p)}</div>
          ))}
        </div>
      );
    }}
  </Query>
);
export default DataQuery;
