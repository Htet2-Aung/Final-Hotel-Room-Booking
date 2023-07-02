import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectPaymentById, updatePayment } from "./paymentSlice";
import { useDispatch, useSelector } from "react-redux";

const UpdatePayment = () => {

  const { paymentId } = useParams();
  const payment = useSelector((state) =>
    selectPaymentById(state, Number(paymentId))
  );
  console.log("Payment Id" + paymentId);
  console.log("Payment by id" + payment);

  
  const[id,setId]=useState(payment?.id)
  const[total,setTotal]=useState(payment?.total)
  const [holderName, setHoldername] = useState(payment?.holderName);
  const [cardNo, setCardnumber] = useState(payment?.cardNo);
  const [cvc, setCvc] = useState(payment?.cvc);
  const [cardType, setCardtype] = useState(payment?.cardType);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onIdChange =(e)=>setId(e.target.value);
  const onHolderNameChange = (e) => setHoldername(e.target.value);
  const onCardNumberChange = (e) => setCardnumber(e.target.value);
  const onCVCChange = (e) => setCvc(e.target.value);
  const onCardTypeChange = (e) => setCardtype(e.target.value);

  const cansave =
    [ id,holderName, cardNo, cvc, cardType].every(Boolean) &&
    addRequestStatus === "idle";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (cansave) {
      try {
        console.log("If can save");
        setAddRequestStatus("pending");

        dispatch(
          updatePayment({
            payment: {
              id,
              total,
              holderName,
              cardNo,
              cvc,
              cardType,
            },
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }
      setId("");
      setHoldername("");
      setCardnumber("");
      setCvc("");
      setCardtype("");
      navigate("/payment-table");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card px-4 mb-3">
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <label for="holdername" className="form-label">
                    HolderName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="payment"
                    value={holderName}
                    onChange={onHolderNameChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="cardnumber" className="form-label">
                    Card Number
                  </label>
                  <input
                    className="form-control"
                    rows="5"
                    id="cardnumber"
                    name="number"
                    value={cardNo}
                    onChange={onCardNumberChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="cvc" className="form-label">
                    CVC
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cvc"
                    value={cvc}
                    onChange={onCVCChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="cardtype" className="form-label">
                    Card Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardtype"
                    value={cardType}
                    onChange={onCardTypeChange}
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
  );
};

export default UpdatePayment;
