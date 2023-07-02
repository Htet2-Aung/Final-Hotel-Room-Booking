// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import FindYourBooking from './FindYourBooking'
// import { getUser } from '../../features/auth/authSlice'
// import { useEffect } from 'react'
// import { fetchRoomByBookingId, getAllRoom } from '../Room/roomSlice'
// import { fetchBookingRoomByBookingId, getAllBookingRooms, setBookedRoom } from '../BookingRoom/bookingRoomSlice'


// const YourBookingRoom = ({booking}) => {

//     const dispatch = useDispatch()
//     // const user = useSelector(getUser)
//     // const bookingId = booking.id
   
//     // console.log("Your Booking room: "+booking)
//     // const bkRooms = useSelector(getAllBookingRooms);
//     // console.log("Find your booking with bkRooms"+bkRooms)

    
  

 

//     return <FindYourBooking booking1={booking}/>;
    
  
  

// }

// export default YourBookingRoom 


// import React from 'react'
// import { useSelector } from 'react-redux'
// import FindYourBooking from './FindYourBooking'
// import { getUser } from '../../features/auth/authSlice'

// const YourBookingRoom = (props) => {

//   const user = useSelector(getUser)
//   const bookingId = props.id
//   const bkrooms = props.bookingRoom
//   console.log("find your booking:"+bkrooms)
//   const bkroom = bkrooms.reduce((obj, item) => {
//     obj[item.roomId] = item;
//     return obj;
//   }, {})

//   console.log("Your bookingroom .....:"+bkroom)

//   const uniqueBookingIds = [...new Set(bkrooms.map(bk => bk.bookingId))];
//   console.log("uniques: "+uniqueBookingIds)

//   return (
//     <>
//       {uniqueBookingIds.map(bookingId => {
//         const bk = bkroom[bookingId];
//         return (
//           <FindYourBooking
//             key={bookingId}
//             room={bk.room}
//             bookingId={bookingId}
//           />
//         );
//       })}
//     </>
//   );
// }

// export default YourBookingRoom




