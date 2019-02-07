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
          <h4>Create a new product</h4>
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
            <label htmlFor="productName">Product Name</label>
            <input name="productName"
              ref={node => {
                nameInput = node;
              }}
            />
            <br/>
            <label htmlFor="productDescription">Product Description</label>
            <input name="productDescription"
              ref={node => {
                descriptionInput = node;
              }}
            />
            <br/>
            <button type="submit">Create Product</button>

            {loading && <div>adding product</div>}
            {data && <div>Created a new product {JSON.stringify(data)} </div> }
            {error && <div>Error adding product</div>}
          </form>
        </div>
      )}
    </Mutation>
  );
};
export default DataInput;
