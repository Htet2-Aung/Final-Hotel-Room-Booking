import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { register } from '../User/userSlice'
import { Link, useNavigate } from 'react-router-dom';
import  classes from "./SignUpForm.module.css"

const SignUpForm = (props) => {

  const card = `card ${classes.card}`

    const [firstname,setFirstname] = useState ('')
    const [lastname,setLastname] = useState ('')
    const [username,setUsername] = useState ('')
    const [phone,setPhone] = useState ('')
    const [password,setPassword] = useState ('')
    const [confirmPassword,setConfirmPassword] = useState ('')
    const [registerRequestStatus,setRegisterRequestStatus] = useState('idle')
    const [passwordError, setPasswordError] = useState({
      password: "",
      confirmPassword: "",
    });

    const onFirstnameChange = (e) => setFirstname(e.target.value)
    const onLastnameChange = (e) => setLastname(e.target.value)
    const onUsernameChange = (e) => setUsername(e.target.value)
    const onPhoneChange = (e) => setPhone(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    const canCreate = [firstname,lastname,username,phone,password,confirmPassword].every(Boolean) && registerRequestStatus === 'idle'
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const onFormSubmit = (e) => {
      e.preventDefault()

      if(canCreate){
        if (confirmPassword !== password) {
          setPasswordError({
            confirmPassword: "Password and confirm password must be same!",
          });
          return;
        }
  
        if (!password) {
          setPasswordError({
            password: "Password should not be empty",
          });
          return;
        }
        setRegisterRequestStatus('pending')
       
          try {
            dispatch(
              register({
                user:{
                firstname,
                lastname,
                username,
                phone,
                password,
                confirmPassword
                }
                
               
              })
            ).unwrap()
              setFirstname('')
              setLastname('')
              setUsername('')
              setPhone('')
              setPassword('')
              setConfirmPassword('')
  
             
  
          } catch (error) {
            console.log(error)
          }finally{
            setRegisterRequestStatus('idle')
          }
          navigate("/login")
       

      }
    }

   
   

  return (
    <div className='row mt-4'>
      <div className='col-md-4'></div>
      <div className='col-md-4'>
      <div className={card}>
    <form className={classes.form}>
    <p className={classes.title} style={{color: "#29bfc2"}}>Register </p>
    <p className={classes.message} style={{color: "#29bfc2"}}>Signup now and get full access to our app. </p>
        <div className={classes.flex}>
        <label>
            <input required id ="firstname"  type="text" className={classes.input}  onChange={onFirstnameChange} value={firstname}/>
            <span>Firstname</span>
        </label>

        <label>
            <input  required id ="lastname"  type="text" className={classes.input} onChange={onLastnameChange} value={lastname}/>
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input required id ="username"  type="email" className={classes.input} onChange={onUsernameChange} value={username}/>
        <span>Email</span>
    </label> 

    <label>
        <input required id ="phone"  type="text" className={classes.input} onChange={onPhoneChange} value={phone}/>
        <span>Phone</span>
    </label> 
        
    <label>
        <input required id ="password"  type="password" className={classes.input} onChange={onPasswordChange} value={password}/>
        <span>Password</span>
    </label>
    <label>
        <input required id ="confirmPassword"  type="password" className={classes.input} onChange={onConfirmPasswordChange} value={confirmPassword}/>
        <span>Confirm password</span>
    </label>
    <span value={passwordError} className={classes.errormessage}>
              {passwordError.confirmPassword}
            </span>
    <button className={classes.submit} style={{backgroundColor: "#29bfc2"}} disabled={!canCreate} onClick={onFormSubmit}>Submit</button>
    <p className="signin" style={{color: "#1a8081"}}>Already have an acount ? <Link to="/login" style={{color: "#29bfc2"}}>Signin</Link> </p>
</form>
</div>
      </div>
      <div className='col-md-4'></div>
    </div>
 
  )
}

export default SignUpForm