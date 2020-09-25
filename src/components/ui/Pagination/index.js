import React from "react";

const Pagination = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div className=" w-full bg-red-400 p-6 md:px-0 mt-10">
      <div className="container m-auto  flex justify-between items-center">
        {gotoPrevPage && (
          <button
            className="flex items-center px-3 py-2 border rounded text-white hover:border-white mr-4"
            onClick={gotoPrevPage}
          >
            Previous Page
          </button>
        )}
        {gotoNextPage && (
          <button
            className="flex items-center px-3 py-2 border rounded text-white hover:border-white"
            onClick={gotoNextPage}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
