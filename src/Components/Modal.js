import React, { useState } from "react";
import "../css/Modal.css";

export default function Modal({
  car,
  mode,
  onClose,
  closeAddCarModal,
  carData,
  setCarData
}) {
  const [company, setCompany] = useState(car ? car.car : "");
  const [model, setModel] = useState(car ? car.car_model : "");
  const [VIN, setVIN] = useState(car ? car.car_vin : "");
  const [color, setColor] = useState(car ? car.car_color : "");
  const [year, setYear] = useState(car ? car.car_model_year : "");
  const [price, setPrice] = useState(car ? car.price : "");
  const [availability, setAvailability] = useState(
    car ? car.availability?.toString() : ""
  );
  // const [action, setAction] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const updatedCar = {
      id: car ? car.id : null,
      car: company,
      car_model: model,
      car_vin: VIN,
      car_color: color,
      car_model_year: year,
      price: price,
      availability: availability === "true",
    };

    const carDataCopy = [...carData];
    const updatedCarIndex = carDataCopy.findIndex(
      (car) => car.id === updatedCar.id
    );

    if (updatedCarIndex !== -1) {
      carDataCopy[updatedCarIndex] = updatedCar;
      setCarData(carDataCopy);
      localStorage.setItem("carData", JSON.stringify(carDataCopy));
      setIsSaved(true);
    }
    console.log("save1");
    onClose();
    console.log("save2");
  };

  const handleDelete = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Logic to delete the car from the carData array
    const updatedCarData = carData.filter((carItem) => carItem.id !== car.id);
    setCarData(updatedCarData);
    localStorage.setItem("carData", JSON.stringify(updatedCarData));

    onClose();
  };

  const handleAddCar = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if any of the fields are empty
    if (
      !company ||
      !model ||
      !VIN ||
      !color ||
      !year ||
      !price ||
      !availability
    ) {
      alert("Please fill in all car information.");
      return;
    }

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const newCar = {
      id: timestamp,
      car: company,
      car_model: model,
      car_vin: VIN,
      car_color: color,
      car_model_year: year,
      price: price,
      availability: availability === "true",
    };

    const updatedCarData = [ newCar, ...carData ]; // Add the new car to the existing carData array
    setCarData(updatedCarData); // Update the state with the new carData

    localStorage.setItem("carData", JSON.stringify(updatedCarData)); // Update the carData in local storage
    
    console.log("add1");
    closeAddCarModal();
    console.log(newCar);
    console.log("add2");
  };

  return (
    <div className="modal-container">
      <div className="list-modal">
        <form className="list-modal-content">
          {mode === "edit" && <h2>Edit car</h2>}
          {mode === "delete" && <h2>Delete car</h2>}
          {mode === "add" && <h2>Add new car</h2>}
          <ul>
            <li>
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => {
                  console.log("Company input value:", e.target.value);
                  setCompany(e.target.value);
                }}
                disabled={mode !== "add"}
              />
            </li>

            <li>
              <label htmlFor="model">Model:</label>
              <input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={mode !== "add"}
              />
            </li>

            <li>
              <label htmlFor="VIN">VIN:</label>
              <input
                type="text"
                id="VIN"
                value={VIN}
                onChange={(e) => setVIN(e.target.value)}
                disabled={mode !== "add"}
              />
            </li>

            <li>
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                disabled={mode === "delete"}
              />
            </li>

            <li>
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={mode === "delete"}
              />
            </li>

            <li>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={mode === "delete"}
              />
            </li>

            <li>
              <label htmlFor="availability">Availability:</label>
              <input
                type="text"
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                disabled={mode === "delete"}
              />
            </li>
            {mode === "delete" && (
              <p className="delete-msg" onClick={handleDelete} type="submit">
                Are you sure sure you want to delete this car?
              </p>
            )}
            <li className="modal-actions">
              {mode === "edit" && (
                <button className="btn" onClick={handleSave} type="submit">
                  Save
                </button>
              )}
              {mode === "delete" && (
                <button className="btn" onClick={handleDelete} type="submit">
                  Delete
                </button>
              )}
              {mode === "add" && (
                <button className="btn" onClick={handleAddCar} type="submit">
                  Add new car
                </button>
              )}
              {mode === "add" && (
                <button
                  className="btn"
                  onClick={closeAddCarModal}
                  type="button"
                >
                  Cancel
                </button>
              )}
              {mode !== "add" && (
                <button className="btn" onClick={onClose} type="button">
                  Cancel
                </button>
              )}
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}