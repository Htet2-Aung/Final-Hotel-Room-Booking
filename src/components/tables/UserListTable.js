import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchAllUsers } from "../User/userSlice";
import UserList from "../User/UserList";
import classes from './Chart.module.css'

const UserListTable = () => {
    const dispatch = useDispatch()
  useEffect(() => {
     
          dispatch(fetchAllUsers())
      
  },[dispatch]
  )

  //initialize datatable
  $(document).ready(function () {
    setTimeout(function(){
    $('#example').DataTable();
     } ,500);
});

const card = `card ${classes.card2}`
  return (
    <div className={card}>
    
    <div className=" text-center">
        <h3>User Information</h3>
    </div>
     
    <div className="container">
         
        <table id="example" className="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone </th>
            <th>Registration Date</th>
            <th>Updated Date</th>
          </tr>
        </thead>
        <tbody>
        <UserList/>
           
        </tbody>
      </table>
         
      </div>

   
  
    </div>
  )
}

export default UserListTable