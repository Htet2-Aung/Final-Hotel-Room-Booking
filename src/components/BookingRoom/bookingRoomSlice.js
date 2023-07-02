import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { actions } from "react-table"



const CREATE_BOOKING_ROOM = "http://localhost:8181/api/booking/create/"
const GET_ALL_BOOKING_ROOM = "http://localhost:8181/api/bookingRoom/all"
const DELETE_BOOKING_ROOM = "http://localhost:8181/api/bookingRoom/delete/"
const GET_BOOKING_ROOMs_BY_BOOKINGID = "http://localhost:8181/api/bookingRoom/bookingId/"


export const fetchAllBookingRoom =  createAsyncThunk('bookingRoom/fetchBookingRoom',async()=>{
    const response = await axios.get(GET_ALL_BOOKING_ROOM)
    return response.data
})

export const fetchBookingRoomByBookingId = createAsyncThunk('bookingRoom/fetchBookingRoomByBKID',async(data)=>{
    console.log("BookingRoom By BookingId: "+data)
    const response = await axios.get(`${GET_BOOKING_ROOMs_BY_BOOKINGID}${data.id}`)
    return response.data
})


export const addBookingRoom = createAsyncThunk('bookingRoom/addBookingRoom', async(data) => {
    console.log("Booking room slice:"+data)
    console.log("add bookroomslice:"+data.selectedRooms.length+".....bk room"+data.bookingRoom)
    let content;
    let roomId;
   
    const bkRoom = data.bookingRoom
    const selectedRooms = data.selectedRooms
    content = selectedRooms.map((room) =>
       roomId = room.id,
       
      )
      console.log("Content: "+content)

      console.log("Length:"+selectedRooms.length)
    
    //   for(i;i<selectedRooms.length;i++){

    //     response = await axios.post(`${CREATE_BOOKING_ROOM}${data.bookingId}/${selectedRooms[i].id}`,bkRoom)
    //     console.log("Response;"+ i+"times"+response.data)
    //     return response.data
    //   }

    const responses = [];

  for (let i = 0; i < selectedRooms.length; i++) {
    try {
      const response = await axios.post(
        `${CREATE_BOOKING_ROOM}${data.bookingId}/${selectedRooms[i].id}`,
        bkRoom
      );
      console.log(`Response ${i + 1}:`, response.data);
      responses.push(response.data);
    } catch (error) {
      console.error(`Error ${i + 1}:`, error);
      // Handle the error if needed
    }
  }

  return responses;
     
      console.log("Room Id:"+roomId)
    // const bookingRoom = {bkRoom , selectedRooms}
    // console.log("BookingRoom in slice:"+bookingRoom)
    
    
   
})


export const deleteBookingRoom = createAsyncThunk('bookingRoom/deleteBookingRoom', async(data) => {
    await axios.delete(`${DELETE_BOOKING_ROOM}${data.id}`)
    const response = await axios.delete(DELETE_BOOKING_ROOM)
    return response.data
})

const initialState = {
    bookingRooms: [],
    status: 'idle',
    error: null,
    isCard : true,
    custom : false,
    isChart : true,
    bookedRoom : [],
   
}

export const bookingRoomSlice = createSlice({
    name: "bookingRoom",
    initialState,
    reducers:{
        setCard : (state,action) => {
            state.isCard = action.payload
        },
        setCustom : (state,action) => {
            state.custom = action.payload
        },
        setChart : (state,action) => {
            state.isChart = action.payload
        },
        setBookedRoom : (state,action) => {
            state.bookedRoom = action.payload
        }
       
    },
    extraReducers(builder){
        builder
            .addCase(addBookingRoom.fulfilled, (state,action) => {
                state.bookingRooms.push(action.payload)
            })
            .addCase(fetchAllBookingRoom.pending, (state,action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllBookingRoom.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.bookingRooms = action.payload
            })
            .addCase(fetchAllBookingRoom.rejected, (state,action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteBookingRoom.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.bookingRooms = action.payload
            })
           .addCase(fetchBookingRoomByBookingId.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.bookingRooms = action.payload
           })
    }
})

export const getAllBookingRooms = (state) => state.bookingRooms.bookingRooms
export const getBookingRoomStatus = (state) => state.bookingRooms.status
export const getBookingRoomError = (state) => state.bookingRooms.error
export const selectBookingRoomById = (state,bkRoomId) => state.bookingRooms.bookingRooms.find(bkroom => bkroom.id === bkRoomId)
export const selectBookingRoomByBkId = (state,bId) => state.bookingRooms.bookingRooms.filter(bkroom => bkroom.bookingId === bId)

export const getBookedRooms = (state) => state.bookingRooms.bookedRoom
export const getCustom = (state) => state.bookingRooms.custom
export const getCard = (state) => state.bookingRooms.isCard
export const getChart = (state) => state.bookingRooms.isChart
export const { setCard, setCustom,setBookedRoom, setChart } = bookingRoomSlice.actions
export default bookingRoomSlice.reducer
  
 

    


