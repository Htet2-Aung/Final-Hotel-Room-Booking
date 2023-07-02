import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import userReducer from "../components/User/userSlice"
import roomTypeReducer from "../components/RoomType/roomTypeSlice"
import roomReducer from "../components/Room/roomSlice"
import bookingReducer from "../components/Booking/bookingSlice"
import paymentReducer from "../components/Payment/paymentSlice"
import bookingRoomsReducer from "../components/BookingRoom/bookingRoomSlice"
import emailReducer from "../components/Email/emailSlice"

export const store = configureStore({
    reducer:{
        auths : authReducer,
        users : userReducer,
        rooms:roomReducer,
        roomTypes:roomTypeReducer,
        bookings: bookingReducer,
        bookingRooms: bookingRoomsReducer,
        payments : paymentReducer,
        emails : emailReducer,
    }
})