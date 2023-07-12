import React, { useState } from "react";
import "../css/Search.css";

export default function CarSearch({ carData, setSelectedCar, setAction }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState(carData); // Initialize with all cars

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Split the search query into individual words
    const searchWords = query.toLowerCase().split(/\s+/);

    // Filter the carData based on the search query
    const filteredCars = carData.filter((car) => {
      // Combine car values into a single string for searching
      const carValues = Object.values(car).join(" ").toLowerCase();

      // Check if all search words are present in the car values
      return searchWords.every((word) => carValues.includes(word));
    });

    setFilteredCars(filteredCars);
  };

  const handleActionChange = (event, carId) => {
    const action = event.target.value;
    const selectedCar = carData.find((car) => car.id === carId);

    setSelectedCar(selectedCar);
    setAction(action);

    // Clear the value of the <select> element
    event.target.value = "";
  };

  let tableRows = filteredCars.map((car) => (
    // Render the table rows for the filtered cars
    <tr key={car.id}>
      <td>{car.car}</td>
      <td>{car.car_model}</td>
      <td>{car.car_vin}</td>
      <td>{car.car_color}</td>
      <td>{car.car_model_year}</td>
      <td>{car.price}</td>
      <td>{car.availability.toString()}</td>
      <td>
        <select
          className="actions-dropdown"
          onChange={(event) => handleActionChange(event, car.id)}
        >
          <option value=""></option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </td>
    </tr>
  ));

  if (tableRows.length === 0) {
    tableRows = (
      <tr>
        <td colSpan="9" className="no-results">
          No results
        </td>
      </tr>
    );
  }

  return (
    <div>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search cars..."
        />
      </form>
      {searchQuery !== "" && (
        <div id="car-search-table">
          <h3>Search Results</h3>
          <table
            id="car-search-table-content"
            className="car-search-table table table-striped table-dark"
          >
            <thead>
              <tr>
                <th>Company</th>
                <th>Model</th>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
