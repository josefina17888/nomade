import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { Link,useHistory } from "react-router-dom";
import style from "./FormLodging.module.css";
import { postGuest, postLodging} from "../../Redux/Actions";

export default function FormLodging() {
  const dispatch= useDispatch()
  const history = useHistory()
  const [service, setService]= useState({
    wifi: "",
    ac: "",
    tv: "",
    security:"",
    cleaning:"",
    parking: "",
    laundry: "",
    hotWater:"",
    kitchen:"" ,
    pool:"",
    dining: "",
    pets: "",
  })
  const [input, setInput] = useState({
    lodgingType: "",
    currency:"",
    guests: "",
    rooms: "",
    typeOfRoom:"",
    beds:"",
    bathrooms:"",
    ownBathroom:"",
    price: "",
    city:"",
    country: "",
    address: "",
    numOfGuests:"",
    checkInHour:"",
    checkOutHour:"",
    services: {wifi: "",
    ac: "",
    tv: "",
    security:"",
    title:"",
    cleaning:"",
    parking: "",
    laundry: "",
    currency: "",
    hotWater:"",
    kitchen:"" ,
    pool:"",
    dining: "",
    pets: ""},
    description: "",
    picture:""
})    
  useEffect(() => {
  }, []);

  function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value,
       
    })
    
   console.log(input)
}

function handleSelect(e){
  if(e.target.value === "si") {
    
    
    setService({
      ...service,
      [e.target.name] : true,
     
  })

    setInput({
      ...input,
     ["services"] : service,
     
  })
 
  }
  else if(e.target.value === "no") {
    
    
    setService({
      ...service,
      [e.target.name] : false,
     
  })

    setInput({
      ...input,
     ["services"] : service,
     
  })

  }
  else {
    setService({
      ...service,
      [e.target.name] : e.target.value,
     
  })
    setInput({
      ...input,
     ["services"] : service,
     
  })
  }
 
}

  return (
    <div className={style.containerUser}>
      <form  encType='multipart/form-data' action="http://localhost:3001/api/lodging/62fe7ea0b2a41b94d94fd0f2"  method="POST">
      <h1 className={style.title}>Registra tu alojamiento</h1>
      <div className={style.containerForm}>
        {/* <input
          className={style.lodgingType}
          type="text"
          name ="lodgingType"
          value={input.lodgingType}
          placeholder="Tipo de alojamiento"
          onChange={handleChange}
        /> */}
          <input
          className={style.inputPassword}
          type="text"
          name ="title"
          value={input.title}
          placeholder="Titulo del hospedaje"
          onChange={handleChange}
        />
          <select   onChange={handleChange} name="lodgingType" >
                    <option disabled selected>Tipo de hospedaje</option>
                    <option>Cabaña</option>
                    <option>Albergue</option>
                    <option>Hostal</option>
                    <option>Hotel</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>habitacion</option>
          </select>
          <select   onChange={handleChange}  name ="guests" >
                    <option disabled selected>Huespeds</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>mas de 10</option>
          </select>
          <select   onChange={handleChange}  name ="rooms" >
                    <option disabled selected>habitaciones</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>mas de 5</option>
          </select>
          <select   onChange={handleChange}  name ="beds" >
                    <option disabled selected>Camas</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>mas de 5</option>
          </select>
          <select   onChange={handleChange}  name ="currency" >
                    <option disabled selected>moneda:</option>
                    <option>Dolar esatado unidense</option>
                    <option>Euro</option>
                    <option>Peso Argentino</option>
                    <option>Peso Chileno</option>
                    <option>Peso Mexicano</option>
          </select>
          <input
          className={style.inputEmail}
          type="number"
          name ="price"
          min="1" step="any"
          value={input.price}
          placeholder="Precio por noche"
          onChange={handleChange}
        />

         <label>Baño propio<input type="checkbox"  onChange={handleChange} name="ownBathroom" /></label>
         <select   onChange={handleChange}  name ="bathrooms" >
                    <option disabled selected>Baños</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>mas de 3</option>
                 
          </select>
         
          {/* <input
          className={style.inputEmail}
          type="text"
          name ="typeOfRoom"
          value={input.typeOfRoom}
          placeholder="tipo de habitacion"
          onChange={handleChange}
        /> */}

        <input
          className={style.inputPassword}
          type="text"
          name ="city"
          value={input.city}
          placeholder="Ciudad"
          onChange={handleChange}
        />
        
         <input
          className={style.inputPassword}
          type="text"
          name ="country"
          value={input.country}
          placeholder="Pais"
          onChange={handleChange}
        />
         <input
          className={style.inputPassword}
          type="text"
          name ="address"
          value={input.address}
          placeholder="Direccion"
          onChange={handleChange}
        />
         <textarea
          className={style.inputPassword}
          type="text"
          name ="description"
          value={input.description}
          placeholder="Descripcion"
          onChange={handleChange}
        />
         <input
          className={style.inputPassword}
          type="file"
          name ="picture"
          value={input.picture}
          placeholder="picture"
          onChange={handleChange}
          multiple
        />
        <h3>servicios</h3>
          <label>wifi<input type="checkbox"  onChange={handleSelect} name="wifi" /></label>
          <label>ac<input type="checkbox"  onChange={handleSelect} name="ac" /></label>
          <label>tv<input type="checkbox"  onChange={handleSelect}  name="tv" /></label>
          <label>securidad<input type="checkbox"  onChange={handleSelect}  name="security" /></label>
          <label>Limpieza<input type="checkbox"  onChange={handleSelect} name="cleaning" /></label>
          <label>Estacionamiento<input type="checkbox"  onChange={handleSelect} name="parking" /></label>
          <label>Lavanderia<input type="checkbox"  onChange={handleSelect} name="laundry" /></label>
          <label>Agua caliente<input type="checkbox"  onChange={handleSelect} name="hotWater" /></label>
          <label>cocina<input type="checkbox"  onChange={handleSelect} name="kitchen" /></label>
          <label>Piscina<input type="checkbox"  onChange={handleSelect} name="pool"  /></label>
          <label>Comedor<input type="checkbox"  onChange={handleSelect}  name="dining" /></label>
          <label>Mascotas<input type="checkbox"  onChange={handleSelect} name="pets" /></label>
          
      </div>
      <button className={style.button}  type="submit">
        Crear hospedaje

      </button>
  </form>
    </div>
  );



}

