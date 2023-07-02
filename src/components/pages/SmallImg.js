

const SmallImg = (props) => {

  return (
    <div>
            <div className="card mb-2">
              <div className="row no-gutters">
                <div className="col-4  h-100">
                  <img src={props.image1} alt="" className="card-img  ms-2 pt-1"></img>
                </div>
                <div className="col-8">
                  <div className="d-flex">
                    <div className="w-100 ml-2 mt-2">
                      <small className="room-name-color">{props.roomType}</small>
                    </div>
                  </div>
                  <div className="ml-2 mb-2">
                    <div>
                      <small>
                        <div className="text-muted">Sleep - 2 Adult(s)</div>
                      </small>
                    </div>
                    <div className="text-muted">
                      <small>Under 5 years stays free</small>
                    </div>
                    <div>
                      <small>2 Nights</small>
                      <small className="font-weight-bold">{props.price}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default SmallImg;


