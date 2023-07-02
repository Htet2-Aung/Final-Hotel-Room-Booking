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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const card = ` ${classes.card}`;

const PaymentChart = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [searchYear, setSearchYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch Payment data from your API
    fetch(" http://localhost:8181/api/payment/all")
      .then((response) => response.json())
      .then((data) => {
        setPaymentData(data); // Set the fetched Payment data to the state
      })
      .catch((error) => {
        console.log("Error fetching payment data:", error);
      });
  }, []);

  const groupPaymentsByYear = (payments, year) => {
    const filteredPayments = payments.filter((payment) => {
      const createdDate = new Date(payment.createdAt);
      return createdDate.getFullYear() === year;
    });

    const yearlyPayments = {};
    filteredPayments.forEach((payment) => {
      const createdAtDate = new Date(payment.createdAt);
      const month = createdAtDate.getMonth() +1;
      const year = createdAtDate.getFullYear();
      const monthYear =`${month} - ${year}`;

      if (!yearlyPayments[monthYear]) {
        yearlyPayments[monthYear] = 0;
      }

      yearlyPayments[monthYear] += payment.total;
    });

    return yearlyPayments;
  };

  const yearlyPayments = groupPaymentsByYear(paymentData, searchYear);

  const labels = Object.keys(yearlyPayments);
  const data = {
    labels,
    datasets: [
      {
        label: "Yearly Payments",
        data: Object.values(yearlyPayments),
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
        text:` Yearly Payments Chart (${searchYear})`,
      },
    },
  };

  const handleSearchYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    setSearchYear(selectedYear);
  };

  return (
    <div className={card}>
      <h3 className="text-center">Payment Report</h3>
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
  );
};

export default PaymentChart;