import classes from './Room.module.css'
import { fetchRoomType, getAllRoomType } from './roomTypeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Slide } from 'react-slideshow-image';




const Room = (props) => {

  
   

  console.log("Welcome Room")

  const roomTypeList = useSelector(getAllRoomType)
  console.log("Room Type List: "+roomTypeList)

  // const roomTypeStatus = useSelector(getRoomTypeStatus)

  // const roomTypeError = useSelector(getRoomTypeError)

  let content;
  const dispatch = useDispatch()
  useEffect(() => {
     
          dispatch(fetchRoomType())
     
  },[dispatch]
  )

 
  const card1 = `card ${classes.card1}`
  const image = `img-fluid px-3 pt-3 ${classes.img}`

   

  

  
   

  
   return(
   
    
   
      roomTypeList.map(
        (roomType) => (
          <div className='col-sm-6 col-md-3 my-2'>
          <div className={card1}>
          <div className='card-title'>
  
          
           <img className={image} src={roomType.image} alt='hotel room' />
          
           {/* {isModalOpen && <RoomDetail/>}
           {isModalOpen && <BackDrop onDrop={closeHandler}/>}  */}
         
          </div>
            <div className='card-body'>
            
                  <h5 style={{color: "#29bfc2"}}>{roomType.name}</h5>
                   <h6>MMK {roomType.price}</h6>
           
            
              {/* {jsxElement} */}
            
              {/* <small className='text-danger'> Only 7 left on our site</small> */}
            </div>
          </div>
      </div>
        )
    )   
 
   )
  
 
 
}

export default Room


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRoomType, getAllRoomType } from './roomTypeSlice';
// import room1 from '../images/room_type.jpg';
// import classes from './Room.module.css';

// const Room = (props) => {
//   console.log("Welcome Room");

//   const roomTypeList = useSelector(getAllRoomType);
//   console.log("Room Type List: " + roomTypeList);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchRoomType());
//   }, [dispatch]);

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const card1 = `${classes.card} ${classes.card1}`;
//   const image = `img-fluid px-3 pt-3 ${classes.img}`;

//   const showPrevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide === 0 ? roomTypeList.length - 1 : prevSlide - 1));
//   };

//   const showNextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide === roomTypeList.length - 1 ? 0 : prevSlide + 1));
//   };

//   return (
//     <div className="container">
//       <div className="row slideshow-container">
//         {roomTypeList.map((roomType, index) => (
//           <div
//             key={roomType.id}
//             className={`mySlides fade ${index === currentSlide ? 'active' : ''}`}
//           >
//             <div className={card1}>
//               <div className="card-title">
//                 <Link to={`/room-detail/${roomType.id}`}>
//                   <img className={image} src={room1} alt="hotel room" />
//                 </Link>
//               </div>
//               <div className="card-body">
//                 <h4 style={{ color: "#29bfc2" }}>{roomType.name}</h4>
//                 <h6>MMK {roomType.price}</h6>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <a className="prev" onClick={showPrevSlide}>&#10094;</a>
//       <a className="next" onClick={showNextSlide}>&#10095;</a>
//     </div>
//   );
// };

// export default Room;

