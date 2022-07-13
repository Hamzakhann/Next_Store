import { useRouter } from "next/router";
import React from "react";
import client from "../libs/shopify_client/shopify_client";

const collection = ({ response }) => {
  const router = useRouter();
  let [collection, setCollection] = React.useState(JSON.parse(response));

  function fetchProductsRedirect(id) {
    const str = id;
    const [word, digits] = str.match(/\D+|\d+/g);
    router.push(`/product/${digits}`);
  }

  return (
    <div style={{ cursor: "pointer" }}>
      {collection.products.map((item, i) => (
        <div onClick={() => fetchProductsRedirect(item.id)} key={i}>
          <h5>{item.title}</h5>
          <img
            src={item.images[0].src}
            style={{ width: "400px", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  let collecctionId = context.params.collectionId;
  collecctionId = `gid://shopify/Collection/${collecctionId}`;
  let response;
  try {
    let responseStore = await client.collection.fetchWithProducts(
      collecctionId
    );
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
