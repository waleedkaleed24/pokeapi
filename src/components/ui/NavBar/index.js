import React from "react";
import { Link } from "react-router-dom";
import pokeball from "./pokeball.png";

const index = () => {
  return (
    <>
      <nav className="bg-red-400 h-20 mb-10 flex items-center justify-between px-2">
        <div className="container m-auto flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to={`/`}>
              <img
                className="w-16 h-16 mr-4 animate-pulse"
                src={pokeball}
                alt="Logo"
              />
            </Link>
            <span className="font-semibold text-2xl tracking-tight uppercase">
              Pokémon
            </span>
          </div>
          <div className="block ">
            <Link
              to={`/`}
              className="flex items-center px-3 py-2 border rounded text-white hover:border-white"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default index;
