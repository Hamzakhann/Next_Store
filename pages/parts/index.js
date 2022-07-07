import React, { useState } from "react";
import client from "../../libs/shopify_client/shopify_client";

const index = ({ collection }) => {
  let [allCollections, setAllCollection] = useState(JSON.parse(collection));
  let [partsName, setPartsName] = useState([]);
  let [allParts, setAllParts] = useState([]);
  let [dummyPart, setDummyParts] = useState([]);
  function getUniqueListBy(col, key) {
    return [...new Map(col.map((item) => [item[key], item])).values()];
  }

  function fetchParts(id, col) {
    if (col.products[0] === undefined) {
      setDummyParts([]);
      setPartsName([]);
      setAllParts([]);
    } else {
      const arr2 = getUniqueListBy(col.products, "productType");
      setDummyParts(col.products);
      setAllParts([]);
      setPartsName(arr2);
    }
  }
  function getAllParts(type, allParts) {
    let filteredProducts = dummyPart.filter(
      (item) => item.productType === type
    );
    setAllParts(filteredProducts);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Parts</h1>
      <h3>All Parts here</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <div>
          <div>
            {allCollections.map((col) => (
              <p
                key={col.id}
                style={{ cursor: "pointer" }}
                onClick={() => fetchParts(col.id, col)}
              >
                {col?.title}
              </p>
            ))}
            <br />
          </div>

          {partsName.map((partsN) => (
            <div key={partsN.id}>
              <span
                onClick={() => getAllParts(partsN.productType, partsN)}
                style={{
                  cursor: "pointer",
                  margin: "0.1rem 0",
                  display: "block",
                  color: "#9c9a96",
                }}
              >
                {partsN.productType}
              </span>
              <br />
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {allParts.map((parts) => (
            <div key={parts.id}>
              <h5>{parts.title}</h5>
              <img
                src={parts.images[0].src}
                style={{ width: "250px", height: "250px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let response = [];
  try {
    let storeResponse1 = await client.collection.fetchByHandle("imac-parts");
    let storeResponse2 = await client.collection.fetchByHandle("iphone-parts");
    response.push(storeResponse1, storeResponse2);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      collection: JSON.stringify(response),
    },
  };
}

export default index;
