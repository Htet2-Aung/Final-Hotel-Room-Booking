import { Link } from "react-router-dom";
import classes from "./Contact.module.css";

const Contact = () => {
  const cardbody1 = `col-md-4 mt-5  card  ${classes.card2}`;
  const icons = `row mt-5  ${classes.icons}` 
  const text = `row mt-3 ${classes.text}`
  const messenger = `fab fa-2x fa-facebook-messenger ${classes.msgeffect}`
  // const textIcon = `col-sm-3 ${classes.textIcon}`
  return (
    <section className={classes.contact}>
      <img className={classes.img} src="https://c4.wallpaperflare.com/wallpaper/952/263/731/ocean-underwater-wallpaper-preview.jpg" alt="Hotel View"></img>
      <div className={classes.position}>
        <div className={cardbody1}>
          <div className={classes.mapouter}>
            <div className={classes.gmapcanvas}>
              <iframe
                id="map"
                className={classes.gampiframe}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60567.47202534452!2d94.27463001991549!3d18.417093659842067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b91f25bd05e8a3%3A0xfae3c6c8e47d68e3!2sBayview%20-%20the%20beach%20resort!5e0!3m2!1sen!2smm!4v1684571361303!5m2!1sen!2smm"
              ></iframe>
              <a href="https://capcuttemplate.org/">Capcut Template</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className={icons}>
         <div className="col-sm-1"></div>
        <div className="col-sm-11"> 
           <div className="row"> 
            <div className='col-sm-3'>
            <i className='fas fa-map-marker-alt text-danger fa-2x'></i>
            </div>
            <div className="col-sm-3">
              <i className='fas fa-2x fa-phone text-primary '></i>
            </div>
            <div className="col-sm-3">
            <i className='fas fa-envelope fa-2x text-danger'></i>
            </div>
            <div className="col-sm-3">
              <Link to="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F121402764575091%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792%26recurring_notification%3D0">
                <i className={messenger}></i></Link>
              
            </div>
          </div> 
         </div>
        <div className="col-sm-1"></div> 
      </div>

      <div className={text}>
      <div className="col-sm-1"></div>
        <div className="col-sm-11"> 
           <div className="row"> 
            <div className="col-sm-3">
              <div className={classes.location}>
              <h6 className="fw-bold">
           Relaxation Oasis Hotel
            </h6>
            <small>Ngapali Beach, MM, Gyeiktaw Main St, Thandwe 07171</small>
              </div>
            
             
            </div>
            <div className="col-sm-3">
              <div className={classes.phone}>
           
            <h6>
            09-940700008
            </h6>
              </div>
            
            </div>
            <div className="col-sm-3">
              <div className={classes.mail}>
              <h6 className="fw-bold">
            relax.oasis@gmail.com
            </h6>
              </div>
           
            </div>
            <div className="col-sm-3">
              <div className={classes.messenger}>
              <h6 className="fw-bold">
           Messenger
            </h6>
              </div>
           
            </div>
          </div> 
         </div>
        <div className="col-sm-1"></div> 
      </div>
      
    </section>
  );
};

export default Contact;
