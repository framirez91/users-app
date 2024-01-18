import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,

    }
})