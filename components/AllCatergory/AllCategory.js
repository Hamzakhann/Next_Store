import { useRouter } from "next/router";
import React from "react";
import client from "../../libs/shopify_client/shopify_client";
import styles from "./AllCategory.module.scss";

const AllCategory = ({ catergoryTitle, categoryImage, collId }) => {
  const router = useRouter();

  function fetchAllProducts(id) {
    const str = id;
    const [word, digits] = str.match(/\D+|\d+/g);
    router.push(`/${digits}`);
  }
  return (
    <div style={{ cursor: "pointer" }} onClick={() => fetchAllProducts(collId)}>
      <div>
        <h5>{catergoryTitle}</h5>
        <img src={categoryImage} />
      </div>
    </div>
  );
};

export default AllCategory;
