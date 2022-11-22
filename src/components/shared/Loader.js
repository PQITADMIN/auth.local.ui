import React from "react";
/**@file Loader.js is the loader component to simple show the loading state. */

function Loader() {
  return (
    <div
      className={`fixed top-0 left-0 z-50 block h-full w-full bg-white opacity-75`}
    >
      <div className="flex h-screen flex-col items-center justify-center">
        <div
          className={`h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-indigo-500`}
        ></div>
      </div>
    </div>
  );
}

export default Loader;
