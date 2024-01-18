import { createSlice } from "@reduxjs/toolkit";

const initialLogin = JSON.parse(localStorage.getItem("login")) || {
    username: "",
    password: "",
    isAdmin: false,
    isLogged: false,
};

export const authSlice = createSlice({
 
    name: "auth",
    initialState: initialLogin,
    reducers:{
        onLogin: (state, action) => {
          state.isAuth= true;
          state.isAdmin = action.payload.isAdmin;
          state.usern = action.payload.username;
        },
        onLogout: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.username = undefined;
        }
    }
});

export const { onLogin, onLogout } = authSlice.actions;