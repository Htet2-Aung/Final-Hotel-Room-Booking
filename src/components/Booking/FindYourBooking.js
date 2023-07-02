import React, { useEffect, useState, useRef } from 'react';
import classes from './FindYourBooking.module.css';
import oasis from "../images/oasis.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const FindYourBooking = (props) => {

  
  const invoiceNo = props.invoice
  console.log("Invoice No: "+invoiceNo)
  const [booking, setBooking] = useState(null);
  // const [payment, setPayment] = useState(null)
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pdfRef = useRef(null);

  const fetchBookingWithRooms = async () => {
    try {
      const response = await fetch(`http://localhost:8181/api/bookingRoom/bookingWithRoom/${props.booking1.id}`);
      const bookingData = await response.json();

      const booking = bookingData.booking;
      const rooms = bookingData.rooms;

      setRooms(rooms);
      return { booking };
    } catch (error) {
      console.error('Error fetching booking with rooms:', error);
    }
  };
  // const fetchPaymentWithBookingId = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8181/api/payment/bookingId/${props.booking1.id}`);
  //     const paymentData = await response.json();

  //     const payment = paymentData.payment;
      
  //     return { payment };
  //   } catch (error) {
  //     console.error('Error fetching booking with rooms:', error);
  //   }
  // };

  
 

  useEffect(() => {
    fetchBookingWithRooms().then((data) => {
      setBooking(data.booking);
      setIsLoading(false);
    });
   
  }, []);

  let noOFRoom = 0;
  let roomTypePrice = 0;
  let roomTypeRate = [];
  rooms.map((room) => {
    noOFRoom++;
    roomTypePrice += Number(room?.roomType?.price);
    roomTypeRate.push(Number(room?.roomType?.price));
  });

  let ratePerRoom = null;
  for (let i = 0; i < roomTypeRate.length; i++) {
    ratePerRoom += roomTypeRate[i];
    if (i < roomTypeRate.length - 1) ratePerRoom += "+";
  }

  const adult = Number(booking?.totalAdults);
  let priceforAdult = 0;
  let extraAdult = noOFRoom * 2;
  if (extraAdult < adult) {
    priceforAdult = (adult - extraAdult) * 20000;
  }

  const checkIn = booking?.checkIn;
  const checkOut = booking?.checkOut;
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const seconds = Math.abs(date2 - date1);
  const oneDay = 24 * 60 * 60 * 1000;
  const nights = Math.floor(seconds / oneDay);

  const isBookingExpired = () => {
    const currentDate = new Date();
    return currentDate > date2;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const card = `${classes.card1}`;

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const pdfContainer = pdfRef.current;

    html2canvas(pdfContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      doc.save('booking.pdf');
    });
  };
  let payment=booking.payment;
  console.log("Payment in findyour booking: "+payment)

  const statusColor = () => {
    if(booking.statuss === 'Confirmed'){
        return '#29bfc2';
    }else{
      return 'red';
    }
  }

 



return (
    <section className='mb-3'>
      <div className={card} ref={pdfRef}>
      <div className='text-center mb-2' style={{color : statusColor()}}>
      <h5>Your booking is {booking.statuss} <span>{(booking.statuss === 'Confirmed') ? '!' :'...'}</span></h5>
      </div>
        <div className='row mt-2'>
          <div className='col-md-2'>
            <img src={oasis} className='w-100' alt='Oasis' />
          </div>
          <div className='col-md-6'>
            <h5 className='ml-2'>Relaxation Oasis</h5>
            <h6>
              <i className='fas mx-2 fa-envelope text-danger'></i>relax.oasis@gmail.com
            </h6>
            <h6>
              <i className='fas mx-2 fa-phone text-primary'></i>09940700008
            </h6>
          </div>
          <div className='col-md-3' style={{ marginLeft: '60px' }}>
            <h6>{String(booking.payment.invoiceNo)}</h6>
            <h6>
              Date : <span>{booking.createdAt}</span>
            </h6>
            <h6>{booking?.payment?.cardType}</h6>
            <h6>
                {isBookingExpired() && <span style={{color: "red"}}>Expired</span>}
            </h6>
          </div>
        </div>
        <hr style={{ border: '1px solid #29bfc2' }} />
        <div className='row'>
          <div className='col-md-4'>
            <h6>
              <i className='far mx-2 fa-user' style={{ color: '#29bfc2' }}></i>
              {booking.guestName}
            </h6>
            <h6>
              <i className='fas mx-2 fa-envelope text-danger'></i>
              {booking.username}
            </h6>
            <h6>  <i className='far fa-address-card text-warning mx-2'></i>{booking.nrc}</h6>
            <h6>
              <i className='fas mx-2 fa-phone text-primary'></i>
              {booking.phone}
            </h6>
          </div>
          <div className='col-md-8'>
            <div className='row'>
              {rooms.map((room) => (
                <div className='col-md-4'>
                  <img src={room.image1} alt={room.name} className='w-100' />
                  <div>
                    <small>{String(room.roomType.name)}</small>
                  </div>
                  <p></p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr style={{ border: '1px solid #29bfc2' }} />
        <section>
          <table className='table table-bordered table-striped'>
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
                <td>
                  <small>20000 /additional adult /night</small>
                </td>
                <td>{priceforAdult}</td>
              </tr>
              <tr>
                <td>Total Children</td>
                <td>{booking.totalChildren}</td>
                <td>-</td>
                <td>0</td>
              </tr>
              <tr>
                <td colSpan='2'></td>
                <td>Sub Total</td>
                <td>{roomTypePrice + priceforAdult}</td>
              </tr>
              <tr>
                <td>Total Days</td>
                <td>{nights}</td>
                <td>
                  <small>Multiply with days</small>
                </td>
                <td>{nights}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='2'></td>
                <td>Total</td>
                <td>{booking.payment.total}</td>
              </tr>
            </tfoot>
          </table>
          <div className='row'>
            <div className='col-md-10'>
              <p className='text-dark'>
                <span className='text-danger'>*</span>
                {booking.specialRequest}
                <span className='text-danger'>*</span>
              </p>
            </div>
          </div>
        </section>
      </div>
     <div className='text-center'>
     <i className="fas fa-download" onClick={handleGeneratePdf}></i>
     </div>
   
      {/* <button className='btn btn-primary' >
      </button> */}
    </section>
  );
};

export default FindYourBooking;