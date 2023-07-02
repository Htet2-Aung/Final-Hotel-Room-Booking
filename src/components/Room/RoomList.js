import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRoom, getAllRoom, getRoomError, getRoomStatus } from './roomSlice'
import RoomItem from './RoomItem'
import { fetchRoomType } from '../RoomType/roomTypeSlice'

const RoomList = () => {

    const roomList = useSelector(getAllRoom)
    console.log("RoomList: "+roomList)

    const roomStatus = useSelector(getRoomStatus)
    const roomError = useSelector(getRoomError)

    const dispatch = useDispatch()

    useEffect( () => {
       
        if(roomStatus === 'idle'){
            dispatch(fetchAllRoom())
            dispatch(fetchRoomType())
        }
    },[roomStatus,dispatch]
    )

    let content;
    let index = 1;

    if(roomStatus === 'loading'){
        content = (<p>Loading....</p>)
    }

    if(roomStatus === 'succeeded'){
        content = roomList.map(
            (room) => (
                <RoomItem
                    key = {room.id}
                    no = {index++}
                    id = {room.id}
                    description = {room.description}
                    image1 = {room.image1}
                    image2 = {room.image2}
                    image3 = {room.image3}
                    // totalRoom = {room.totalRoom}
                    roomType = {room.roomType}
                  
                />
            )
        )
    }

    if(roomStatus === 'failed'){
        content = <p>{roomError}</p>
    }
    console.log("RoomStatus in roomList:"+roomStatus)
  return content;
}

export default RoomList