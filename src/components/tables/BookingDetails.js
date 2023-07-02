import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './BookingDetails.module.css'
import { selectPaymentByBKId } from '../Payment/paymentSlice'
import oasis from "../images/oasis.png"


const BookingDetails = (props) => {

    // const card = `col-md-8 col-lg-6 col-xl-4 ${classes.modal}`

    // const booking1 = useSelector((state) => selectBookingById(state,Number(props.id)) )
    const payment = useSelector((state) => selectPaymentByBKId(state,Number(props.id)))
    console.log("Payment in booking details: "+payment)


    const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);

  const fetchBookingWithRooms = async () => {
    try {
      const response = await fetch(`http://localhost:8181/api/bookingRoom/bookingWithRoom/${props.id}`);
      const bookingData = await response.json();
  
      const booking = bookingData.booking;
      const rooms = bookingData.rooms;
  
      setRooms(rooms); // Update the rooms state directly
  
      return { booking }; // Only return the booking object
    } catch (error) {
      console.error('Error fetching booking with rooms:', error);
    }
  };

  const [isLoading, setIsLoading] = useState(true); // Add a loading state
 


 


// ...

useEffect(() => {
  
  fetchBookingWithRooms().then((data) => {
    setBooking(data.booking);
    setIsLoading(false); // Set isLoading to false when data is fetched
  });
}, []);

let noOFRoom = 0;
let roomTypePrice = 0;
let roomTypeRate = [];
(rooms.map((room) => {
  noOFRoom++;
  roomTypePrice += Number(room?.roomType?.price)
  roomTypeRate.push(Number(room?.roomType?.price)) 
  
}

))

let ratePerRoom= null;
for(let i = 0; i<roomTypeRate.length; i++){
  ratePerRoom += roomTypeRate[i];
  if(i < roomTypeRate.length - 1)
  ratePerRoom += "+"
}

console.log("Room Type Rate: "+roomTypeRate)
console.log("Room Price :"+roomTypePrice)
 const adult = Number(booking?.totalAdults)
 let priceforAdult = 0;
 let extraAdult = noOFRoom*2
 console.log("EtraAdult: "+extraAdult)
 console.log("Adult:"+adult)
if( extraAdult< adult){
  priceforAdult = (adult - extraAdult) * 20000
}
console.log("noOFRoom: "+noOFRoom)
console.log("priceforAdult"+priceforAdult)

         //For Night
         const checkIn = (booking?.checkIn)
         const checkOut = (booking?.checkOut)
         const date1 = new Date(checkIn)
         const date2 = new Date(checkOut)
         const seconds =Math.abs(date2 - date1) 
         const oneDay = 24 * 60 * 60 * 1000
         const nights = Math.floor(seconds/oneDay)
         console.log("Nights in payment: "+nights)




if (isLoading) {
  return <div>Loading...</div>;
}



  return (
<section className={classes.modal}>
<div className='row'>
<div className='col-md-2'>
<img src={oasis} className='w-100' alt='oasis'/>
</div>
<div className='col-md-6'>
  <h5 className='ml-2'>Relaxation Oasis</h5>
  <h6> <i className='fas mx-2  fa-envelope text-danger'></i>relax.oasis@gmail.com</h6>
  <h6>  <i className='fas mx-2  fa-phone text-primary '></i>09940700008</h6>
</div>
<div className='col-md-3' style={{marginLeft: "60px"}}>
  <h6>Date : <span>{booking.createdAt}</span></h6>
  <h6>{booking?.payment?.cardType}</h6>
</div>
</div>
<hr style={{border: "1px solid #29bfc2"}}/>
<div className='row'>
<div className='col-md-4'>
  <h6>  <i className='far mx-2 fa-user' style={{color: "#29bfc2"}}></i>{booking.guestName}</h6>
  <h6>  <i className='fas mx-2 fa-envelope text-danger'></i>{booking.username}</h6>
  <h6>  <i className='far fa-address-card text-warning mx-2'></i>{booking.nrc}</h6>
  <h6>  <i className='fas mx-2  fa-phone text-primary '></i>{booking.phone}</h6>
  
</div>
<div className='col-md-8'>
<div className='row'>
{
    rooms.map((room)=>
    <div className='col-md-4'>
    <img src={room.image1} alt={room.name} className='w-100' />
    <div><small>{String(room.roomType.name)}</small></div>
    <p></p>
    </div>
    )
  }
</div>
</div>
</div>
<hr style={{border: "1px solid #29bfc2"}}/>
<section>
  <table className='table table-border table-striped'>
  <thead>
    <tr>
      <th>Booking Information</th>
      <th>Details</th>
      <th>Rate</th>
      <th>Sub Total</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Check-In</td>
        <td>{booking.checkIn}</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Check-Out</td>
        <td>{booking.checkOut}</td>
        <td></td>
        <td></td>
    </tr>
   
    <tr>
        <td>Number Of Room</td>
        <td>{noOFRoom}</td>
        <td>{ratePerRoom}</td>
        <td>{roomTypePrice}</td>
    </tr>
    <tr>
        <td>Total Adults</td>
        <td>{booking.totalAdults}</td>
        <td><small>20000 /additional adult /night</small></td>
        <td>{priceforAdult}</td>
    </tr>
    <tr>
        <td>Total Children</td>
        <td>{booking.totalChildren}</td>
        <td>-</td>
        <td>0</td>
    </tr>
    <tr>
        <td colspan="2"></td>
        <td>Sub Total</td>
        <td>{roomTypePrice + priceforAdult}</td>
      </tr>
    
    <tr>
        <td>Total Days</td>
        <td>
        {
          nights
        }
        </td>
        <td><small>Multiply with days</small></td>
        <td>  {
          nights
        }</td>
    </tr>
       
    </tbody>
    <tfoot>
    <tr>
        <td colspan="2"></td>
        <td>Total</td>
        <td>{booking.payment.total} MMK</td>
      </tr>
    </tfoot>
  </table>
  <p className='text-dark'><span className='text-danger'>*</span>{booking.specialRequest}<span className='text-danger'>*</span></p>
</section>
</section>

  )
}

export default BookingDetails