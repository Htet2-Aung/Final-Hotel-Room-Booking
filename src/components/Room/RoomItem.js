import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteRoom } from './roomSlice'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";
import ConfirmModal from '../ui/ConfirmModal'

const RoomItem = (props) => {

  const dispatch = useDispatch()
    // const roomTId = props.roomTypeId;
    // const roomType = useSelector((state)=>selectRoomTypeById(state,Number(roomTId)))

    
 
    // console.log("In the roomItem with roomType: "+roomTId )

    // const typeName = roomType.name
    // console.log("In the roomItem with name: "+typeName )

    
    const [isModalOpen,setModalOpen] = useState(false)

    function closeHandler(){
        setModalOpen(false)
    }

    function confirmHandler(){
        dispatch(deleteRoom({id:props.id})).unwrap()
        setModalOpen(false)
     }
    function deleteHandler(){
        setModalOpen(true)
     }

     console.log("Total room in room item :"+props.totalRoom)
  return (
    <tr>
    <td>{props.no}</td>
    <td>{String(props.roomType.name)}</td>
    <td><img src={props.image1} className="image fluid" width="100px" height="100px"/></td>
    <td><img src={props.image2} className="image fluid" width="100px" height="100px"/></td>
    <td><img src={props.image3} className="image fluid" width="100px" height="100px"/></td>
    {/* <td>{Number(props.totalRoom)}</td> */}
    <td>{parse(props.description)}</td>
    <td>
      <Link to={`/admin/roomTable/updateroom/${props.id}`}>
     
        <i className="far fa-edit fa-1x mx-4"  style={{color: "#29bfc2"}}></i>
      </Link>
      <Link onClick={deleteHandler}>
     
        <i className="far fa-trash-alt fa-1x text-danger"></i>
      </Link>
      {isModalOpen && (
        <ConfirmModal onCancel={closeHandler} onConfirm={confirmHandler} />
      )}
    </td>
  </tr>
  )
}

export default RoomItem