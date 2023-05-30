import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

const Homepage = () => {
  return (
    <div className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <Sidebar />
      <Feed />
      {/* <Widgets /> */}

      {/* <Modal /> */}
    </div>
  );
};

export default Homepage;
