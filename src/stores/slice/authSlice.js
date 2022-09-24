import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currenUser: null,
    },
    errorLogin: '',
    errorRegister:''
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currenUser = action.payload;
      state.login.error = false;
    },
    registerFailed:(state,action) => {
      state.errorRegister=action.payload;
    },
  },
  extraReducers:(buider)=>{
    buider
      .addCase(signin.fulfilled,(state,action)=>{
        state.login.currenUser=action.payload;
      })
      .addCase(signin.rejected,(state,action)=>{
        state.errorLogin=action.payload.message;
      })
      .addCase(signin.pending,(state)=>{
        state.login.isFetching = true;
      })
  }
});
export const signin = createAsyncThunk(
  "user/signin",
  async (user, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("/auth/login", user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const { loginStart, loginFailed, loginSuccess,registerFailed } = authSlice.actions;
export default authSlice;
