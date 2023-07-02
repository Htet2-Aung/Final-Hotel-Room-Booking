import $ from 'jquery'


const BookingRoomTable = () => {

    $(document).ready(function(){
        setTimeout(function(){
            $('#example').DataTable()
        },1000)
    })

  return (
    <div className="MainDiv">
    <div className=" text-center">
        <h3>Booking Room List</h3>
    </div>
     
    <div className="container">
         
        <table id="example" className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
           
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
     
           
        </tbody>
      </table>
         
      </div>
    </div>
  )
}

export default BookingRoomTable