import React, { useEffect } from 'react'

//jQuery libraries
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import classes from "../tables/Chart.module.css"

import { fetchAllPayments } from './paymentSlice';
import { useDispatch } from 'react-redux';

import Paymentlist from './PaymentList';

const PaymentShow = () => {

  // const roomTypeList = useSelector(getAllRoomType)
 
  // console.log("Room Type List: "+roomTypeList)

  
  const dispatch = useDispatch()
  useEffect(() => {
     
          dispatch(fetchAllPayments())
      
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
        <h3>Payment List</h3>
    </div>
     
    <div className="container">
         
    <table id="example" className="table table-hover table-striped table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Holder Name</th>
            <th>Card Number</th>
            <th>Total</th>
            <th>CVC</th>
            <th>Card Type</th>
          </tr>
        </thead>
        <tbody>
        <Paymentlist/>
           
        </tbody>
      </table>
         
      </div>
    </div>
  )
}

export default PaymentShow