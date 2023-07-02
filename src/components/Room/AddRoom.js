import React, { useEffect, useState } from "react";
import { addNewRoom } from "./roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchRoomType, getAllRoomType } from "../RoomType/roomTypeSlice";
import ReactQuill from "react-quill";

const AddRoom = () => {


  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  // const [totalRoom, setTotalRoom] = useState("");
  const [roomTypeId , setRoomTypeId] = useState("")
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // const onDescriptionChange = (e) => setDescription(e.target.value);

  const onImage1Change = (e) => setImage1(e.target.value);
  const onImage2Change = (e) => setImage2(e.target.value);
  const onImage3Change = (e) => setImage3(e.target.value);
  // const ontotalRoomChange = (e) => setTotalRoom(e.target.value);
  const onRoomTypeNameChange = (e) => setRoomTypeId(e.target.value)
  const canSave =
    [description, image1, image2, image3].every(Boolean) &&
    addRequestStatus === "idle";

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const roomTypes = useSelector(getAllRoomType)
  console.log("In the create room: "+roomTypes)

  useEffect(() => {
    dispatch(fetchRoomType())
  },[dispatch])

  console.log("Can save: " + canSave);

  const onSubmit = (event) => {
    event.preventDefault();
      if(canSave){

        try {

          setAddRequestStatus('pending')

       dispatch(
        addNewRoom({
          room: {
            description,
            image1,
            image2,
            image3,
            // totalRoom
          },roomTypeId
        })
       ).unwrap()    
      } catch (error) {
        console.log(error)  
       }finally{
        setAddRequestStatus('idle')
       }
      }
       
      setDescription('')
      setImage1('')
      setImage2('')
      setImage3('')
      navigate(`/admin/roomTable`)
    }


  return (
    <div className="container-fluid bg-white">
      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <div className="card px-4 mb-3" style={{boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.2)"}}>
        
            <form onSubmit={onSubmit}>
              <div className="row my-2">
              <div className="col-md-6">
              <label for="roomType" className="form-label">
                  Room Type
                </label>
              <select className="form-select"  value={roomTypeId} onChange={onRoomTypeNameChange}>
                  <option value="">Choose Room Type</option>
                  {roomTypes.map((roomType) =>

                      <option value={roomType.id}>
                          {roomType.name}
                      </option>

                      )};
                  
                  
                </select>
              </div>
              <div className="col-md-6">
            
                <label for="image1" className="form-label">
                  Room's Bed
                </label>
                <input type="text" className="form-control" value={image1} onChange={onImage1Change}  placeholder="Image Url"/>
             
              </div>
            
              </div>
              <div className="row my-2">
              <div className="col-md-6">
             
                <label for="image2" className="form-label">
                  Room's Bath
                </label>
                <input type="text" className="form-control" value={image2} onChange={onImage2Change} placeholder="Image Url" />
              
              </div>
              <div className="col-md-6">
            
              <label for="image3"  className="form-label">
                  Room's Toilet
                </label>
                <input type="text" className="form-control" value={image3} onChange={onImage3Change} placeholder="Image Url" />
              </div>
              {/* <div>
              <label for="totalRoom"  className="form-label">
                 Total Room
                </label>
                <input type="number" className="form-control" value={totalRoom} onChange={ontotalRoomChange} placeholder="Total Room" />
              </div> */}
              </div>
              <div className="my-3">
                <label for="Description" className="form-label">
                  Description
                </label>
                <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={onDescriptionChange}></textarea> */}
              </div>
              <div className="mb-3 text-center">
                <button type="submit" className="btn text-light" style={{backgroundColor: "#29bfc2"}}>
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
