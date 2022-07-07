import React from "react";
import client from "../libs/shopify_client/shopify_client";
import AllCategory from "../components/AllCatergory/AllCategory";

const index = () => {
  let [allCatergory, setAllCatergory] = React.useState([]);

  async function fetchCollections() {
    try {
      let storeResponse = await client.collection.fetchAll();
      storeResponse = storeResponse.filter((res) => res.image !== null);
      setAllCatergory(storeResponse);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <div>
      <h1>Shopify Shore</h1>
      <h2>All collections</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
          padding: "3rem",
        }}
      >
        {allCatergory.map((category, i) => (
          <AllCategory
            key={i}
            catergoryTitle={category.title}
            categoryImage={category.image?.src}
            collId={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default index;
