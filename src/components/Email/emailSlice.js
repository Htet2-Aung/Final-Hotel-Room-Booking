import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const EMAIL_CONTACT_URL = "http://localhost:8181/api/email/contact";

export const sendEmail1 = createAsyncThunk("email/sendEmail", async (data) => {
  console.log(data);
  console.log(data.email);
  console.log(data.token);
  try {
    const response = await axios.post(EMAIL_CONTACT_URL, data.email, {
      headers: {
        Authorization: data.token,
      },
    });
    return response.email;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  email: {},
  status: "idle",
  isEmail: false,
  error: null,
};

const emailSlice = createSlice({
  name: "emailSlice",
  initialState,
  reducers: {
    setEmail: (state,action) => {
      state.isEmail = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sendEmail1.fulfilled, (state, action) => {
      console.log(state);
      state.email = action.payload;
    });
  },
});

export const getSendEmail = (state) => state.emails.isEmail
export const { setEmail } = emailSlice.actions
export default emailSlice.reducer;
