import view1 from "../images/view1.jpg";
import view2 from "../images/dview2.jpg";
import view4 from "../images/dview4.jpg";
import classes from "./RoomDetail.module.css"
import ARoom from "./ARoom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoom, getFilteredRoom, selectRoomBYType } from "./roomSlice";
import { useEffect } from "react";
import SelectedRoom from "./SelectedRoom";
import SearchBar from "../pages/SearchBar";


const RoomDetail = () => {

  const { roomTypeId } = useParams()
  console.log("In the room detail: "+roomTypeId)
  const rooms = useSelector((state)=>selectRoomBYType(state,Number(roomTypeId)))
  console.log("In the room detail with roomtype: "+rooms)

  const filteredRooms = useSelector(getFilteredRoom)
  console.log("In room detail with filtered rooms: "+(filteredRooms))
  



  // const allrooms = useSelector(getAllRoom)
  // console.log("All Rooms:"+allrooms)

  // allrooms.map(room => {
  //   console.log("In the room Detail"+room.selected);
  // })
  // const selectedRooms = useSelector(findRoomByselected)
  // console.log("In the room detail with selectedroom:"+ selectedRooms)

 
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllRoom())
  },[/*dispatch*/])

 

const modal = `card ${classes.modal}`



      
  
  return (
    <>
    <section>
      <div className={modal}>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <img src={view1} alt=".." className="w-100" />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <img src={view2} alt=".." className="w-100" />
              </div>
           
              <div className="col-sm-12 col-md-6">
                <img src={view4} alt=".." className="w-100" />
              </div>
            </div>
            <div className="row mt-2">
            <h4>Amenities</h4>
              <div className="col-sm-12 col-md-6">
                <ul>
                  <li>Car Parking</li>
                  <li>Free Wifi</li>
                  <li>Laundry Service</li>
                </ul>
              </div>
              <div className="col-sm-12 col-md-6">
               <ul>
                <li>Concierge</li>
                <li>Front Desk</li>
                <li>Security Guard</li>
               </ul>
              </div>
            </div>
            
          </div>
         
        </div>
      </div>
    </section>
    <SearchBar/>
    {/* <div className={classes.modal}>
    <h4 className="ms-2">Search rooms and see the prices</h4>
    
     <div className={card}>
    <form>
  <div className="row g-0 p-5">
  <div className="form-group col-md-3 col-sm-6 px-2">
        <label className="form-check-label" for="check-in">Check-In</label>
          <input  type="date" className="form-control clickable input-md" id="DtChkIn" placeholder="&#xf133;  Check-In"/>
        </div>
        <div className="form-group col-md-3 col-sm-6 px-2">
        <label className="form-check-label" for="check-out">Check-Out</label>
          <input type="date" className="form-control clickable input-md" id="DtChkOut" placeholder="&#xf133;  Check-Out"/>
        </div>
        <div className="form-group col-md-3 col-sm-6 pt-4 px-2">
          <input  type="number" className="form-control clickable input-md" id="room" placeholder="Number of Room"/>
        </div>
       
          <div className="form=group col-md-3 col-sm-6 pt-4 px-2">
          <input id="submit" type="submit" className={submit}  value="Search Room"/>
        </div>
  </div>
  </form>
</div>
    </div> */}
    <section>
    <div className="row mt-3">
    <div className="col-sm-12 col-md-7">
      {
        filteredRooms.map(
          (room) => (
              <ARoom
              key={room.id}
                  id = {room.id}
                  description = {room.description}
                  image1 = {room.image1}
                  image2 = {room.image2}
                  image3 = {room.image3}
                  totalRoom = {room.totalRoom}
                  roomTypeId = {room.roomType.id}
                  roomTypeName = {room.roomType.name}
                  roomTypePrice = {room.roomType.price}
                  roomTypeDescription = {room.roomType.description}
                  roomTypeFacilities = {room.roomType.facilities}
                  roomSelected = {room.selected}
                  
              /> 
          ))
}
      </div>
        <div className="col-sm-12 col-md-4 mt-4">
        <SelectedRoom/>
         
        </div>
    </div>
    </section>
        

       
       
    </>
  );
};

export default RoomDetail;
