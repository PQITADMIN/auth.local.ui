import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <section className="px-4 py-24 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-center lg:w-2/3">
          <h1 className="mb-4 text-6xl font-thin text-gray-900">404</h1>
          <p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
            Oh no! We couldn’t find the page you were looking for.
          </p>
          <p className="mb-3 text-lg font-medium text-gray-700">
            Have questions? Head over to our
            <Link to="/" className="underline">
              {" "}
              product documentation{" "}
            </Link>
            , visit our{" "}
            <Link to="/" className="underline">
              Community
            </Link>{" "}
            for tutorials and the latest happenings, or go back to the
            <Link to="/" className="underline">
              {" "}
              homepage
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
