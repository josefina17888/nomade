import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByUser } from "../../Redux/Actions";
import s from "../SearchBar/SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import Swal from 'sweetalert'


export default function SearchBar(){
const dispatch = useDispatch()
const [user, setUser] = useState("")

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
    Swal(
      'Ingresa un id para buscar','','warning',{buttons:false,timer:3000}
    )
    }
}

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