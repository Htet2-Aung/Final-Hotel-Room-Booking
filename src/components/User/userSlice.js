import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REGISTER_URL = 'http://localhost:8181/api/user/create'
const SHOW_USERLIST_URL = 'http://localhost:8181/api/user/all'
const UPDATE_USER_URL = 'http://localhost:8181/api/user/update'
const DELETE_USER_URL = 'http://localhost:8181/api/user/delete'
const UPDATE_PASSWORD_URL = "http://localhost:8181/api/user/updatePassword";

export const register = createAsyncThunk('users/register', async (data) => {
    console.log(data.user)
    const response = await axios.post (REGISTER_URL,data.user, {
        'Content-Type' : 'application/json',
    })
    return response.data
})  

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers',async() =>{
    const response = await axios.get(SHOW_USERLIST_URL)
    console.log(response.data)
    return response.data
})

// export const getUserById = createAsyncThunk('users/getUserById',async() =>{
//     const response = await axios.get(GET_USER_URL+id)
//     console.log(response.data)
//     return response.data
// })



export const updateUser = createAsyncThunk('users/updateUser', async(data) => {
    const response = await axios.put(UPDATE_USER_URL,data.user)
    
    return response.data;
})

export const updatePassword = createAsyncThunk(
    "users/updatePassword",
    async (data) => {
      const response = await axios.put(UPDATE_PASSWORD_URL, data.user);
  
      return response.data;
    }
  );

export const deleteUser = createAsyncThunk('users/deleteUser', async(data)=> {
   const {id} = data

    const response = await axios.delete(`${DELETE_USER_URL}/${data.id}`)
    return response.data;
})

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const userSlice = createSlice({

    name:"users",
    initialState,
    reducers:{
        register:{
            reducer(state,action){
                state.push(action.payload);
            },
            prepare(id,firstname,lastname,username,phone,password,createdAt,updatedAt){
                return{
                    payload:{
                        id,firstname,lastname,username,phone,password,createdAt,updatedAt
                    }
                }
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(register.fulfilled,(state,action) => {
            console.log(action.payload)
            state.users =action.payload
            })
            .addCase(fetchAllUsers.pending, (state,action) =>{
                state.status = 'loading'
            })
            .addCase(fetchAllUsers.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
            .addCase(fetchAllUsers.rejected, (state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(getUserById.fulfilled, (state,action) => {
            //     state.status = 'succeeded'
            //     state.users = action.payload
            // })
            
            
            .addCase(updateUser.fulfilled, (state, action) => {

                const user = action.payload
                
                
                const users = state.users.filter( userlist => userlist.id !== user.id)

                state.users = [user, ...users]


            })

            .addCase(updatePassword.fulfilled, (state, action) => {
                const user = action.payload;
        
                const users = state.users.filter((userlist) => userlist.id !== user.id);
        
                state.users = [user, ...users];
              })
        

            .addCase(deleteUser.fulfilled, (state,action) => {
                state.status = 'Successfully deleted!';
                state.users = action.payload
            })
            
    }
})
// export const getUser = state => state.users.users
export const getAllUsers = (state) => state.users.users

export const getUserStatus = (state) => state.users.status
export const getUserError = (state) => state.users.error
export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === userId)
export const selectRoomById = (state, roomId) => state.rooms.rooms.find(room => room.id === roomId)



export default userSlice.reducer 