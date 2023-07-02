import React from 'react'
import { useDispatch } from 'react-redux';
import { setCancel } from './roomSlice';

const SelectedRoomItem = (props) => {

  
  // const totalRoom = Number(props.numOfRoom)
    const dispatch = useDispatch()
    const onCancel = () => {
      dispatch(setCancel(Number(props.id)));
        // dispatch(setCancel({ id: Number(props.id), numberOfRoom }));
      };
  return (
    <div className="card my-2">
    <div className="card-header">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <img src={props.image1} className="mx-2 w-100" alt="...." />
        </div>
        <div className="col-sm-12 col-md-6">
          <h5 className="text-primary pt-3 d-block me-5"></h5>
          <ul>
            <li>Room Type: {props.roomType}</li>
            <li>Price : {props.price} MMK</li>
          </ul>

          <button onClick={onCancel} className="btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SelectedRoomItem