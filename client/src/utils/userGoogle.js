import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUserGoogle = async (user) => {
  const decoded = jwt_decode(user.credential)

  const { email, name, sub, family_name, given_name, picture } = decoded;

  const userObject = {
    _id: sub,
    username: name,
    email,
    lastname: family_name,
    name: given_name,
    picture
  }

   localStorage.setItem("userInfo", JSON.stringify(userObject));
   await axios.post("http://localhost:3001/api/login/google", userObject);
};
