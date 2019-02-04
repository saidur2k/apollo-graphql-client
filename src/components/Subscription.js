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
      <h4>New product: {!loading && JSON.stringify(data, productCreated)}</h4>
    )}
  </Subscription>
);

export default Refetch;
