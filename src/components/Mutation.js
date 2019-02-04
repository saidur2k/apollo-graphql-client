import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    createProduct(product: $product) {
      name
      description
    }
  }
`;

const DataInput = () => {
  let nameInput;
  let descriptionInput;
  return (
    <Mutation mutation={CREATE_PRODUCT}>
      {(createProduct, { data, loading, error }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              createProduct({
                variables: {
                  product: { 
                      name: nameInput.value, 
                      description: descriptionInput.value 
                    }
                }
              });
              nameInput.value = "";
              descriptionInput.value = "";
            }}
          >
            <input
              ref={node => {
                nameInput = node;
              }}
            />

            <input name
              ref={node => {
                descriptionInput = node;
              }}
            />
            <button type="submit">Create Product</button>

            {loading && <div>adding product</div>}
            {data && <div>response data {JSON.stringify(data)} </div> }
            {error && <div>Error adding product</div>}
          </form>
        </div>
      )}
    </Mutation>
  );
};
export default DataInput;
