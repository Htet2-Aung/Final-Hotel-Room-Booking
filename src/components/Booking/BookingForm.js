import {useNavigate } from "react-router-dom";
import classes from "./BookingForm.module.css";


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, addNewBooking } from "./bookingSlice";
import { findRoomByselected, getFilteredDate } from "../Room/roomSlice";
import SelectedRoomItemForBooking from "../Room/SelectedRoomItemForBooking";
import { getEmail, getToken } from "../../features/auth/authSlice";

const BookingForm = () => {
  const button = `mt-5 mb-3 btn text-light ${classes.button}`;
  const selectedRooms = useSelector(findRoomByselected);
  const filteredDate = useSelector(getFilteredDate);

  
  
  const [guestName, setGuestName] = useState('')
  const [nrc, setNRC] = useState('')
  const [phone, setPhone] = useState('')
  const [countryOfOrigin, setCountryOfOrigin] = useState('')
  const [totalAdults, setTotalAdults] = useState('')
  const [totalChildren, setTotalChildren] = useState('')
  const [specialRequest, setSpecialRequest] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onGuestNameChange = (e) => setGuestName(e.target.value);
  const onNrcChange = (e) => setNRC(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);
  const onCountryOfOrigin = (e) => setCountryOfOrigin(e.target.value);
  const onTotalAdults = (e) => setTotalAdults(e.target.value);
  const onTotalChildren = (e) => setTotalChildren(e.target.value);
  const onSpecialRequest = (e) => setSpecialRequest(e.target.value);

  const canSave = [guestName,nrc,phone,countryOfOrigin,totalAdults,totalChildren,specialRequest] &&
  addRequestStatus === "idle";

 

  const user = useSelector(getEmail)
  const username = String(user)
  
  
  console.log("In the booking form Cansave:"+canSave)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //for user
  const token = useSelector(getToken)

  //for room
  const count = Object.keys(selectedRooms).length
  console.log("No of room:"+count)


  //For Night
  const checkIn = new Date(filteredDate.checkIn)
  const checkOut = new Date(filteredDate.checkOut)
  const seconds =Math.abs(checkOut - checkIn) 
  const oneDay = 24 * 60 * 60 * 1000
  const nights = Math.floor(seconds/oneDay)
  console.log("Nights: "+nights)

 
  const numOfRoom = count;

  const isSubmitDisabled = numOfRoom *4 >= totalAdults && (numOfRoom * 3 >= totalChildren)
  console.log("isSumbitDisabled:"+ isSubmitDisabled)
  console.log("numOfRoom *4 >= totalAdults: "+numOfRoom *4 >= totalAdults)
  console.log("numOfRoom * 3 <= totalChildren" + (numOfRoom * 3 )>= totalChildren)
  const onSubmit = (event) => {
    event.preventDefault();
    
      if(canSave){

        try {

          setAddRequestStatus('pending')

       dispatch(
        addNewBooking({
          booking: {
                guestName,
                nrc,
                phone,
                username,
                countryOfOrigin,
                totalAdults,
                totalChildren,
                specialRequest,
                checkIn,
                checkOut,
                numOfRoom
          },token
        })
       ).unwrap()   
       dispatch(addBooking({
       
        guestName,
        nrc,
        phone,
        countryOfOrigin,
        totalAdults,
        totalChildren,
        specialRequest}))
      } catch (error) {
        console.log(error)  
       }finally{
        setAddRequestStatus('idle')
       }
      }
       setGuestName('')
       setNRC('')
      setPhone('')
      setCountryOfOrigin('')
      setTotalAdults('')
      setTotalAdults('')
      setSpecialRequest('')
      navigate('/payment')

    }

   

  return (
    <section>
      <div className="container">
        <div className=" row mt-3">
          <div className="col-7">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="d-flex flex-row justify-content-between">
                  <div className="mb-2" style={{color: "#29bfc2"}}>
                    Primary Guest Name
                    <sup className="ml-1 text-danger">*</sup>
                  </div>
                </label>
                <input type="text" required className="form-control" value={guestName} onChange={onGuestNameChange}></input>
              </div>
              <div className="form-group mt-3">
                <label className="d-flex flex-row justify-content-between" >
                  <div className="mb-2" style={{color: "#29bfc2"}}>
                    Phone Number
                    <sup className="ml-1 text-danger">*</sup>
                  </div>
                </label>
                <input
                  type="text"
                  required
                  pattern="^09[0-9]{6,10}$"
                  placeholder="09_ _ _ _ _ _ _ "
                  className="form-control"
                  value={phone}
                  onChange={onPhoneChange}
                ></input>
                <small className="form-text text-warning">
                  Myanmar mobile number is required. Example : 09123456789
                </small>
              </div>
              <div className="form-group mt-3">
                <label className="d-flex flex-row justify-content-between">
                  <div className="mb-2" style={{color: "#29bfc2"}}>NRC</div>
                  
                </label>
                <input type="text" className="form-control" value={nrc} onChange={onNrcChange}></input>
              </div>
              <div className="form-group mt-3">
                <label className="d-flex flex-row justify-content-between">
                  <div className="mb-2" style={{color: "#29bfc2"}}>
                    Region
                    <sup className="ml-1 text-danger">*</sup>
                  </div>
                </label>
                <select required className="form-select" value={countryOfOrigin} onChange={onCountryOfOrigin}>
                <option value="">Choose Your Region</option>
                  <option value="Yangon">Yangon</option>
                  <option value="Mandalay">Mandalay</option>
                  <option value="NayPyiTaw">Nay Pyi Taw</option>
                  <option value="Magway">Magway</option>
                  <option value="Sagaing">Sagaing</option>
                  <option value="Bago">Bago</option>
                  <option value="Ayeyarwady">Ayeyarwady</option>
                  <option value="Taninthary">Taninthary</option>
                  <option value="Chin ">Chin</option>
                  <option value="Kachin">Kachin</option>
                  <option value="Karen">Karen</option>
                  <option value="Kayah">Kayah</option>
                  <option value="Mon">Mon</option>
                  <option value="Rakhine">Rakhine</option>
                  <option value="Shan">Shan</option>
                </select>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group mt-3">
                    <label className="d-flex flex-row justify-content-between">
                      <div className="mb-2" style={{color: "#29bfc2"}}>Total Adults</div>
                     
                    </label>
                    <small className="text-warning">20000 Kyats per additional adult per night</small>
                    <input name="" type="text" className="form-control" placeholder="2 extra adults per room" value={totalAdults} onChange={onTotalAdults}></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group mt-3">
                    <label className="d-flex flex-row justify-content-between">
                      <div className="mb-2" style={{color: "#29bfc2"}}>Total Children</div>
                    </label>
                    <small className="text-warning">Under 5 years stays free</small>
                    <input name="" type="text" className="form-control" placeholder="3 children per room" value={totalChildren} onChange={onTotalChildren}></input>
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <label className="d-flex flex-row justify-content-between">
                  <div className="mb-2" style={{color: "#29bfc2"}}>Special Request</div>
                  <div>
                    <small className="ml-auto text-muted">optional</small>
                  </div>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Eg : low-floor room"
                  value={specialRequest}
                  onChange={onSpecialRequest}
                ></input>
              </div>
           
              <div className="row mt-3">
               
                  <button type="submit" className={button} style={{backgroundColor: "#29bfc2"}} disabled={!isSubmitDisabled}>
                   Submit
                  </button>
               
              </div>
            
            </form>
          </div>
          <div className="col-5">
            <div className="card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="w-100 ">
                    <h4>Hotel Name</h4>
                    <div className="row mt-3">
                      <div className="col-5">
                        <label>Check-in Date :</label>
                      </div>
                      <div className="col-7">
                        <label>
                          <b>{filteredDate.checkIn}</b>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5">
                        <label>Check-out Date :</label>
                      </div>
                      <div className="col-7">
                        <label>
                          <b>{filteredDate.checkOut}</b>
                        </label>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label>
                        <b>{count} Room</b>
                      </label>
                      <span>
                        <b>, </b>
                      </span>
                      <label>
                        <b>{nights} Nights</b>
                      </label>
                     
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-3 font-weight-bold text-muted">
                    Room Selections
                  </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
