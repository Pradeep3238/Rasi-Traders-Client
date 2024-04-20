import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        return {
            token: userData.token,
            isAuthenticated: true,
            userData: userData.data,
        };
    }
    return {
        token: null,
        isAuthenticated: false,
        userData: null,
    };
};



const initialState=getInitialAuthState()

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, data } = action.payload;

      state.token = token;
      state.isAuthenticated = true;
      state.userData = data;

      localStorage.setItem("userData", JSON.stringify({ token, data }));
    },

    logout: (state) => {
      // Clear the state
      state.token = null;
      state.userData = null;
      state.isAuthenticated = false;
      // Remove data from localStorage
      localStorage.removeItem("userData");
    },
  },
});

export const authActions: any = authSlice.actions;

export default authSlice;
