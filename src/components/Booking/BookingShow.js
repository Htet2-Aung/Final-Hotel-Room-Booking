import React, { useEffect } from 'react'

//jQuery libraries
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

import { useDispatch } from 'react-redux';
import Bookinglist from './BookingList';
import {  fetchBooking } from './bookingSlice';
import classes from "../tables/Chart.module.css"


const BookingShow = () => {
  
  const dispatch = useDispatch()
  useEffect(() => {
     
          dispatch(fetchBooking())
      
  },[dispatch]
  )

  $(document).ready(function () {
    setTimeout(function(){
    $('#example').DataTable();
     } ,500);
});


const card = `card ${classes.card2}`
  
  return (
    <div className={card}>
    <div className=" text-center">
        <h3>Booking List</h3>
    </div>
     
    <div className="container">
         
    <table id="example" className="table table-hover table-bordered">

        <thead>
          <tr>
            <th>Number</th>
            <th>Guest Name</th>
            <th>checkIn</th>
            <th>checkOut</th>
            <th>Expired</th>
            <th>Confirm & Email</th>
            <th>Details</th>
           
            {/* <th>TotalAdults</th>
            <th>TotalChildren</th>
            <th>Special Request</th>
            <th>CreatedAt</th> */}
          </tr>
        </thead>
        <tbody>
        <Bookinglist/>
           
        </tbody>
      </table>
         
      </div>
    </div>
  )
}

export default BookingShow