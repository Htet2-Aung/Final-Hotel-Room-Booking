import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectRoomById, updateRoom } from './roomSlice';
import { fetchRoomType, getAllRoomType } from '../RoomType/roomTypeSlice';
import ReactQuill from 'react-quill';

const UpdateRoom = () => {

    const { roomId } = useParams()
    const room = useSelector((state) => selectRoomById(state,Number(roomId)))
    console.log("Room Id in update form:"+roomId)
    console.log("Room in update form: "+room)

    const [id,setId] = useState(room?.id)
    const [description, setDescription] = useState(room?.description);
    const [image1, setImage1] = useState(room?.image1);
    const [image2, setImage2] = useState(room?.image2);
    const [image3, setImage3] = useState(room?.image3);
    const [roomTypeId , setRoomTypeId] = useState(room?.roomType.id)
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
  
    // const onDescriptionChange = (e) => setDescription(e.target.value);
  
    const onImage1Change = (e) => setImage1(e.target.value);
    const onImage2Change = (e) => setImage2(e.target.value);
    const onImage3Change = (e) => setImage3(e.target.value);
    const onRoomTypeNameChange = (e) => setRoomTypeId(e.target.value)
    const canSave =
      [description, image1, image2, image3].every(Boolean) &&
      addRequestStatus === "idle";
  
      const dispatch = useDispatch()
      const navigate = useNavigate()

      const roomTypes = useSelector(getAllRoomType)
  console.log("In the update room: "+roomTypes)

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
          updateRoom({
            room: {
                id,
              description,
              image1,
              image2,
              image3
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card px-4 mb-3">
              <form onSubmit={onSubmit}>
              <div className="my-3">
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
            
                <div className="mb-3">
                  <label for="image1" className="form-label">
                    Image1
                  </label>
                  <input type="text" className="form-control" value={image1} onChange={onImage1Change}  placeholder="Image Url"/>
                </div>
                <div className="mb-3">
                  <label for="image2" className="form-label">
                    Image2
                  </label>
                  <input type="text" className="form-control" value={image2} onChange={onImage2Change} placeholder="Image Url" />
                </div>
                <div className="mb-3">
                  <label for="image3"  className="form-label">
                    Image3
                  </label>
                  <input type="text" className="form-control" value={image3} onChange={onImage3Change} placeholder="Image Url" />
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
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UpdateRoom