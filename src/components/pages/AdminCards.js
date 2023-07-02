import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, getAllUsers } from '../User/userSlice'
import { fetchBooking, getAllBookings } from '../Booking/bookingSlice'
import { fetchAllRoom, getAllRoom } from '../Room/roomSlice'
import { fetchAllPayments, getAllPayments } from '../Payment/paymentSlice'
import { Link } from 'react-router-dom'
import { setChart, setCustom } from '../BookingRoom/bookingRoomSlice'
import classes from './AdminDashboard.module.css'

const AdminCards = () => {

  const users = useSelector(getAllUsers)
  console.log("All User in card: "+users)
  const userCount = Object.keys(users).length
  console.log("All User in card: "+userCount)

  const bookings = useSelector(getAllBookings)
  const bookingCount = Object.keys(bookings).length

  const rooms = useSelector(getAllRoom)
  const roomsCount = Object.keys(rooms).length

  const payments = useSelector(getAllPayments)
  let totalPayment= 0;
  payments.map((pay) => 
  totalPayment += pay.total
  )
  console.log("Total payment: "+totalPayment)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllUsers())
    dispatch(fetchBooking())
    dispatch(fetchAllRoom())
    dispatch(fetchAllPayments())
  },[dispatch])

  const showCustom = (e) => {
    e.preventDefault()
    dispatch(setCustom(true))
    dispatch(setChart(false))
  }

  const card1 = `card border-left-primary  h-100 py-2 ${classes.card}`
  const card2 = `card border-left-success  h-100 py-2 ${classes.card}`
  const card3 = `card border-left-info  h-100 py-2 ${classes.card}`
  const card4 = `card border-left-warning  h-100 py-2 ${classes.card}`

  return (
   <>
   <div className='row' onClick={showCustom}>
    <div className="col-xl-3 col-md-6 mb-4" >
    <Link className="collapse-item" to="/admin/userlist-table" style={{textDecoration: 'none'}}>
                <div className={card1}>
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                    
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                         Users
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                       {userCount}
                        </div>
                      </div>
                      <div className="col-auto">
                      <i className='far fa-user fa-2x text-gray-300'></i>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
          

              <div className="col-xl-3 col-md-6 mb-4">
              <Link className="collapse-item" to='/admin/bookingTable' style={{textDecoration: 'none'}}>
                <div className={card2}>
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                         Bookings
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {bookingCount}
                        </div>
                      </div>
                      <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300" ></i>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
              <Link className="collapse-item" to="/admin/roomTable" style={{textDecoration: 'none'}}>
                <div className={card3}>
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Rooms
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              {roomsCount}
                            </div>
                          </div>
                          {/* <div className="col">
                            <div className="progress progress-sm mr-2">
                              <div
                                className="progress-bar bg-info"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-auto">
                      <i className='fas fa-bed fa-2x text-gray-300'></i>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
              <Link className="collapse-item" to="/admin/paymentTable" style={{textDecoration: 'none'}}>
                <div className={card4}>
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Payments
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {totalPayment} MMK
                        </div>
                      </div>
                      <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                       
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
              </div>
              <hr style={{border: "1px solid #000000"}}/>
   </>
  )
}

export default AdminCards