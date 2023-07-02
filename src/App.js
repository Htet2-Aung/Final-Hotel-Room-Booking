import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./components/pages/AdminDashboard";
import RoomTypeTable from "./components/tables/RoomTypeTable";
import AddRoom from "./components/Room/AddRoom";
import CreateRoomType from "./components/RoomType/CreateRoomType";
import UpdateRoomType from "./components/RoomType/UpdateRoomType";
import RoomTable from "./components/tables/RoomTable";
import UpdateRoom from "./components/Room/UpdateRoom";
import PaymentShow from "./components/Payment/PaymentShow";
import BookingShow from "./components/Booking/BookingShow";
import BookingRoomTable from "./components/tables/BookingRoomTable";
import Layout from "./components/ui/Layout";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Room from "./components/RoomType/Room";
import RoomDetail from "./components/Room/RoomDetail";
import YourBooking from "./components/Booking/YourBooking";
import Questions from "./components/pages/Questions";
import BookingForm from "./components/Booking/BookingForm";
import Facilities from "./components/RoomType/Facilities";
import Payment from "./components/Payment/Payment";
import Deposite from "./components/Payment/Deposite";
import SelectedRoom from "./components/Room/SelectedRoom";

import UserPaymentInfo from "./components/Payment/UserPaymentInfo";
import UserProfileForm from "./components/User/UserProfileForm";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import UserListTable from "./components/tables/UserListTable";
import SignUpForm from "./components/User/SignUpForm";
import LoginForm from "./components/User/LoginForm";
import AdminCards from "./components/pages/AdminCards";
import BookingDetails from "./components/tables/BookingDetails";
import ChartTable from "./components/tables/ChartTable";
import SlideShow from "./components/RoomType/SlideShow";





function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="/admin/card" element={<AdminCards />} />
            <Route path="/admin/userlist-table" element={<UserListTable />} />
            <Route path="/admin/addroom" element={<AddRoom />} />
            <Route path="/admin/createroomType" element={<CreateRoomType />} />
            <Route path="/admin/roomtypeTable" element={<RoomTypeTable />} />
            <Route path="/admin/chart" element={<ChartTable />} />
            <Route path="/admin/bookingDetails/:bookingId" element={<BookingDetails />} />
            <Route
              path="/admin/roomtypeTable/updateroomType/:roomTypeId"
              element={<UpdateRoomType />}
            />
            <Route path="/admin/roomTable" element={<RoomTable />} />
            <Route
              path="/admin/roomTable/updateroom/:roomId"
              element={<UpdateRoom />}
            />
            {/* <Route path="/admin/bookingTable" element={<BookingTable/>}/> */}
            <Route path="/admin/paymentTable" element={<PaymentShow />} />
            <Route path="/admin/bookingTable" element={<BookingShow />} />
            <Route
              path="/admin/bookingRoomTable"
              element={<BookingRoomTable />}
            />
          </Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/room-detail/:roomTypeId" element={<RoomDetail />} />
          <Route path="/frequently-asked-questions" element={<Questions />} />
          <Route
            path="/room-detail/selectedRoom/:roomId"
            element={<SelectedRoom />}
          />
          <Route path="/slide" element={<SlideShow />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/facility" element={<Facilities />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
            <Route path="/user-profile/:userId" element={<UserProfileForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/selectedRoom" element={<SelectedRoom />} />
            <Route path="/deposite" element={<Deposite />} />
            <Route path="/find-your" element={<YourBooking />} />
            {/* <Route path="/find-your/updateBooking/:bookingId" element={<UpdateBooking />} /> */}
            <Route path="/form" element={<BookingForm />} />
            <Route path="/paymentInfo" element={<UserPaymentInfo />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
