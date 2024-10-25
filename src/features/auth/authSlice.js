import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: false,
  isLoggedIn: false,
  darkMode: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      if (typeof window !== 'undefined') { // Check if we're in the browser
        state.userId = localStorage.getItem('id') || false;
        state.isLoggedIn = localStorage.getItem('id') ? true : false;
      }
    },
    loginUser: (state) => {
      if (typeof window !== 'undefined') {
        state.isLoggedIn = true;
        state.userId = localStorage.getItem('id');
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = false;
      toast.success("You have successfully logged out");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.querySelector('html').setAttribute('data-theme', "dark");
      } else {
        document.querySelector('html').setAttribute('data-theme', "winter");
      }
    },
  },
});

export const { hydrateAuth, loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
