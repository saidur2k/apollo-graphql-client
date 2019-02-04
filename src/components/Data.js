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

const Data = () => (
  <Query query={getData}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading…</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          <h1>Data</h1>
          {data.products.map(({ id, name, description }) => (
            <div key={id}>
              <p>{`${name}: ${description}`}</p>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);
export default Data;
