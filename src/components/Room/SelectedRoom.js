import { useSelector } from "react-redux";
import {
  findRoomByselected,
 
} from "./roomSlice";
import SelectedRoomItem from "./SelectedRoomItem";
import { Link } from "react-router-dom";

const SelectedRoom = () => {
  

  const selectedRooms = useSelector(findRoomByselected);
  console.log("SelectedRoom component: " + selectedRooms);

 
  // const roomTypeId = selectedRooms.roomTypeId;
  // const roomtype = useSelector((state) => selectRoomTypeById(state, Number(roomTypeId)) );

  

  let content;
  if (selectedRooms.length === 0) {
    console.log("selectedRooms.length"+selectedRooms.length)
    content = <p className="text-center my-4">If you want to book a room, you must select a room.</p>;
  } else {
    content = (
      <>
      <h4 className="card-title my-2">Selected rooms</h4>
      {selectedRooms.map((room) => (
      
    <SelectedRoomItem 
    id = {room.id}
    image1 = {room.image1}
    roomType = {room.roomType.name}
    price = {room.roomType.price}
    />
    ))}
    </>
    )
  }

  return (
    <div className="card px-3">
    <form>
      {content}
      <div className="row text-center">
        <Link to="/form">
        <button className="btn mb-2 text-light" style={{backgroundColor: "#29bfc2"}}>Proceed To Guest Info</button>
        </Link>
      </div>
      </form>
    </div>
    
    );
  // return <p>Select Room</p>
};

export default SelectedRoom;
