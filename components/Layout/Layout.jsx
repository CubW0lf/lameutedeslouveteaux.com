import Head from "next/head";
import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
// import "./Layout.css";

const Layout = (props) => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <NavbarMobile />
      <div className="pusher"></div>
      {props.children}
    </>
  );
};

export default Layout;
