import { useState } from "react";
import classes from "./ARoom.module.css";
import { Link } from "react-router-dom";
import Facilities from "../RoomType/Facilities";
import BackDrop from "../pages/BackDrop";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomTypeById } from "../RoomType/roomTypeSlice";
import { getAllRoom, getFilteredDate, setSelected } from "./roomSlice";

const ARoom = (props) => {
   
    const roomType = useSelector((state)=>selectRoomTypeById(state,Number(props.roomTypeId)))
    console.log("In the roomItem with roomType: "+roomType )

    const filteredDate = useSelector(getFilteredDate)
    console.log("Filter Date:"+filteredDate.checkIn+":"+filteredDate.checkOut)

    
  const dispatch = useDispatch()
  const card1 = `card ${classes.card2}`;
  const [isModalOpen,setModalOpen]= useState(false)
  const [isImageOpen, setImageOpen] = useState(false)
 
 

  // useEffect(()=>{
  //   dispatch(fetchRoomType())
  //   dispatch(fetchAllRoom())
  // },[/*dispatch*/])
  
  function detailHandler(){
    setModalOpen(true)
  }

  function closeHandler(){
    setModalOpen(false);
    setImageOpen(false)
  }

  
  function imageHandler(){
    setImageOpen(true)
  }

  const allrooms = useSelector(getAllRoom)
  console.log("All Rooms in <ARoom>:"+allrooms)

  const onSelected = () => {
    dispatch(setSelected( Number(props.id)));

  };

  
  // let numberOfRoom = 1;
  // const onSelected = () => {
  //   numberOfRoom++;
  //   const totalRoom = Number(props.totalRoom)
  //   console.log("TOTALROOM: "+totalRoom)
  //   if(numberOfRoom <= totalRoom)
  //   dispatch(setSelected({ id: Number(props.id), numberOfRoom }));

    
  // };

  

  const accId = `accordionFlushExample${props.id}`
  const accData = `#accordionFlushExample${props.id}`
  const container = `container ${classes.modal}`
  // console.log("Total Room in A room: "+props.totalRoom)

  function RoomView1(){
   
  return (
    <div className={container}>
        
    {/* <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={props.image2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={props.image3} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={props.image1} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}

<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={props.image1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={props.image2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={props.image3} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    </div>
  )
}


  return (
          <div className={card1}>
          
            <div className="card-header">
              <div className="row">
              <div className="col-sm-12 col-md-6">
                <img src={props.image1} onClick={imageHandler} className="mx-2 w-100" alt="...." />
                {isImageOpen && <RoomView1/>}
                {isImageOpen && <BackDrop onDrop={closeHandler}/>}
              </div>
              <div className="col-sm-12 col-md-6">
                <h5 className=" pt-3 d-block me-5" style={{color: "#29bfc2"}}>{props.roomTypeName}</h5>
                <ul>
                  {/* <li>{Number(props.totalRoom)}</li> */}
                  <li>{props.roomTypeDescription}</li>
                  <li>You can add extra bed.</li>
                  <li>2 Adult(s) Under 5 years stays free</li>
                  <li>Price : {props.roomTypePrice} MMK</li>
                  <li>
                  <Link  onClick={detailHandler}>
                  <small >More Detail</small>
                </Link>
                {isModalOpen && <Facilities 
                id = {roomType.id}
                facilities = {roomType.facilities}
                />}
                {isModalOpen && <BackDrop onDrop={closeHandler}/>}
                  </li>
                </ul>
                
                <button onClick={onSelected} className="btn">{(props.roomSelected) ? 'Selected' : 'Select'}</button>
              
              
           
                 
                
              </div>
              </div>
            </div>
            {/* <div className="card-body">
             <h5>Description</h5>
             <small>{props.description}</small>
            </div> */}
            {/* <hr></hr> */}
            
            <div className="accordion accordion-flush" id={accId}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Room Detail
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent={accData}
            >
              <div className="accordion-body">
              <h6>Descriptions</h6>
                <small>{parse(props.description)}</small>
              </div>
            </div>
          </div>
          </div>
        
          </div>
         
   
  );
};


export default ARoom;

