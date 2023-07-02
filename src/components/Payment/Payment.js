import classes from "./Payment.module.css";
import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking, getAllBookings } from "../Booking/bookingSlice";
import { useEffect } from "react";
import { findRoomByselected, getFilteredDate } from "../Room/roomSlice";
import SelectedRoomItemForBooking from "../Room/SelectedRoomItemForBooking";
import { getUser } from "../../features/auth/authSlice";
import { addBookingRoom } from "../BookingRoom/bookingRoomSlice";
import { setTotalPayment } from "./paymentSlice";

const Payment = () => {
  const cardbody1 = `col-md-6 col-sm-12 mx-3 card ${classes.card2}`;
  const cardbody3 = `col-md-5 col-sm-12 mx-3 ${classes.card3}`;

  const dispatch = useDispatch()
  const navigate = useNavigate()

   //for user
   const user = useSelector(getUser)


  //for room
  const selectedRooms = useSelector(findRoomByselected);
  const count = Object.keys(selectedRooms).length

  console.log("No of room:"+count)
  //for date
  const filteredDate = useSelector(getFilteredDate);
  console.log("filtered date in payment component: "+filteredDate)

 
  //For Night
  const checkIn = (filteredDate.checkIn)
  const checkOut = (filteredDate.checkOut)
  const date1 = new Date(checkIn)
  const date2 = new Date(checkOut)
  const seconds =Math.abs(date2 - date1) 
  const oneDay = 24 * 60 * 60 * 1000
  const nights = Math.floor(seconds/oneDay)
  console.log("Nights in payment: "+nights)

  //for booking
  const booking = useSelector(getAllBookings)
  let finalbook;

  if(booking.length === 0){
    finalbook = booking
  }else{
    finalbook = booking[booking.length -1]
  }
 const bookingId = Number(finalbook.id)
   console.log("Final book"+finalbook.id)

   let roomperAdult = count * 2;
   const adult = Number(finalbook.totalAdults)
   let priceforAdult = 0;
  if(roomperAdult < adult){
    priceforAdult = (adult - roomperAdult) * 20000
    priceforAdult = priceforAdult * nights
  }
  console.log("priceforAdult"+priceforAdult)


   
      
  
   useEffect(()=>{
    dispatch(fetchBooking())
  },[dispatch])
  
  

 
 

  const onSubmit =(event) => {
    event.preventDefault()
    
     dispatch(
      addBookingRoom({
        bookingRoom: {
              checkIn,
              checkOut,
        },selectedRooms,bookingId
      })
     ).unwrap()   
     navigate('/deposite')
     dispatch(setTotalPayment({total}))
  }
  
 
  //price for room
  let price=0;
 
  
  selectedRooms.map((room) => 
      price += room.roomType.price
  )
  
  console.log("price for room :"+price)

  let subtotal = Number(price) * nights

  let total = subtotal + priceforAdult;
  console.log("Total in payment component: "+total)
  console.log("price in payment component: "+price)

  return (
    <section>
         
      <div className="container">
        

        <div className={classes.position}>
        <form onSubmit={onSubmit}>
          <div className="row">
          
            <div className={cardbody1}>
              <div className={classes.text}>
                <h4 className=" mt-3 medium fw-bold text-dark">Relaxation Oasis</h4>
                <p className="text-muted medium">
                  No.55, Khatter Road, Mingalar Quarter, Aung Ban Township,
                  Kalaw District, Southern Shan State, Myanmar.
                </p>
              </div>
              <div className={classes.text}>
                <h4 className="text-muted mt-3 medium">Check In Info</h4>
                <div className="row mt-3">
                  <div className="col-5">
                    <label className="text-muted medium">Check-in</label>
                  </div>
                  <div className="col-7 ">
                    <label>{checkIn}</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-5">
                    <label className="text-muted medium">Check-Out</label>
                  </div>
                  <div className="col-7 ">
                    <label>{checkOut}</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-5">
                    <label className="text-muted medium">Rooms</label>
                  </div>
                  <div className="col-7 ">
                    <label>{count} Rooms</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-5">
                    <label className="text-muted medium">Number Of Guest</label>
                  </div>
                  <div className="col-7 ">
                    <label>{finalbook.totalAdults + finalbook.totalChildren}</label>
                  </div>
                </div>
              </div>
              <div className={classes.text}>
                <h4 className="text-muted mt-3 medium">Guest Information</h4>
                <div className="row mt-3">
                  <div className="col-5">
                    <label className="text-muted medium">Name</label>
                  </div>
                  <div className="col-7 ">
                    <label>{finalbook.guestName}</label>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-5">
                    <label className="text-muted medium">Phone Number</label>
                  </div>
                  <div className="col-7 ">
                    <label>{finalbook.phone}</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-5 mb-3">
                    <label className="text-muted medium">Email</label>
                  </div>
                  <div className="col-7 mb-3 ">
                    <label>{user.username}</label>
                  </div>
                </div>
              </div>
              <div className={classes.text}>
                <h4 className="text-muted mt-3 medium">Room Selections</h4>
                <div className="mt-3 ml-2">
                  {/* <SmallImg /> */}
                  {selectedRooms.map((room) => (
                <SelectedRoomItemForBooking
                    id = {room.id}
    image1 = {room.image1}
    roomType = {room.roomType.name}
    price = {room.roomType.price}
                />
                ))}
                </div>
              </div>
            </div>
          

            <div className={cardbody3}>
              <Card>
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <h5>Payment</h5>
                    </button>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className={classes.text}>
                        <div className="row mt-3 mb-3">
                          <div className="col-7">
                            <div>Subtotal</div>
                          </div>
                          <div className="col-5">
                            <label>{subtotal}</label>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-7">
                            <div>Extra Fees</div>
                          </div>
                          <div className="col-5">
                            <label>{priceforAdult}</label>
                          </div>
                        </div>
                        <hr style={{border: "1px solid black"}}/>
                        <div className="row">
                          <div className="col-7">
                            <div>Total</div>
                          </div>
                          <div className="col-5">
                            <label>{total}</label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center my-2">
                     <button type="submit" className="btn text-light mb-2" style={{backgroundColor: "#29bfc2"}} > Purchase</button>
                     </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default Payment;
