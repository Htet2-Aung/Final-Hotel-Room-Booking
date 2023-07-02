import React, { useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoomType } from "./roomTypeSlice";
import { Link } from "react-router-dom";
import ConfirmModal from "../ui/ConfirmModal";
import { getRoomError } from "../Room/roomSlice";

const AdminRoomType = (props) => {

  const dispatch = useDispatch()
  const [isDeleteModal, setDeleteModal] = useState(false);

  const error = useSelector(getRoomError)
  console.log("ADMINROOMTYPE WITH ERROR: "+error)


  function deleteHandler() {
    console.log("hello delete");
    setDeleteModal(true);
  }
  function closeHandler() {
    setDeleteModal(false);
  }
  function confirmHandler() {
    dispatch(deleteRoomType({ id: props.id })).unwrap();
    setDeleteModal(false);

  }
  console.log("SetModalOpen: " + isDeleteModal);

  return (
    <tr>
      <td>{props.no}</td>
      <td>{props.name}</td>
      <td><img src={props.image} alt="roomtype image" className="w-100"/></td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>{parse(props.facilities)}</td>
      <td className="px-3">
        <Link to={`/admin/roomtypeTable/updateroomType/${props.id}`}>
          
        <i className="far fa-edit fa-1x mx-4"  style={{color: "#29bfc2"}}></i>
      </Link>
      <Link onClick={deleteHandler}>
     
        <i className="far fa-trash-alt fa-1x text-danger"></i>
        </Link>
        {isDeleteModal && (
          <ConfirmModal onCancel={closeHandler} onConfirm={confirmHandler} />
        )}
       
      </td>
    </tr>
  );
};

export default AdminRoomType
