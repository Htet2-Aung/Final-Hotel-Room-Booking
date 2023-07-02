import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { useLocation } from "react-router-dom";
import {
  login,
  
  getRoles,
  getLoginStatus,
} from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import classes from "./LoginForm.module.css";
import { fetchAllUsers } from "./userSlice";
const LoginForm = (props) => {
  const dispatch = useDispatch();
  const card = `card px-4 ${classes.card}`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequestStatus, setLoginRequestStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());

    setMessage("");
  }, [email, password, dispatch]);

  const roleType = useSelector(getRoles);
  console.log("RoleType:" + roleType);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const canLogin =
    [email, password].every(Boolean) && loginRequestStatus === "idle";

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginStatus = useSelector(getLoginStatus);

  useEffect(() => {
    if (String(loginStatus) === "success") {
      if( roleType == "ROLE_ADMIN"){
        navigate('/admin', { replace: true });
      }else{
        navigate(from, { replace: true });
      }
    }
  }, [loginStatus,roleType, from, navigate]);

  useEffect(() => {
    if (String(loginStatus) === "failed") {
      setMessage(
        <span className="alert-danger">Username or password is incorrect</span>
      );
    }
  }, [loginStatus]);

  const onLogin = (e) => {
    e.preventDefault();

    if (canLogin) {
      setLoginRequestStatus("pending");

      try {
        dispatch(
          login({
            username: email,
            password,
          })
        ).unwrap();

        setEmail("");
        setPassword("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoginRequestStatus("idle");
      }
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className={card}>
          <form className="form" >
            {message}
            <h3 className={classes.title} style={{color: "#29bfc2"}}>Sign in to your account</h3>
            <div>
              <label for="exampleInputEmail1" className="form-label" style={{color: "#29bfc2"}}>
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={onEmailChange}
              />
            </div>
            <div>
              <label for="exampleInputPassword1" className="form-label" style={{color: "#29bfc2"}}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={onPasswordChange}
              />
            </div>
            <div className="row my-3 px-3">
              <button
                type="submit"
                className="btn text-light"
                style={{backgroundColor: "#29bfc2"}}
                onClick={onLogin}
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="text-center my-2" style={{color: "#1a8081"}}>
            No account?
            <Link to="/signup" style={{color: "#29bfc2"}}>Sign up</Link>
          </p>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default LoginForm;
