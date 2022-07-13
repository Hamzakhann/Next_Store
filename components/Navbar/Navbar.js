import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const router = useRouter();
  let [cart, setCart] = useState("");

  useEffect(() => {
    setInterval(() => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      let num = 0;
      cart.map((item) => {
        num = item.quantity + num;
      });
      setCart(num);
    }, 500);
  }, []);

  return (
    <div className={styles.main_navbar_container}>
      <h3 onClick={() => router.push("/")}>My Store</h3>
      <div className={styles.cart} onClick={() => router.push("/cart")}>
        <div className={styles.items}>{cart != null ? cart : 0}</div>
        <h3>Cart</h3>
      </div>
    </div>
  );
};

export default Navbar;
