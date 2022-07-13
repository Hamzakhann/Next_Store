import React from "react";
import client from "../../libs/shopify_client/shopify_client";

const collection = ({ response }) => {
  let [collection, setCollection] = React.useState(JSON.parse(response));
  // console.log(client.product.variantForOptions(col));
  async function addToCart(cartDetails) {
    let setToStorage = [];
    let variantId = await client.product.fetch(cartDetails.id);

    cartDetails.variantId = variantId.variants[0].id;

    let getFromStorage = JSON.parse(localStorage.getItem("cart"));

    if (getFromStorage !== null) {
      if (getFromStorage[0]) {
        getFromStorage.filter((item) => {
          if (item.id !== cartDetails.id) {
            cartDetails.quantity = 1;
            setToStorage = [...getFromStorage, cartDetails];
            localStorage.setItem("cart", JSON.stringify(setToStorage));
          } else {
            let quantity;
            let filteredArr = getFromStorage.filter(
              (item) => item.id !== cartDetails.id
            );
            getFromStorage.map((item) => {
              if (item.id === cartDetails.id) {
                quantity = item.quantity + 1;
                cartDetails.quantity = quantity;
                setToStorage = [...filteredArr, cartDetails];
                localStorage.setItem("cart", JSON.stringify(setToStorage));
              }
            });
          }
        });
      } else {
        cartDetails.quantity = 1;

        setToStorage = [...getFromStorage, cartDetails];
        localStorage.setItem("cart", JSON.stringify(setToStorage));
      }
    } else {
      cartDetails.quantity = 1;
      setToStorage.push(cartDetails);
      localStorage.setItem("cart", JSON.stringify(setToStorage));
    }
  }

  return (
    <div style={{ cursor: "pointer" }}>
      <div>
        <h5>{collection.title}</h5>
        <img
          src={collection.images[0].src}
          style={{ width: "400px", display: "block" }}
        />
        {collection.options.map((opt, i) => (
          <div key={i}>
            <p>
              {opt.name}: {opt.values[0].value}
            </p>
          </div>
        ))}
        <button
          onClick={() =>
            addToCart({
              image: collection.images[0].src,
              title: collection.title,
              id: collection.id,
            })
          }
        >
          Add to card
        </button>
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
