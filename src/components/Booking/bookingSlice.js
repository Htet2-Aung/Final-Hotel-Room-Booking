import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


const GET_ALL_Booking = "http://localhost:8181/api/booking/all"
const GET_BOOKING_BYUSER = "http://localhost:8181/api/booking/allbooking"
const ADD_Booking = "http://localhost:8181/api/booking/create"
const UPDATE_Booking = "http://localhost:8181/api/booking/update/"
const DELETE_Booking = "http://localhost:8181/api/booking/delete/"

export const fetchBooking = createAsyncThunk('booking/fetchBooking',async() =>{
    const response = await axios.get(GET_ALL_Booking)
    return response.data
})


// export const fetchUserBooking = createAsyncThunk('booking/fetchUserBooking',async(token) =>{
//     const response = await axios.get(GET_BOOKING_BYUSER,{
//          headers:{
//             'Authorization':token,
//         }
//     });

//     return response.data
// })

export const addNewBooking = createAsyncThunk('booking/addBooking', async(data)=>{
    console.log("Add new booking: "+data.booking)
    console.log("Get Token: "+data.token)
    const response = await axios.post(ADD_Booking,data.booking,{
            headers:{
                'Authorization':data.token
            }
    })
       
    return response.data;
})

export const updateBooking = createAsyncThunk('booking/updateBooking', async(data) => {
    console.log("Update Booking: "+data.booking)
    console.log("In the Booking Update Slice:"+ data.token)
    console.log("In the Booking Update Slice:"+ data.bookingId)
    const response = await axios.post(`${UPDATE_Booking}${data.bookingId}`,{
        headers:{
            
            'Authorization':data.token,
        },
    })
    return response.data;
})


export const deleteBooking = createAsyncThunk('booking/deleteBooking', async(data) => {
    console.log("DELETE:"+data.id)
    await axios.delete(`${DELETE_Booking}${data.id}`)
    const response = await axios.get(GET_ALL_Booking)
    return response.data
})

const initialState = {
    bookings: [],
    selectBooking:{},
    status: 'idle',
    error: null
}

export const bookingSlice = createSlice({

    name:"bookings",
    initialState,
    reducers:{

        // addBooking: {
        //     reducer(state, action) {
        //         state.selectBooking = action.payload;
        //     },
        //     prepare( id,phoneNo, lawyerName, description,username) {
        //         return {
        //             payload:{
        //                 id,
        //                 phoneNo,
        //                 lawyerName,
        //                 description,
        //                 username
        //             }
        //         }
        //     },
        // }

        addBooking : (state,action) => {
            state.selectBooking = action.payload
            console.log("selected booking rooms:"+state.selectBooking)
        },
       
    },
    extraReducers(builder){
        builder
            .addCase(fetchBooking.pending, (state,action) =>{
                state.status = 'loading'
            })
            .addCase(fetchBooking.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.bookings = action.payload
            })
            .addCase(fetchBooking.rejected, (state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewBooking.fulfilled,(state,action)=>{
                state.bookings.push(action.payload)
            })
            .addCase(updateBooking.fulfilled, (state, action) => {

                const booking = action.payload
                
                
                const bookings = state.bookings.filter( b => b.id !== booking.id)

                state.bookings = [booking, ...bookings]


            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings = action.payload
            })
            
    }
})

export const getAllBookings = (state) => state.bookings.bookings
export const getBookingStatus = (state) => state.bookings.status
export const getBookingError = (state) => state.bookings.error
export const getSelectedBooking = (state) => state.bookings.selectBooking
export const selectBookingById = (state, bookingId) => state.bookings.bookings.find(booking => booking.id === bookingId)
export const selectBookingByUserId = (state, userId) => state.bookings.bookings.filter(booking => booking.user.id === userId)
export const selectBookingByUsername = (state,username) => state.bookings.bookings.filter(booking => booking.username === username)

export const oneBooking = (state) => state.bookings.selectBooking

export const { addBooking } = bookingSlice.actions
export default bookingSlice.reducer