import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookingDetails from "../tables/BookingDetails";
import BackDrop from "../pages/BackDrop";
import EmailForm from "../Email/EmailForm";
import { useDispatch, useSelector } from "react-redux";
import { getSendEmail, setEmail } from "../Email/emailSlice";
import { updateBooking } from "./bookingSlice";
import { getToken } from "../../features/auth/authSlice";
import ConfirmBooking from "../ui/ConfirmBooking";

const AdminBooking = (props) => {

  const [isModalOpen,setModalOpen]= useState(false)
  const isEmail = useSelector(getSendEmail)
  const dispatch = useDispatch()
  const token =useSelector(getToken);
  const bookingId = props.id
  // const sendEmail = true;
  // console.log("SendEmail: "+sendEmail)
  
  function detailHandler(){
    setModalOpen(true)
  }

  function closeHandler(){
    setModalOpen(false);
    dispatch(setEmail(false))
  }

  function sendEmailHandler(){
    
    dispatch(setEmail(true))
    
  }

  

  console.log("is Modal open"+isModalOpen)
 
  const date1 = props.checkOut;
  console.log("Date1 :"+date1)
 const getExpired = () => {
      const currentDate = new Date();
      console.log("Date: "+currentDate)
      const checkOut = new Date(date1)
      console.log("checkOut:"+checkOut)
      return currentDate > checkOut;
     }
     console.log(getExpired())

  const getStatusColor = () => {
      if(getExpired())
        
        return "red";
      
      return "";
     
    }

    const getStatus = () => {
      if(getExpired())
        
        return "Expired";
      
      return "-";
     
    }
    
  
    const funDisabled = () => {
      if(props.statuss === 'Confirmed'){
        return true
      }else if(props.statuss === 'Pending'){
        return false
      }
    }

    console.log("FunDisabled:"+funDisabled())

    const confirmHandler = (e) => {
    
      dispatch(
        updateBooking({
          booking: {
            guestName: props.guestName,
            nrc: props.nrc,
            phone: props.phone,
            username: props.username,
            countryOfOrigin: props.countryOfOrigin,
            totalAdults: props.totalAdults,
            totalChildren: props.totalChildren,
            specialRequest:props.specialRequest,
            checkIn:props.checkIn,
            checkOut:props.checkOut,
            numOfRoom:props.numOfRoom,
            
      },token,bookingId
        })
      ).unwrap();
      setConfirm(false)
    }

    const [isConfirm,setConfirm] = useState(false)

    function cancelHandler(){
      setConfirm(false)
    }

    // function confirmHandler(){
    //     dispatch(deleteRoom({id:props.id})).unwrap()
      
    //  }
    function clickHandler(){
      setConfirm(true)
     }

    

  return (
    <tr style={{color: getStatusColor()}}>
      <td>{props.invoiceNo}</td>
      <td>{props.guestName}</td>
      <td>{props.checkIn}</td>
      <td>{props.checkOut}</td>
      <td>{getStatus()}</td>
      <td>
      <button className="btn btn-success w-30 mx-3"  disabled={funDisabled()} >
      <i className='fas fa-check-square'onClick={clickHandler}></i>
      </button>
     
      {/* <button className="btn btn-success" ></button> */}
     {isConfirm && <ConfirmBooking onCancel={cancelHandler} onConfirm={confirmHandler}/>}
     {isConfirm && <BackDrop onDrop={cancelHandler}/>}
     <button className="btn btn-danger w-30">
     <i className='fas fa-envelope'  onClick={sendEmailHandler}></i>
   
   {isEmail && <EmailForm
           id = {props.id}
          
           />}
           {isEmail && <BackDrop onDrop={closeHandler}/>}
     </button>
      
      </td>
      <td>
      <Link  onClick={detailHandler}>View more..</Link>
        {isModalOpen && <BookingDetails 
                id = {props.id}
                />}
                {isModalOpen && <BackDrop onDrop={closeHandler}/>}
      </td>
    
      {/* <td>{props.totalAdults}</td>
      <td>{props.totalChildren}</td>
      <td>{props.specialRequest}</td>
      <td>{props.createdAt}</td> */}
      
    </tr>
  );
};

export default AdminBooking
