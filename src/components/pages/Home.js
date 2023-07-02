// import bannerImg from "../images/island.jpg"
import bannerImg from "../images/home_page.jpg"
import ARoom from "../Room/ARoom";
import classes from "./Home.module.css"
import ShowRoomType from "../RoomType/ShowRoomType";
import SearchBar from "./SearchBar";
import SelectedRoom from "../Room/SelectedRoom";
import { fetchAllRoom, getFilteredRoom, getSearchBar } from "../Room/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Home = () => {

 const message = `text-light ${classes.message}` 
 
 const filteredRooms = useSelector(getFilteredRoom)
 console.log("In room detail with filtered rooms: "+filteredRooms)
 const isSelected = useSelector(getSearchBar)
 console.log("In room detail for selected component: "+isSelected)


 const dispatch = useDispatch()
 useEffect(()=>{
   dispatch(fetchAllRoom())
 },[dispatch])

  
  return (
    <>
    <section>
  <img className={classes.banner} alt="Hotel view" src={bannerImg}/>
  <h3 className={message}>Book Your Stay Without Hassle</h3>
    <SearchBar/>
    <ShowRoomType/>
 </section>

 <section>
    <div className="row mt-3">
        <div className="col-sm-12 col-md-7">
        {
          filteredRooms.map(
            (room) => (
                <ARoom
                    key = {room.id}
                    id = {room.id}
                    description = {room.description}
                    image1 = {room.image1}
                    image2 = {room.image2}
                    image3 = {room.image3}
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
       {isSelected && <SelectedRoom/> } 
        </div>
    </div>
    </section>
  
</>
  )
}

export default Home