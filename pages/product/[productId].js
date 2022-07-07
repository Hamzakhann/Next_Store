import React from "react";
import client from "../../libs/shopify_client/shopify_client";

const collection = ({ response }) => {
  let [collection, setCollection] = React.useState(JSON.parse(response));
  console.log(collection);
  return (
    <div style={{ cursor: "pointer" }}>
      <div>
        <h5>{collection.title}</h5>
        <img src={collection.images[0].src} />
        {collection.options.map((opt, i) => (
          <p key={i}>
            {opt.name}: {opt.values[0].value}
          </p>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let productId = context.params.productId;
  productId = `gid://shopify/Product/${productId}`;
  let response;
  try {
    let responseStore = await client.product.fetch(productId);
    response = responseStore;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      response: JSON.stringify(response),
    },
  };
}

export default collection;
