import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUserGoogle = async (user) => {
  console.log(user)
  if(user!== "false"){
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
  
      //forma antigua
    //  localStorage.setItem("userInfo", JSON.stringify(userObject));
    //  await axios.post("/api/login/google", userObject);
  
    const infoGuest = await axios.post("/api/login/google", userObject);
    console.log(infoGuest)
    localStorage.setItem("userInfo", JSON.stringify(infoGuest.data));
  }else{
    alert("user baneado")
  }
 

};