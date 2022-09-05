import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from "../../Redux/Actions";
import s from "../SearchBar/SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import {getGuests} from "../../Redux/Actions/index";

export default function SearchBar(){
const dispatch = useDispatch()
const [user, setUser] = useState("")
const allGuests = useSelector((state) => state.allGuests);
useEffect(() => {
  dispatch(getGuests());
}, [dispatch]);


function handleInputChange(e){
  e.preventDefault()
  setUser(e.target.value)
}
function handleSubmit(e){
  e.preventDefault()
    
    if(user !== ""){
    dispatch(getByUser(user.toLowerCase()));
    setUser("");}
    else{
    alert("Ingresa un id para buscar")
    }
}
let guestId = localStorage.getItem("userInfo");
if (!guestId) {
} else {
  var userToken = JSON.parse(guestId)._id;
  var userEmail = JSON.parse(guestId).email;
  var user1 = JSON.parse(guestId)
}
let arrFilter =  allGuests.filter(e => e.email === userEmail)
return(
    <form className={s.searchForm} onSubmit={handleSubmit}>   
      <input className={s.searchInput}
        type="text"
        placeholder="email usuario"
        value={user}
        onChange={handleInputChange}
      />
      <button type="submit" className={s.searchButton}><BsSearch className={s.searchIcon}/>
        </button>
      
    </form>
  ); 
}