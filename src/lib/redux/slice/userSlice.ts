/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type Slice } from "@reduxjs/toolkit";
import { updateUser } from "../reducer/userReducers";

const userSlice:Slice = createSlice({
  name: "userSlice",
  initialState: {
    userName: null,
    status: false,
  },
  reducers:{
    userUpdate:updateUser,

  }
});
export const {userUpdate} = userSlice.actions;
export default userSlice.reducer;