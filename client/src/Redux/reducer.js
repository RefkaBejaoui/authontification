import { GET_USER_AUTH, LOGIN, LOGOUT, REGISTER } from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.newUser,
        token: action.payload.token,
      };
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
      };
    case GET_USER_AUTH:
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return state;
  }
};

export default reducer;
