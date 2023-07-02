import { Link } from "react-router-dom"
import classes from "./BookingSuccess.module.css"

const BookingSuccess = () => {
    
  return (
    <div className="container text-center" >
   <div className={classes.card}>
    <div className="text-center">
    <i className="fa fa-check-circle fa-5x mt-5 " style={{color: "#29bfc2"}} ></i>
    </div>
    <div className="text-center mt-3">You Successfully Created Your Booking</div>
    <div className="text-center mt-3 text-muted">
        <label>To See Your Booking</label>
        <Link to="/find-your" style={{color: "#29bfc2"}}>clickhere</Link>       
    </div>
    
    <Link className="btn btn mt-5" to="/"><i className='fas fa-home ' style={{color: "#29bfc2"}}></i>GO TO Home
     </Link>
    
     </div>
     </div>
     
  )
}

export default BookingSuccess