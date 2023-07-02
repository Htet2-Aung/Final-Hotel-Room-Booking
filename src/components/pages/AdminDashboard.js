import { Link, Outlet } from "react-router-dom";
import AdminCards from "./AdminCards";
import { getToken, logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./AdminDashboard.module.css"
import { getCard, getChart, getCustom, setCard, setChart, setCustom } from "../BookingRoom/bookingRoomSlice";
import oasis from "../images/oasis.png"
import ChartTable from "../tables/ChartTable";

const AdminDashboard = () => {

    const nav = `navbar-nav sidebar  accordion ${classes.navbg}`
    
    const showCard = useSelector(getCard)
    const isCustom = useSelector(getCustom)
    const isChart = useSelector(getChart)
    
    const token = useSelector(getToken);

  const dispatch = useDispatch();
  let adminAccountItem = "";

  if (token) {
    adminAccountItem = (
      <Link
        to="/login"
        className="nav-link"
        
        onClick={() => {
          dispatch(logout());
          
        } }
      >
       <i className="fas fa-sign-out-alt "></i>
       <span>Log out</span>
      </Link>
    );
  } else {
    adminAccountItem = (
      <Link to="/" className="dropdown-item">
        Log in
      </Link>
    );
  }


  const hideCard = (e) => {
    e.preventDefault()
    dispatch(setCard(false))
    dispatch(setCustom(true))
    dispatch(setChart(false))
    
  }

  const isShown = (e) => {
    e.preventDefault()
    dispatch(setCard(true))
    dispatch(setCustom(false))
    dispatch(setChart(true))
  }


  console.log("In the admin dashboard for card: "+showCard)


    
  return (
    
    <div id="wrapper">
      <ul
        className={nav}
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/admin" onClick={isShown}
        >
          <div className="sidebar-brand-icon">
            {/* <i className="fas fa-laugh-wink"></i>  rotate-n-15*/}
            <img src={oasis} className="w-100"/>
          </div>
          <div className="sidebar-brand-text mx-3 text-white">
          Relaxation Oasis 
          </div>
        </Link>

        <hr className="sidebar-divider bg-light my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="/admin" onClick={isShown}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider bg-light" />

        <div className="sidebar-heading">Addons</div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#collapsePages"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Forms</span>
          </a>

          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded" onClick={hideCard}>
              <h6 className="collapse-header">Custom Components:</h6>
              <Link to="/admin/addroom" className="collapse-item">Create Room</Link>
              
              <Link className="collapse-item" to="/admin/createroomType">
                Create Room Type
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#collapseTable"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="collapseTable"
          >
            <i className="fas fa-fw fa-table"></i>
            <span>Tables</span>
          </a>

          <div
            id="collapseTable"
            className="collapse"
            aria-labelledby="headingTables"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded"  onClick={hideCard}>
              <h6 className="collapse-header">Custom Components:</h6>
              <Link className="collapse-item" to="/admin/userlist-table">
                User Table
              </Link>
             
              <Link className="collapse-item" to='/admin/bookingTable'>
                Booking Table
              </Link>
              <Link className="collapse-item" to="/admin/roomTable">
                Room Table
              </Link>
              <Link className="collapse-item" to="/admin/roomTypeTable">
                RoomType Table
              </Link>
             
              <Link className="collapse-item" to="/admin/paymentTable">
                Payment Table
              </Link>
             
            </div>
          </div>
        </li>
        <div  onClick={isShown}>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Charts</span>
          </Link>
        </li>
</div>

        <hr className="sidebar-divider bg-light d-none d-md-block" />

        <li className="nav-item">
       
         
            {adminAccountItem}
         
        </li>
        <hr className="sidebar-divider bg-light d-none d-md-block" />
        {/* <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div> */}
      </ul>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar  static-top ">
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i className="fa fa-bars"></i>
            </button>


            <ul className="navbar-nav">
            
              <h1 className="h5 mb-0 text-gray-800">Dashboard</h1>
              {/* <a
                href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="fas fa-download fa-sm text-white-50"></i> Generate
                Report
              </a> */}
            </ul>  
          </nav>
         
          <div className="container-fluid bg-white">
          

            <div className="row bg-white">
              {showCard && <AdminCards/>}
            </div>
          </div>
      
              {isChart && <ChartTable/>}
              {isCustom && <Outlet/> } 
          {/* {isRoomOpen && <AddRoom/>}
          {isRoomTypeOpen && <CreateRoomType/>}
          {isRoomTypeTable && <RoomTypeTable/>} */}
          <div  className="bg-white w-100 h-50"></div>
        </div>
      </div>
{/* 
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a> */}

    </div>
  );
};

export default AdminDashboard;
