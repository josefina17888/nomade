import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUserGoogle = async (user) => {
  const decoded = jwt_decode(user.credential)

  const { email,sub, family_name, given_name, picture } = decoded;

  const userObject = {
    _id: sub,
    email,
    lastname: family_name,
    name: given_name,
    picture
  }
  let newGuest = await axios.post("http://localhost:3001/api/login/google", userObject);
   localStorage.setItem("userInfo", JSON.stringify(newGuest.data));

};