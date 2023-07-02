



const AdminPayment = (props) => {
  // const dispatch = useDispatch()
  // const [isDeleteModal, setDeleteModal] = useState(false);

  // function deleteHandler() {
  //   console.log("hello delete");
  //   setDeleteModal(true);
  // }
  // function closeHandler() {
  //   setDeleteModal(false);
  // }
  // function confirmHandler() {
  //   dispatch(deletePayment({ id: props.id })).unwrap();
  //   setDeleteModal(false);
  // }
  // console.log("SetModalOpen: " + isDeleteModal);
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.holderName}</td>
      <td>{props.cardNo}</td>
      <td>{props.total}</td>
      <td>{props.cvc}</td>
      <td>{props.cardType}</td>
      {/**   <td>
        <Link to={`/payment-table/update-payment/${props.id}`} className="btn btn">
      Edit
        </Link>
        <Link onClick={deleteHandler} className="btn btn">
       Delete
        </Link>
        {isDeleteModal && (
          <ConfirmModal onCancel={closeHandler} onConfirm={confirmHandler} />
        )}
      
         
      </td>*/} 
    </tr>
  );
};

export default AdminPayment