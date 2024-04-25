
import React, { Suspense, useState, useEffect } from "react";
//Importing Section
// const TopBar = import("../CommonLayout/TopBar");
import CustomNavbar from "./CustomNavbar";
import Footer from "../CommonLayout/Footer";

const Layout = (props) => {
  const userId = localStorage.getItem("userId");

  return (
    <React.Fragment>
    <Suspense>
      <div>
        <CustomNavbar />
        <div className="main-content">
          <div className="page-content">{props.children}</div>
          <Footer />
        </div>
      </div>
    </Suspense>
  </React.Fragment>
  );
};

export default Layout;
