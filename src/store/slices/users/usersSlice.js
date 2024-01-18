import { createSlice } from "@reduxjs/toolkit";

export const intiaialUserForm = {
    id: "0",
    username: "",
    password: "",
    email: "",
    admin: false,
}
export const initialErrors = {
    username: "",
    password: "",
    email: "",
};
  
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userSelected: intiaialUserForm,
    visibleForm: false,
    errors: initialErrors,


  },
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          ...action.payload,
        },
      ];
      state.userSelected = intiaialUserForm;
      state.visibleForm = false;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser:(state, action) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return user;
      });
        state.userSelected = intiaialUserForm;
        state.visibleForm = false;
    },
    loadingUser: (state, action) => {
      state.users = action.payload;
    },
    onUserSelectedForm: (state, action) => {
        state.userSelected = action.payload;
        state.visibleForm = true;
        
    },
    onOpenForm: (state) => {
        state.visibleForm = true;
    },
    onCloseForm: (state) => {
        state.visibleForm = false;
        state.userSelected = intiaialUserForm;

    },
    loadingError: (state, action) => {
        state.errors = action.payload;
    },
  },
});

export const { addUser, removeUser, update, loadingUser,onUserSelectedForm,onOpenForm,onCloseForm,loadingError } = usersSlice.actions; 
