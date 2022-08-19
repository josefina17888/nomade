import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByCity } from "../../Redux/Actions";


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
    <form className="searchForm" onSubmit={handleSubmit}>   
      <input className="searchInput"
        type="text"
        placeholder="Ciudad"
        value={city}
        onChange={handleInputChange}
      />
     <input type="submit" value="Buscar" /> 
      
    </form>
  ); 
}