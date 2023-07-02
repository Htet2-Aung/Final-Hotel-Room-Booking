import React, { useEffect } from 'react'
import RoomList from '../Room/RoomList'
import { useDispatch } from 'react-redux'
import { fetchAllRoom } from '../Room/roomSlice'
import $ from "jquery"
import classes from './Chart.module.css'

const RoomTable = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllRoom())
    },[dispatch])

    $(document).ready(function(){
        setTimeout(function(){
            $('#example').DataTable()
        },500)
    })

    const card = `card ${classes.card2}`
  return (
    <div className={card}>
    <div className=" text-center">
        <h3>Room List</h3>
    </div>
     
    <div className="container">
         
        <table id="example" className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Room Type</th>
            <th>Room's Bed</th>
            <th>Room's Bath</th>
            <th>Room's Toilet</th>
            {/* <th>No of Rooms</th> */}
            <th>Description</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        <RoomList/>
           
        </tbody>
      </table>
         
      </div>
    </div>
  )
}

export default RoomTable