import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const CREATE_PRODUCT_SUBSCRIPTION = gql`
  subscription productCreated {
    productCreated {
      name
      description
    }
  }
`;

const Refetch = () => (
  <Subscription subscription={CREATE_PRODUCT_SUBSCRIPTION}>
    {({ data, productCreated, loading }) => (
      <div>
        <h1>Subscription</h1>
        {!loading && <h4>New product: <div key={data.productCreated.id}>{JSON.stringify(data.productCreated)}</div></h4>}
      </div>
    )}
  </Subscription>
);

export default Refetch;
