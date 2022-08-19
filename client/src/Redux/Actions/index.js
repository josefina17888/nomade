import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/api/login", user);
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
  };
};

