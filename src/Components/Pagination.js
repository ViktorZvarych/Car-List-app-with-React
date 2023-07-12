import React, { useState } from "react";

import "../css/Pagination.css";

export default function Pagination({ totalCars, carsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalCars / carsPerPage); // Calculate the total number of pages
  const [currentPage, setCurrentPage] = useState(1); // Initialize the current page state

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page state
    onPageChange(page); // Call the onPageChange function passed as a prop
  };

  // Create an array of page numbers from 1 to the total number of pages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav>
      <ul className="pagination">
        {/* Map over the pageNumbers array and render the page buttons */}
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`} // Apply the "active" class to the current page button
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}