import React from "react";
import error from "../assets/images/Error404.png";

const Page404 = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#f9f9f9",
        backgroundImage: `url(${error})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
};

export default Page404;
