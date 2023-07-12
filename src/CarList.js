import React, { useState, useEffect } from "react";
import CarSearch from "./Components/CarSearch";
import Pagination from "./Components/Pagination";
import Modal from "./Components/Modal";

import "./css/CarList.css";

export default function CarList() {
  const [carData, setCarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [action, setAction] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onClose = () => {
    setSelectedCar(null);
    setAction("");
  };

  const carsPerPage = 20;

  // Fetch car data from the API or local storage
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const storedCarData = localStorage.getItem("carData");

        if (storedCarData && !isSaved) {
          setCarData(JSON.parse(storedCarData));
        } else {
          const response = await fetch("https://myfakeapi.com/api/cars/");
          const data = await response.json();
          const cars = data.cars;

          setCarData(cars);
          localStorage.setItem("carData", JSON.stringify(cars));
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [isSaved, carData.length]);

  const handlePageChange = (page) => {
    const totalPages = Math.ceil(carData.length / carsPerPage);
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carData.slice(indexOfFirstCar, indexOfLastCar);

  const handleActionChange = (event) => {
    const action = event.target.value;
    const selectedCarId = Number(
      event.target.parentElement.parentElement.getAttribute("data-id")
    );

    const selectedCar = carData.find((car) => car.id === selectedCarId);

    setSelectedCar(selectedCar);
    setAction(action);

    // Clear the value of the <select> element
    event.target.value = "";
  };

  const [isAddingCar, setIsAddingCar] = useState(false); // Add a new state for tracking the add car modal

  const openAddCarModal = () => {
    setSelectedCar(null);
    setAction("add");
    setIsAddingCar(true); // Set the state to true to open the add car modal
  };

  const closeAddCarModal = () => {
    setAction("");
    setIsAddingCar(false); // Set the state to false to close the add car modal
  };

  const tableRows = currentCars.map((car) => (
    <tr key={car.id} data-id={car.id}>
      <td>{car.car}</td>
      <td>{car.car_model}</td>
      <td>{car.car_vin}</td>
      <td>{car.car_color}</td>
      <td>{car.car_model_year}</td>
      <td>{car.price}</td>
      <td>{car.availability.toString()}</td>
      <td>
        <select className="actions-dropdown" onChange={handleActionChange}>
          <option value=""></option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </td>
    </tr>
  ));

  return (
    <>
      <header>
        <h1 className="car-list-title">Car List</h1>
        <nav className="car-list-nav">
          <button className="add-car-btn btn" onClick={openAddCarModal}>
            Add Car
          </button>
          <CarSearch
            carData={carData}
            handleActionChange={handleActionChange}
            setSelectedCar={setSelectedCar}
            setAction={setAction}
          />
        </nav>{" "}
      </header>
      <main className="car-list">
        <table
          id="carTable"
          className="car-table table table-striped table-dark"
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
        <Pagination
          totalCars={carData.length}
          carsPerPage={carsPerPage}
          onPageChange={handlePageChange}
        />
        {(selectedCar || action === "add" || isAddingCar) && (
          <Modal
            car={selectedCar}
            mode={action}
            onClose={onClose}
            closeAddCarModal={closeAddCarModal}
            carData={carData} // Pass the carData prop
            setCarData={setCarData} // Pass the setCarData prop
          />
        )}
      </main>
    </>
  );
}
