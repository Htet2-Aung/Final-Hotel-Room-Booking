import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBookingRoom } from './bookingRoomSlice'
import ConfirmModal from '../ui/ConfirmModal'

const BookingRoomItem = (props) => {

    const [isModalOpen,setModalOpen] = useState(false)
    const dispatch = useDispatch()

    function closeHandler(){
        setModalOpen(false)
    }

    function confirmHandler(){
        dispatch(deleteBookingRoom({id:props.id})).unwrap()
        setModalOpen(false)
     }
    function deleteHandler(){
        setModalOpen(true)
     }

  return (
    <tr>
    <td>{props.no}</td>
    <td>{props.checkIn}</td>
    <td>{props.checkOut}</td>
    <td>{props.status}</td>
    <td>
      <Link to={`/roomTable/updateroom/${props.id}`}>
        
        <i className="far fa-edit fa-1x text-success mx-4"></i>
      </Link>
      <Link onClick={deleteHandler}>
     
        <i className="far fa-trash-alt fa-1x"></i>
      </Link>
      {isModalOpen && (
        <ConfirmModal onCancel={closeHandler} onConfirm={confirmHandler} />
      )}
    </td>
  </tr>
  )
}

export default BookingRoomItem