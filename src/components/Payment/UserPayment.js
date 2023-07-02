import React, { useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import classes from "./PaymentUser.module.css";
import { Link } from "react-router-dom";
const UserPayment = (props) => {
  const card = `card ${classes.first}`
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [isPaymentModal, setPaymentModal] = useState(true);

  function deleteHandler() {
    console.log("hello delete");
    setDeleteModal(true);
  }
  function closeHandler() {
    setDeleteModal(false);
  }
  function confirmHandler() {
    // dispatch(deletePayment({ id: props.id })).unwrap();
    setDeleteModal(false);
    setPaymentModal(false);
  }
  function PaymentInfo() {
    return (
      <div className={card}>
      <div className="card-body mx-4">
        <div className="container">
          <p className="mx-2 text-center">Thank for your purchase</p>
          <div className="row">
            <ul className="list-unstyled">
              <li className="text-dark">{props.holderName}</li>
              <li className="text-muted mt-1"><span className="text-dark">{props.cardType}</span></li>
              <li className="text-dark mt-1">{props.booking.createdAt}</li>
            </ul>
            <hr/>
            <div className="col-xl-10">
              <p>Card Number</p>
            </div>
            <div className="col-xl-2">
              <p className="float-end">{props.cardNo}
              </p>
            </div>
            <hr/>
          </div>
          <div className="row">
            <div className="col-xl-10">
              <p>CVC</p>
            </div>
            <div className="col-xl-2">
              <p className="float-end">{props.cvc}
              </p>
            </div>
            <hr/>
          </div>
          <div className="row">
            <div className="col-xl-10">
              <p>Total</p>
            </div>
            <div className="col-xl-2">
              <p className="float-end">{props.total}MMK
              </p>
            </div>
            {/* <hr style={{border: "2px solid black"}}/> */}
          </div>
          {/* <div className="row text-black">
    
            <div className="col-xl-12">
              <p className="float-end fw-bold">Total: $10.00
              </p>
            </div>
            <hr style={{border: "2px solid black"}}/>
          </div> */}
          <div className="text-center mt-2">
         
          <div className={classes.action}>
              <Link className={classes.button} onClick={deleteHandler}>
                Delete
              </Link>
              {isDeleteModal && 
                <ConfirmModal
                  onCancel={closeHandler}
                  onConfirm={confirmHandler}
                />}
           
          </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  return <>{isPaymentModal && <PaymentInfo />}</>;
};

export default UserPayment;


