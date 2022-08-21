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
    cleaning:"",
    parking: "",
    laundry: "",
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

//   function handleSubmit(e){
//     e.preventDefault()
//     input.services = service
//     dispatch(postLodging(input))  
    
//     alert("Hospedaje creado correctamente!!")
    

//     setInput({
//       lodgingType: "",
//       guests: "",
//       rooms: "",
//       typeOfRoom:"",
//       beds:"",
//       bathrooms:"",
//       ownBathroom:"",
//       price: "",
//       city:"",
//       country: "",
     
//       numOfGuests:"",
//       checkInHour:"",
//       checkOutHour:"",
//       address:{wifi: "",
//       ac: "",
//       tv: "",
//       security:"",
//       cleaning:"",
//       parking: "",
//       laundry: "",
//       hotWater:"",
//       kitchen:"" ,
//       pool:"",
//       dining: "",
//       pets: "",},
//       description: "",
//       picture:""
//     })
//     setService({
//       wifi: "",
//       ac: "",
//       tv: "",
//       security:"",
//       cleaning:"",
//       parking: "",
//       laundry: "",
//       hotWater:"",
//       kitchen:"" ,
//       pool:"",
//       dining: "",
//       pets: "",
//     })
    
// }

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
  if(e.target.value === "no") {
    
    
    setService({
      ...service,
      [e.target.name] : false,
     
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
        <input
          className={style.lodgingType}
          type="text"
          name ="lodgingType"
          value={input.lodgingType}
          placeholder="Tipo de alojamiento"
          onChange={handleChange}
        />
         <input
          className={style.inputEmail}
          type="number"
          name ="guests"
          value={input.guests}
          placeholder="cantidad de huespeds"
          onChange={handleChange}
        />
        <input
          className={style.inputPassword}
          type="number"
          name ="rooms"
          value={input.rooms}
          placeholder="Cantidad de habitaciones"
          onChange={handleChange}
        />
         <input
          className={style.inputEmail}
          type="text"
          name ="typeOfRoom"
          value={input.typeOfRoom}
          placeholder="tipo de habitacion"
          onChange={handleChange}
        />
         <input
          className={style.inputEmail}
          type="number"
          name ="beds"
          value={input.beds}
          placeholder="Cantidad de camas"
          onChange={handleChange}
        />
        <input
          className={style.inputPassword}
          type="number"
          name ="bathrooms"
          value={input.bathrooms}
          placeholder="Cantidad de baños"
          onChange={handleChange}
        />
         <select  className={style.created} onChange={handleChange} name="ownBathroom" >
                    <option disabled selected>Baño propio</option>
                    <option>si</option>
                    <option>no</option>
          </select>
         <input
          className={style.inputEmail}
          type="number"
          name ="price"
          value={input.price}
          placeholder="Precio por noche"
          onChange={handleChange}
        />
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
         <input
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
        <select  className={style.created} onChange={handleSelect} name="wifi" >
                    <option disabled selected>Wifi</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select  className={style.created} onChange={handleSelect} name="ac" >
                    <option disabled selected>ac</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select className={style.created} onChange={handleSelect} name="tv" >
                    <option disabled selected>tv</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select  className={style.created} onChange={handleSelect} name="security" >
                    <option disabled selected>securidad</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select  className={style.created} onChange={handleSelect} name="cleaning" >
                    <option disabled selected>Limpieza</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select className={style.created} onChange={handleSelect} name="parking" >
                    <option disabled selected>Estacionamiento</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select  className={style.created} onChange={handleSelect} name="laundry" >
                <option disabled selected>Lavanderia</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select className={style.created} onChange={handleSelect} name="hotWater" >
                    <option disabled selected>Agua caliente</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select className={style.created} onChange={handleSelect} name="kitchen" >
                    <option disabled selected>cocina</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select className={style.created} onChange={handleSelect} name="pool" >
                    <option disabled selected>Piscina</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select className={style.created} onChange={handleSelect} name="dining" >
                    <option disabled selected>Comedor</option>
                    <option>si</option>
                    <option>no</option>
          </select>
          <select  className={style.created} onChange={handleSelect} name="pets" >
                    <option disabled selected>Mascotas</option>
                    <option>si</option>
                    <option>no</option>
          </select>
      </div>
      <button className={style.button}  type="submit">
        Crear hospedaje

      </button>
  </form>
    </div>
  );



}

