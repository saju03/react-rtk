/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type Slice } from "@reduxjs/toolkit";
import { updateUser, logoutUser, loginUser, registerUser } from "../reducer/userReducers";
import type { IUser } from "../../../interface";

const userInitialState: IUser = {
  userName: "",
  status: false,
};

const userSlice: Slice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    userUpdate: updateUser,
    userLogout: logoutUser,
    userLogin: loginUser,
    userRegister: registerUser,
  },
});
export const { userUpdate, userLogout, userLogin, userRegister } = userSlice.actions;
export default userSlice.reducer;
