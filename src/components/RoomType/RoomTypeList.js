import React, { useEffect } from 'react'
import { fetchRoomType, getAllRoomType, getRoomTypeError, getRoomTypeStatus } from './roomTypeSlice'
import { useDispatch, useSelector } from 'react-redux'
// import Room from './Room'
import AdminRoomType from './AdminRoomType'

const RoomTypeList = (props) => {

    const roomTypeList = useSelector(getAllRoomType)
    console.log("Room Type List: "+roomTypeList)

    const roomTypeStatus = useSelector(getRoomTypeStatus)

    const roomTypeError = useSelector(getRoomTypeError)

    const dispatch = useDispatch()
    useEffect(() => {
        if(roomTypeStatus === "idle"){
            dispatch(fetchRoomType())
        }
    },[roomTypeStatus,dispatch]
    )
    
    let content;
    let index = 1;

    if(roomTypeStatus === 'loading'){
        content = (<p>Loading.....</p>)
    }


    if(roomTypeStatus === 'succeeded'){
        
        content = roomTypeList.map(
            (roomType) => (
                <AdminRoomType
                    no = {index++}
                    id = {roomType.id}
                    name = {roomType.name}
                    description = {roomType.description}
                    price = {roomType.price}
                    facilities = {roomType.facilities}
                    image = {roomType.image}
                    />
            )
        )
        
    //     content = roomTypeList.map(
    //         (roomType) => (
               
    //             <Room
    //                 id = {roomType.id}
    //                 name = {roomType.name}
    //                 description = {roomType.description}
    //                 price = {roomType.price}
    //                 facilities = {roomType.facilities}
    //             />
    //         )
               
            
    //    );
    }

    if(roomTypeStatus === 'failed'){
        content = <p>{roomTypeError}</p>
    }

    console.log("RoomTypeStatus: "+roomTypeStatus)
       
  return content;
  
}

export default RoomTypeList