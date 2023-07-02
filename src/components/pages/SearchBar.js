import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchBar.module.css"
import { fetchRoomType, getAllRoomType } from "../RoomType/roomTypeSlice";
import { useEffect, useState } from "react";
import { addFilteredRoom, getAllRoom, setDate, setSearch } from "../Room/roomSlice";
import { fetchAllBookingRoom } from "../BookingRoom/bookingRoomSlice";

const SearchBar = () => {

  const roomType = useSelector(getAllRoomType)
  console.log("Room Type: "+roomType)

  const [roomTypeName,setRoomType] = useState('') 
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  const onRoomTypeChange = e => setRoomType(e.target.value)
  const onCheckIn = e => setCheckIn(e.target.value)
  const onCheckOut = e => setCheckOut(e.target.value)

  // const date1 = new Date(checkIn)
  // const date2 = new Date(checkOut)

  // console.log("Date 1:"+date1)
  // console.log("Date 2:"+date2)

  // const filteredRooms = useSelector((state) => search(state,{checkIn,checkOut,name:roomTypeName}) )
  const allRooms = useSelector(getAllRoom)
  console.log("All rooms: "+allRooms)
  const dispatch = useDispatch()

  const onSubmit = (e) =>{
    e.preventDefault()
    const filteredRooms = allRooms.filter(room =>  {

      const isRoomAvailable = room.roomType?.name === roomTypeName && room.bookingRooms.every(bkroom => {

        return (
          new Date(checkIn) >= new Date(bkroom.checkOut)
         || new Date(checkOut) <= new Date(bkroom.checkIn)
        );
      });
      console.log("isRoomAvailable"+isRoomAvailable)
     
      return isRoomAvailable;
      
    });
      // room.bookingRoom.status != 'Booked' && room.roomType.name === roomTypeName)
    dispatch(addFilteredRoom(filteredRooms))
    dispatch(setDate({checkIn,checkOut}))
    dispatch(setSearch(true))
    console.log("RoomType Name:"+roomTypeName)
    console.log("Filtered Rooms: "+filteredRooms)
    
  }

  // const handleSearch = () => {
  //   // Filter rooms based on check-in and check-out dates
  //   const filtered = rooms.filter(room => {
  //     const isRoomAvailable = room.bookings.every(booking => {
  //       return (
  //         new Date(checkInDate) >= new Date(booking.checkOutDate) ||
  //         new Date(checkOutDate) <= new Date(booking.checkInDate)
  //       );
  //     });
  //     return isRoomAvailable;
  //   });
  //   setFilteredRooms(filtered);
  // };


  
  useEffect(()=>{
    dispatch(fetchRoomType())
    dispatch(fetchAllBookingRoom())
  },[dispatch])

 const card = `card ${classes.card1}`;
 const submit = `btn form-control ${classes.submit}`
 const label = `form-check-label ${classes.label}`

  return (
    <div className={classes.modal}>
    <h4 className="ms-2">Search rooms and see the prices</h4>
    <div className={card}>
    <form onSubmit={onSubmit}>
  <div className="row g-0 p-5">
  <div className="form-group col-md-3 col-sm-6 px-2">
        <label className={label} for="check-in">Check-In</label>
          <input  type="date" className="form-control clickable input-md" id="DtChkIn" placeholder="&#xf133;  Check-In"
            value={checkIn}
            onChange = {onCheckIn}
            required
          />
        </div>
        <div className="form-group col-md-3 col-sm-6 px-2">
        <label className={label} for="check-out">Check-Out</label>
          <input type="date" className="form-control clickable input-md" id="DtChkOut" placeholder="&#xf133;  Check-Out"
             value={checkOut}
            onChange = {onCheckOut}
            required
          />
        </div>
        <div className="form-group col-md-3 col-sm-6 pt-4 px-2">
        <select className="form-select" value={roomTypeName} onChange={onRoomTypeChange}  required>
  <option>Choose Room Type</option>
  {
    (roomType.map((rt) => 
    <option value={rt.name}>{rt.name}</option>
    ))
  }

</select>
        </div>
       
          <div className="form=group col-md-3 col-sm-6 pt-4 px-2">
          <input id="submit" type="submit" className={submit}  value="Search Room"/>
        </div>
  </div>
  </form>
</div>
    </div>
  )
}

export default SearchBar