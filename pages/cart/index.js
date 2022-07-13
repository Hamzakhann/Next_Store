import React, { useEffect, useState } from "react";
import client from "../../libs/shopify_client/shopify_client";

const index = () => {
  let [cart, setCart] = useState([]);
  useEffect(() => {
    let getFromStorage = JSON.parse(localStorage.getItem("cart"));
    setCart(getFromStorage);
  }, []);

  async function checkOut() {
    let checkout = await client.checkout.create();
    let id = checkout.id;
    const lineItemsToAdd = [];

    cart.map((item) => {
      lineItemsToAdd.push({
        variantId: item.variantId,
        quantity: item.quantity,
      });
    });
    const shippingAddress = {
      address1: "Gulshan",
      address2: "Apartment 2",
      city: "Karachi",
      company: "XYZ",
      country: "Pakistan",
      firstName: "Abdul",
      lastName: "Saboor",
      phone: "555-625-1199",
      province: "Sindh",
      zip: "75160",
    };
    if (checkout) {
      await client.checkout.addLineItems(id, lineItemsToAdd);
      await client.checkout.updateShippingAddress(id, shippingAddress);
      client.checkout.fetch(id).then((cart) => (window.location = cart.webUrl));
    }
  }

  function removeCartItem(id) {
    let filteredCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setCart(filteredCart);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <h1>Cart</h1>
        {cart?.length <= 0 ? (
          <button onClick={() => checkOut()} disabled>
            CheckOut
          </button>
        ) : (
          <button onClick={() => checkOut()}>CheckOut</button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        {cart?.map((item, i) => (
          <div
            key={i}
            style={{
              border: "2px solid black",
              width: "450px",
              padding: "1rem",
            }}
          >
            <p>serial no. {i + 1}</p>
            <p>Title : {item.title}</p>
            <p>Quantity : {item.quantity}</p>
            <img
              src={item.image}
              style={{ width: "400px", display: "block" }}
            />
            <button onClick={() => removeCartItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
