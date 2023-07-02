import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { selectRoomTypeById, updateRoomType } from './roomTypeSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'

const UpdateRoomType = () => {

    const {roomTypeId} = useParams()
    const roomType = useSelector((state)=>selectRoomTypeById(state,Number(roomTypeId)))
    console.log("RoomType Id: "+roomTypeId)
    console.log("RoomType By Id: "+roomType)

    const [id,setId] = useState(roomType?.id)
    const [name,setName] = useState(roomType?.name)
    const [description,setDescription] = useState(roomType?.description)
    const [price,setPrice] = useState(roomType?.price)
    const [facilities, setFacilities] = useState(roomType?.facilities)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onNameChange = (e) => setName(e.target.value);
    const onDescriptionChange = (e) => setDescription(e.target.value);
    const onPriceChange = (e) => setPrice(e.target.value);
    //  const onFacilitiesChange = (e) => setFacilities(e.target.value);

    const cansave = [name,description,price,facilities].every(Boolean) && addRequestStatus === 'idle'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (event) =>{
        event.preventDefault()

        if(cansave){
            try {
                console.log("If can save");
                setAddRequestStatus("pending");
        
                dispatch(
                  updateRoomType({
                    roomType: {
                        id,
                      name,
                      description,
                      price,
                      facilities,
                    },
                  })
                ).unwrap();
              } catch (error) {
                console.log(error);
              } finally {
                setAddRequestStatus("idle");
              }
        
              setName("");
              setDescription("");
              setPrice("");
              setFacilities("");
              navigate("/admin/roomtypeTable");
        }
    }

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card px-4 mb-3">
            <form onSubmit={onSubmit}>
              <div className="my-3">
                <label for="exampleInputEmail1" className="form-label">
                  Room Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomType"
                  value={name}
                  onChange={onNameChange}
                />
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  name="text"
                  value={description}
                  onChange={onDescriptionChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={onPriceChange}
                />
              </div>
              <div className="mb-3">
                <label for="facilities" className="form-label">
                  Facilities
                </label>

                <ReactQuill
                  theme="snow"
                  value={facilities}
                  onChange={setFacilities}
                />
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
  </>
  )
}

export default UpdateRoomType