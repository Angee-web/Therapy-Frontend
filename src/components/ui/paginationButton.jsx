import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";

const PaginationButtons = () => {
  // State to track the active page (default to page 1)
  const [activePage, setActivePage] = useState(1);

  const location = useLocation();

  // Effect to update the active page based on the current location
  useEffect(() => {
    if (location.pathname.includes("/therapy/therapist-details")) {
      setActivePage(2); // Set to page 2 if on therapist details page
    } else {
      setActivePage(1); // Default to page 1
    }
  }, [location]);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="mt-4 flex">
      {/* Button for Page 1 */}
      <button
        onClick={() => handlePageChange(1)}
        className={`text-lg border-none rounded-full px-3 py-1 
          ${
            activePage === 1
              ? "bg-blue-400 text-white"
              : "text-blue-600 border-blue-600"
          }`}
      >
        1
      </button>

      {/* Button for Page 2 */}
      <button
        onClick={() => handlePageChange(2)}
        className={`text-lg border-none rounded-full px-3 py-1 
          ${
            activePage === 2
              ? "bg-blue-400 text-white"
              : "text-blue-600 border-blue-600"
          }`}
      >
        2
      </button>

      {/* <div className=" mt-1 flex items-center justify-center gap-2">
        <p className="font-semibold">Next</p>
        <a href="#">
          <IoIosArrowForward />
        </a>
      </div> */}
    </div>
  );
};

export default PaginationButtons;
