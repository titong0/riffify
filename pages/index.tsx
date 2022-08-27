import React, { useEffect, useState } from "react";
import Search from "../components/Search";

const index = () => {
  return (
    <div>
      <h1 className="text-2xl my-8 text-center">Auto heardle</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-xl m-2">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default index;
