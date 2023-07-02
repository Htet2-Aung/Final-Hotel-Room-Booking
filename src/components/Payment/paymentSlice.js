import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const REGISTER_URL = 'http://localhost:8181/api/payment/create/'
const SHOW_URL = 'http://localhost:8181/api/payment/all'
const UPDATE_URL = 'http://localhost:8181/api/payment/update'
const DELETE_PAYMENT='http://localhost:8181/api/payment/delete/'
export const fetchAllPayments = createAsyncThunk('payment/fetchAllPayments',async() =>{
    const response = await axios.get(SHOW_URL)
    return response.data
})


export const register = createAsyncThunk('payment/register', async (data) => {
    console.log(data.payment)
    console.log(data.bookingId)
    console.log(data.token)
    const response = await axios.post (`${REGISTER_URL}${data.bookingId}`,data.payment,{
        headers:{
            'Authorization':data.token
        }})
    return response.data
})  

export const updatePayment = createAsyncThunk('payment/updatePayment', async(data) => {
    console.log("######"+data.payment)
    const response = await axios.post(UPDATE_URL,data.payment)
    return response.data;
})

export const deletePayment= createAsyncThunk('payment/deletePayment',async(data)=>{
    await axios.delete(`${DELETE_PAYMENT}${data.id}`)
    const response=await axios.get(SHOW_URL)
    return response.data;
})

const initialState = {
    payments:[],
    totalPayment: {},
    status: 'idle',
    error:null
}

export const paymentSlice = createSlice({
    name : 'paymentSlice',
    initialState,
    reducers : {
        setTotalPayment:(state,action) => {
            state.totalPayment = action.payload
            console.log("Total Payment:"+state.totalPayment)
        },

        
    },
    extraReducers(builder){
        builder
        .addCase(fetchAllPayments.pending, (state,action) =>{
            state.status = 'loading'
        })
        .addCase(fetchAllPayments.fulfilled, (state,action) => {
            state.status = 'succeeded'
            state.payments = action.payload
        })
        .addCase(fetchAllPayments.rejected, (state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(register.fulfilled,(state,action) => {
            console.log(action.payload)
            state.payment =action.payload
        })
        .addCase(updatePayment.fulfilled, (state, action) => {

            const payment = action.payload
            
            
            const payments = state.payments.filter( paymentlist => paymentlist.id !== payment.id)

            state.payments = [payment, ...payments]
        })
        .addCase(deletePayment.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.payments=action.payload
        })

    }
})
export const getAllPayments = (state) => state.payments.payments
export const getPaymentStatus = (state) => state.payments.status
export const getPaymentError = (state) => state.payments.error
export const getTotalPayment = (state) => state.payments.totalPayment
export const selectPaymentById = (state, paymentId) => state.payments.payments.find(payment => payment.id === paymentId)
export const selectPaymentByBKId = (state, bkId) => state.payments.payments.find(payment => payment.bookingId === bkId)


export const getPayment = (state) => state.payments.payment

export const {setTotalPayment} = paymentSlice.actions
 
export default paymentSlice.reducer