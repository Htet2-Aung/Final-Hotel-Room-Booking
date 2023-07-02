import { useNavigate } from "react-router-dom";
import classes from "../Email/EmailForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail1, setEmail } from "./emailSlice";
import { getToken } from "../../features/auth/authSlice";
import { selectBookingById, updateBooking } from "../Booking/bookingSlice";



const EmailForm = (props) => {
 
  const dispatch = useDispatch()

 

  const booking = useSelector((state) => selectBookingById(state,Number(props.id)))
 
  
  
  console.log("Email Id:"+props.id)
  console.log("Booking in email component:"+booking.username)
    //const [id,setId] = useState(user?.id) 
    const [to,setTo] = useState(booking.username)
    const [subject,setSubject] = useState('Confirmation')
    const [text,setText] = useState('We are pleased to inform you that your booking is confirmed!')
    const token =useSelector(getToken);
    const [emailRequestStatus,setEmailRequestStatus] = useState('idle')

    const onUsernameChange = (e) => setTo(e.target.value)
    const onSubjectChange = (e) => setSubject(e.target.value)
    const onTextChange = (e) => setText(e.target.value)

    const canSend = [to,subject,text].every(Boolean) && emailRequestStatus === 'idle'
    const navigate = useNavigate()
    
    const onFormSubmit = (e) => {
      e.preventDefault()
      dispatch(setEmail(false))
      if(canSend){
        setEmailRequestStatus('pending')


        try {
         
          dispatch(
            sendEmail1({
              email:{
              to,
              subject,
              text,
    
              },token
              
             
            })
          ).unwrap()
            setTo('')
            setSubject('')
            setText('')

            // navigate('/admin/bookingTable')

        } catch (error) {
          console.log(error)
        }finally{
          setEmailRequestStatus('idle')
        }
       
      }
    }

    function cancelHandler(){
      dispatch(setEmail(false))
      navigate(`/admin/bookingTable`)
    }

  return (
    <div className={classes.modal}>
    <form>
    <label className="form-label">To:</label>
      <input className="form-control mb-2" type="email" placeholder="Email" onChange={onUsernameChange} value={to} />
      <label className="form-label">Subject:</label>
      <input className="form-control mb-2" type="text" placeholder="Subject" onChange={onSubjectChange} value={subject}/>
      {/* <label for="actual-btn" className={classes.file} > Attachment<span className={classes.fileChoose}>No file chosen</span></label> */}
      {/* <input type="file" className={classes.file} ></input> */}
      <label className="form-label">Text:</label>
      <textarea className="form-control" rows={3} placeholder="Enter message" onChange={onTextChange} value={text}/>
      <div className="row my-2">
      <div className="col-md-2"></div>
        <div className="col-md-4 pt-2">
          <button className="btn text-light" style={{backgroundColor: "#29bfc2"}} onClick={onFormSubmit}>Send</button>
        </div>
        <div className="col-md-4 pt-2">
      
            <button className="btn text-light" style={{backgroundColor: "red"}} onClick={cancelHandler}>Cancel</button>
          
        </div>
        <div className="col-md-2"></div>
      </div>
    </form>
    </div>
  );
};

export default EmailForm;
