import React from "react";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = ({ children, cart }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
