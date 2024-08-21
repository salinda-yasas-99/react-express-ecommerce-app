import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, addYears } from "date-fns";
import axios from 'axios';

const StockPrediction = () => {
  const shoeNames = [
    "ASICS MEN SPORTSTYLE SHOES CARAVA-BLACK",
    "ASICS MEN CPS SHOES RESTF-TEAL-WHITE",
    "VON WELLX MEN PUMPS SHOES TAN",
    "VICTORY SANTA CRUZ MEN LACING SHOE BLACK",
    "VICTORY SANTA CRUZ MEN LACING SHOE BROWN",
    "VICTORY SANTA CRUZ MEN LACING SHOE DARK BROWN",
    "PICCASO MENS LACING LEATHER SHOE BLACK",
    "PICCASO MEN LEATHER PUMP SHOE BROWN",
    "RED TAPE MENS BOOT TEAK",
    "AVI UNISEX BASKETBALL LACING SHOE NAVY/TURQUOISE",
    "AVI JOGGING LACING SHOE BLACK",
    "PUMA UNISEX AD-COURT PUMA BLACK-LIMEPUNCH-PUMA SILVER",
    "AVI BADMINTON LACING SHOE WHITE/ SKY",
    "FILA MEN SVELTASTL GRY/PRC BLU SHOES STEEL GREY/PRC BLUE",
    "AVI MENS CRICKET LACING SHOE WHITE/ RED/ BLACK",
    "AVI MENS BADMINTON SHOES BLUE/WHITE",
    "REEBOK MEN GENTS SHOES BLACK",
    "RED TAPE MEN BOOTS TAN",
    "ASICS MEN RUNNING SHOES YELLOW -WHITE",
    "FILA MEN DIO PEA/WHT SHOES PEACH/WHITE",
    "ASICS WOMEN CPS SHOES BLACK-PINK",
    "ASICS WOMEN RUNNING SHOES PIED GREY-PINK",
    "ASICS WOMEN RUNNING SHOES TARMAC-PINK",
    "SAMSONS WOMEN COURT SHOES BLACK",
    "PUMA WOMEN PUMA STATIC WMN ALMOND BLOSSOM-PUMA W",
    "PUMA WOMEN IVANA WN S IDP EGGSHELL BLUE-PUMA WHITE",
    "MELISSA WOMEN SLIP-ONS SANDALS L.BROWN",
    "WINNER LADIES LACING SHOE BLUE/PINK",
    "WINNER LADIES LACING SPORTY SHOE PINK",
    "WINNER LADIES LACING SPORTY SHOE BLACK/PINK",
    "WINNER LADIES LACING SHOE DARK GREY/PINK",
    "WINNER LADIES LACING SHOE BLACK",
    "PETALZ WOMEN COURT SHOES BLACK",
    "PETALZ WOMEN SLIDES SANDALS BLUE",
    "Petal Buckle Up Sandals/black/beige",
    "Lilly Ankle Tie Up Sandals/gold/ rose gold",
    "Ixora Slingback Sandals/black/bone",
    "Bubblegum Fairy Heart Flatforms",
    "Pansy Knotted Sliders/olive green/ beige",
    "Lanthe Buckel Up Block Heels/cofee brown/purple",
    "Zoya Block heels/black",
    "Frey Two Tone Glass Heels/purple/pink/orange",
    "FUN SOULS BOYS SHOES BLUE",
    "AVI BOYS CRICKET JUNIOR WHITE/GREEN",
    "AVI BOYS CRICKET JUNIOR WHITE/AQUA BLUE",
    "DISNEY BOYS SHOES WHITE & RED",
    "STAR KIDS BOYS SHOES BLUE/ORANGE",
    "FUN SOULS LASING SHOE BOYS BLUE",
    "FUN SOULS PUMP SHOE BOYS BLUE",
    "FUN SOULS BOYS COVERED SHOES BLUE",
    "FUN SOULS BOYS LACING SHOE RED",
    "STAR KIDS BOYS SLIDE SANDALS MULTY",
    "STAR KIDS SLIP ON SANDALS BOYS BLUE",
  ];

  const sizes = [3, 4, 5, 6, 7, 8, 9, 10];

  const [predictedValue, setPredictedValue] = useState('');

  const [item_name, setItemName] = useState('');
  const [shoe_category, setShoeCategory] = useState('');
  const [shoe_size, setShoeSize] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 10 }, (_, index) =>
    getYear(addYears(new Date(), index))
  );

  const handleShoeChange = (e) => {
    setItemName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setShoeCategory(e.target.value);
  };

  const handleSizeChange = (e) => {
    setShoeSize(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    const newMonth = months.indexOf(e.target.value);
    setStartDate(new Date(startDate.setMonth(newMonth)));
  };

  const handleYearChange = (e) => {
    const newYear = Number(e.target.value);
    setStartDate(new Date(startDate.setFullYear(newYear)));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowMonthYearPicker(false);
  };

  const handleTogglePicker = () => {
    setShowMonthYearPicker(!showMonthYearPicker);
  };

  const handlePredictClick = () => {
    const monthIndex = startDate.getMonth();
    const year = startDate.getFullYear();
    const formattedMonth = months[monthIndex].slice(0, 3);
    const formattedYear = year.toString().slice(-2);


    const payload = {
      shoe_category:[shoe_category],
      item_name:[item_name],
      shoe_size:[shoe_size],
      sold_month: [`${formattedMonth}-${formattedYear}`]
    }

    console.log(payload);


    axios.post('https://a870-34-106-47-216.ngrok-free.app/predict', payload)
      .then(response => {
        console.log('Prediction successful:', response.data);
        setPredictedValue(response.data.predictions[0])
      })
      .catch(error => {
        console.error('There was an error making the prediction request:', error);
      });
  };

  return (
    <div className="stock-prediction">
      <h2>Required Inventory Level</h2>

      <div className="stock-prediction-inputfileds">
        <select name="shoe-select" className="shoe-select" onChange={handleShoeChange}>
          <option value="" disabled selected>Select a shoe</option>
          {shoeNames.map((shoeName, index) => (
            <option key={index} value={shoeName}>
              {shoeName}
            </option>
          ))}
        </select>

        <select name="category-select" className="category-select" onChange={handleCategoryChange}>
          <option value="" disabled selected>Select a category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <select name="size-select" className="size-select" onChange={handleSizeChange}>
          <option value="" disabled selected>Select a size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <div className="calendar-selector">
          <button onClick={handleTogglePicker}>
            {months[startDate.getMonth()]} {startDate.getFullYear()}
          </button>

          {showMonthYearPicker && (
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              inline
            />
          )}

          <select
            name="year-select"
            value={startDate.getFullYear()}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="month-select"
            value={months[startDate.getMonth()]}
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handlePredictClick}>Predict</button>
      {predictedValue !=="" && <div>Predicted Value: {predictedValue}</div>}
    </div>
  );
};

export default StockPrediction;
