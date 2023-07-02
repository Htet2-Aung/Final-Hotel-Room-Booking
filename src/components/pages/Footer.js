import { Link } from "react-router-dom"
import classes from "./Footer.module.css"
import kpay from "../images/kpay.webp"
import aya from "../images/aya.png"
import paypal from "../images/paypal.jpeg"
import wave from "../images/wave.jpeg"
import onepay from "../images/onepay.png"
import master from "../images/mastercard.png"
import visa from "../images/visa.png"

const Footer = () => {
    const footer = `row ${classes.footer}`
   
  return (
    <section className={classes.last}>
    
        <div className={footer}>
            <div className="col-md-4 col-sm-12">
                <h6 style={{fontWeight: "bold"}}>ABOUT </h6>
               
               

            </div>
            <div className="col-md-4 col-sm-12">
            <h6>HELP</h6>
            <Link to="/find-your"><p>Find/Print Your Booking</p></Link>
            <Link to="/frequently-asked-questions"><p>FAQs</p></Link>
            <Link to="contact-us"><p>Contact Us</p></Link>
           
            </div>
            <div className="col-md-4 col-sm-12">
           <h6 style={{fontWeight: "bold"}}>WE ACCEPT</h6>
           <div className="row mb-2">
          
           <img src={kpay} className={classes.image}/>
           <img src={aya} className={classes.image}/>
           <img src={onepay} className={classes.image}/>
           <img src={wave} className={classes.image}/>
           

           
          </div>
          <div className="row ">
          <img src={paypal} className={classes.imagep}/>
           <img src={master} className={classes.imagep}/>
           <img src={visa} className={classes.imagep}/>
          </div>
        </div>
        </div>
    </section>
  )
}

export default Footer