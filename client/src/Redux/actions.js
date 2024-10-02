import axios from "axios";
import { GET_USER_AUTH, LOGIN, LOGOUT, REGISTER } from "./actionTypes";

export const register = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/register", newUser);
    dispatch({ type: REGISTER, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const login = (user) => async (dispatch) => {
    try {
        const res = await axios.post("/auth/login", user)
        dispatch({type:LOGIN, payload: res.data})
    } catch (err) {
        console.error(err)
    }
}

export const logout = () => (dispatch) => {
    {dispatch({type: LOGOUT})}
}

export const getUserAuth = () => async (dispatch) => {
  try {
    const config = {
      headers : {
        autorisation: localStorage.getItem("token")
      }
    }
    const res = await axios.get("/auth/isAuth", config);
    dispatch({type: GET_USER_AUTH, payload: res.data})
  } catch (err) {
    console.error(err) 
  }
}