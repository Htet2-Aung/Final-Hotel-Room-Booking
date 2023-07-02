import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import classes from "./Chart.module.css";
import PaymentChart from "./PaymentChart";


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const card = `display-flex ${classes.card}`;

const ChartTable = () => {
  const [bookingData, setBookingData] = useState([]);
  const [searchYear, setSearchYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch booking data from your API
    fetch("http://localhost:8181/api/booking/all")
      .then((response) => response.json())
      .then((data) => {
        setBookingData(data); // Set the fetched booking data to the state
      })
      .catch((error) => {
        console.log("Error fetching booking data:", error);
      });
  }, []);

  const groupBookingsByYear = (bookings, year) => {
    const filteredBookings = bookings.filter((booking) => {
      const checkInDate = new Date(booking.checkIn);
      return checkInDate.getFullYear() === year;
    });

    const yearlyBookings = {};
    filteredBookings.forEach((booking) => {
      const checkInDate = new Date(booking.checkIn);
      const month = checkInDate.getMonth() +1;
      const year = checkInDate.getFullYear();
      const monthYear =`${month} - ${year}`;

      if (!yearlyBookings[monthYear]) {
        yearlyBookings[monthYear] = 0;
      }

      yearlyBookings[monthYear] += 1;
    });

    return yearlyBookings;
  };

  const yearlyBookings = groupBookingsByYear(bookingData, searchYear);

  const labels = Object.keys(yearlyBookings);
  const data = {
    labels,
    datasets: [
      {
        label: "Yearly Bookings",
        data: Object.values(yearlyBookings),
        backgroundColor: "#29bfc2",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:` Yearly Bookings Chart (${searchYear})`,
      },
    },
  };

  const handleSearchYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    setSearchYear(selectedYear);
  };

    return (
      
    
        <div className='row' style={{paddingLeft: "10px", backgroundColor: "white", paddingTop: "10px"}}>
       <div className={card}>
      <h3 className="text-center">Booking Report</h3>
      <div className="row mb-3">
     <div className="col-md-4"></div>
     <div className="col-md-4">    <select className="form-select  " id="searchYear" value={searchYear} onChange={handleSearchYearChange}>
          {Array.from({ length: 11 }, (_, index) => {
            const yearOption = new Date().getFullYear() - index;
            return (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select></div>
     <div className="col-md-4"></div>
   
      
     
      </div>
      <Bar options={options} data={data} />
    </div>
     <PaymentChart/>
   
      
        </div>
        
      ); 
}

export default ChartTable