import { fetchAllUsers,getAllUsers,getUserStatus,getUserError } from "./userSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import AdminUser from "../User/AdminUser"


const UserList = () => {
    const userList = useSelector(getAllUsers)
    console.log("User List: "+ userList)

    const userStatus = useSelector(getUserStatus)

    const userError = useSelector(getUserError)

    const dispatch = useDispatch()
    useEffect(() => {
        if(userStatus === "idle"){
            dispatch(fetchAllUsers())
        }
    },[userStatus,dispatch]
    )
    
    let content;
    let index = 1;

    if(userStatus === 'loading'){
        content = (<p>Loading.....</p>)
    }


    if(userStatus === 'succeeded'){
        
        content = userList.map(
            (user) => (
                <AdminUser
                    key = {user.id}
                    no = {index++}
                    id = {user.id}
                    firstname = {user.firstname}
                    lastname = {user.lastname}
                    username = {user.username}
                    phone = {user.phone}
                    password = {user.password}
                    createdAt = {user.createdAt}
                    updatedAt = {user.updatedAt}

                    />
            )
        )
    
    }

    if(userStatus === 'failed'){
        content = <p>{userError}</p>
    }

    console.log("UserStatus: "+userStatus)
       
  return content;
}

export default UserList