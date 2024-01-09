// Initial state
const initialState = {
  users: [],
};

// Reducer function
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addUser":
      return [
        ...state,
        {
          ...action.payload,
          id: Date.now().toString(),
        },
      ];

    case "deleteUser":
      return state.filter((user) => user.id !== action.payload);

    case "updateUser":
      return state.map(u => {
        if (u.id === action.payload.id) {
          return {
            
            ...action.payload,
             password: u.password,
          };
          
        }
        return u; 
      });

    default:
      return state;
  }
};
