import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.authStatus = false;
      state.userData = null;
    },
  },
});

export const { setUser, logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;