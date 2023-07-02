import { Link } from "react-router-dom";
import { updatePassword } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";
import { logout } from "../../features/auth/authSlice";
//import { updateUser } from "../../features/auth/authSlice"

const UserProfileForm = () => {
  const dispatch = useDispatch();
  //add user data to frontend

  const loginUser = useSelector((state) => state.auths.user);

  console.log("Log in user: " + loginUser);
  const userId = loginUser.id;
  console.log("In the user profile Form id is :" + userId);

  //  let getId;
  //  getId = user.id;

  //const info = useSelector(getUser)
  // console.log(info)
  //let userId;

  // const {loginUserId} = useParams(userId)
  //  const user = useSelector((state)=>selectUserByIdFromAuth (state,Number(loginUserId)))

  const user = loginUser;

  console.log("User Id: " + userId);
  console.log("user object is ::::::::::::::::::::" + user);

  const [id, setId] = useState(user.id);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createdAt, setCreatedAt] = useState(user.createdAt);
  const [passwordError, setPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });


  const [updateRequestStatus, setUpdatRequestStatus] = useState("idle");

  const onFirstnameChange = (e) => setFirstname(e.target.value);
  const onLastnameChange = (e) => setLastname(e.target.value);
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const onCreatedAtChange = (e) => setCreatedAt(e.target.value);
  const canUpdate =
    [firstname, lastname, username, phone,password, createdAt].every(
      Boolean
    ) && updateRequestStatus === "idle";
    console.log([firstname, lastname, username, phone,password, createdAt]);

    const canPasswordUpdate =
    [firstname, lastname, username, phone,password, createdAt].every(
      Boolean
    ) && updateRequestStatus === "idle";
    console.log([firstname, lastname, username, phone,password, createdAt]);


    
  
  const navigate = useNavigate();

  const onPasswordSubmit = (e) => {
    e.preventDefault();

    if (canUpdate) {
      
      try {
        console.log("If can update,...");
        setUpdatRequestStatus("pending");
        if (confirmPassword !== password) {
          setPasswordError({
            confirmPassword: "New Password and Repeat New password must be same!",
          });
          return;
        }
  
        if (!password) {
          setPasswordError({
            password: "Password should not be empty",
          });
          return;
        }
        dispatch(
          updatePassword({
            user: {
              id,
              firstname,
              lastname,
              username,
              phone,
              password,
              createdAt,
            },
          })
        ).unwrap();
        dispatch(logout());
        setFirstname("");
        setLastname("");
        setUsername("");
        setPhone("");
        setPassword("");
        setCreatedAt("");

        navigate("/login");
      } catch (error) {
        console.log(error);
      } finally {
        setUpdatRequestStatus("idle");
      }
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (canUpdate) {
      try {
        console.log("If can update,...");
        setUpdatRequestStatus("pending");

        dispatch(
          updateUser({
            user: {
              id,
              firstname,
              lastname,
              username,
              phone,
              password,
              createdAt,
            },
          })
        ).unwrap();
        dispatch(logout());
        setFirstname("");
        setLastname("");
        setUsername("");
        setPhone("");
        setPassword("");
        setCreatedAt("");

        navigate("/login");
      } catch (error) {
        console.log(error);
      } finally {
        setUpdatRequestStatus("idle");
      }
    }
  };

  return (
    <div class="container light-style flex-grow-1 container-p-y">
      <h4 class="font-weight-bold py-3 mb-4">Account settings</h4>

      <div class="card overflow-hidden">
        <div class="row no-gutters row-bordered ">
          <div class="col-md-3 pt-0">
            <div class="list-group list-group-flush account-settings-links" style={{backgroundColor: "#29bfc2"}}>
              <a
                class="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
              >
                Profile
              </a>
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-change-password"
              >
                Change password
              </a>
              {/* <a class="list-group-item list-group-item-action dropdown-item font-weight-bold " data-toggle="list" href="#account-info">DELETE ACCOUNT</a> */}
            </div>
          </div>
          <div class="col-md-9">
            <div class="tab-content">
              <div class="tab-pane fade active show" id="account-general">
                <hr class=" m-0" />

                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input
                      type="text"
                      class="form-control mb-1"
                      value={firstname}
                      onChange={onFirstnameChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      value={lastname}
                      onChange={onLastnameChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input
                      type="text"
                      class="form-control mb-1"
                      value={username}
                      onChange={onUsernameChange}
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input
                      type="text"
                      class="form-control"
                      value={phone}
                      onChange={onPhoneChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Registration Date</label>
                    <input
                      type="text"
                      class="form-control"
                      value={createdAt}
                      onChange={onCreatedAtChange}
                      disabled
                    />
                  </div>
                  <div class="text-right mt-3">
        <button
          type="button"
          class="btn btn-primary"
          onClick={onFormSubmit}
          disabled={!canUpdate}
        >
          Save changes
        </button>
        &nbsp;
        <Link to="/">
          <button type="button" class="btn btn-default">
            Cancel
          </button>
        </Link>
      </div>
       
                </div>
              </div>
              <div class="tab-pane fade" id="account-change-password">
                <div class="card-body pb-2">
                  <div class="form-group" hidden>
                    <label class="form-label" >Current password</label>
                    <input
                      type="password"
                      class="form-control"
                      value={password}
                      hidden
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">New password</label>
                    <input type="password" class="form-control"  onChange={onPasswordChange}/>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Repeat new password</label>
                    <input type="password" class="form-control" value={confirmPassword} onChange={onConfirmPasswordChange} />
                  </div>
                  <span value={passwordError} className='text-danger'>
              {passwordError.confirmPassword}
            </span>

                  <div class="text-right mt-3">
        <button
          type="button"
          class="btn btn-primary"
          onClick={onPasswordSubmit}
          disabled={!canUpdate}
          style={{backgroundColor: "#29bfc2"}}
        >
          Save changes
        </button>
        &nbsp;
        <Link to="/">
          <button type="button" class="btn btn-default">
            Cancel
          </button>
        </Link>
      </div>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="text-right mt-3">
        <button
          type="button"
          class="btn btn-primary"
          onClick={onFormSubmit}
          disabled={!canUpdate}
        >
          Save changes
        </button>
        &nbsp;
        <Link to="/">
          <button type="button" class="btn btn-default">
            Cancel
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default UserProfileForm;
