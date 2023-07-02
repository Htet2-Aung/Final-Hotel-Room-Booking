

import { useDispatch, useSelector } from "react-redux";
import { fetchBooking,  selectBookingByUsername } from "./bookingSlice";
import { useEffect } from "react";

import { getUser } from "../../features/auth/authSlice";

import FindYourBooking from "./FindYourBooking";



const YourBooking = () => {

 // const { userId } = useParams()
  const dispatch = useDispatch()


  const user = useSelector(getUser)

  const loginUserId = user.id
  console.log("UsersID :"+ loginUserId)

  const bookings = useSelector((state) => selectBookingByUsername(state,String(user.username)))

  
  
 

  // const bookings = useSelector((state) => selectBookingByUserId(state,Number(loginUserId)))
  
  console.log("bookings in your booking"+bookings)

  //  const selectedRooms = useSelector(findRoomByselected);
  // const count = Object.keys(selectedRooms).length

  // console.log("No of room:"+count)

  useEffect(()=>{
    dispatch (fetchBooking())
  
  },[dispatch])

  let invoice = "RO-000";
  let invoiceNo = 1;
  


  return (
    <section style={{backgroundcolor: "#eee" }}> 

  <div className="container py-5"> 
    <div className="row justify-content-center"> 
    {  bookings.map(booking =>( 
        <FindYourBooking 
          booking1 = {booking}
          invoice = {invoice + (invoiceNo++)}
         />
     ))} 
    </div> 
  </div>
</section>
 
  );
};

export default YourBooking;
