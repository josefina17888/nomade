import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByCity } from "../../Redux/Actions";
import s from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";


export default function SearchBar(){
const dispatch = useDispatch()
const [city, setCity] = useState("")

function handleInputChange(e){
  e.preventDefault()
  setCity(e.target.value)
}
function handleSubmit(e){
  e.preventDefault()
  
    if(city !== ""){
    dispatch(getByCity(city));
    setCity("");}
    else{
    alert("Ingresa una ciudad para buscar")
    }
}

return(
    <form className={s.searchForm} onSubmit={handleSubmit}>   
      <input className={s.searchInput}
        type="text"
        placeholder="Ciudad"
        value={city}
        onChange={handleInputChange}
      />
      <button type="submit" className={s.searchButton}><BsSearch className={s.searchIcon}/>
        </button>
      
    </form>
  ); 
}