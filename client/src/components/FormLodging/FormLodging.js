import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom";
import style from "./FormLodging.module.css";
import { postGuest, postLodging} from "../../Redux/Actions";
import validate from "./validation";   

export default function FormLodging() {
  const dispatch= useDispatch()
  const params = useParams();
  let hostId = params;
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    title: "",
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
    description: "",
    picture:[]
})    
  useEffect(() => {
  }, []);

  function handleChange(e){
   
    if(e.target.name!== "picture")
    {
    setInput({
        ...input,
        [e.target.name] : e.target.value,
       
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
  }))
}
else{
  console.log(Object.entries(e.target.files).length)
  let imgs = Object.entries(e.target.files).length
  setInput({
    ...input,
    [e.target.name] : e.target.value
})
setErrors(validate({
  ...input,
  [e.target.name] : imgs
}))
}
}

  return (
    <div className={style.containerUser}>
      <form action= {`${process.env.REACT_APP_API}/api/lodging/${hostId}`}  method="POST" encType="multipart/form-data" >
      {/* <form  encType='multipart/form-data' action="http://localhost:3001/api/lodging/62fe7ea0b2a41b94d94fd0f2"  method="POST"> */}
      <div className={style.titulo}>
      <h1 className={style.title}>Registra tu alojamiento</h1>
      </div>
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
                    <option>+10</option>
          </select>
          <select   onChange={handleChange}  name ="rooms" >
                    <option disabled selected>habitaciones</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>+5</option>
          </select>
          <select   onChange={handleChange}  name ="beds" >
                    <option disabled selected>Camas</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>+5</option>
          </select>
          <select   onChange={handleChange}  name ="currency" >
                    <option disabled selected>moneda:</option>
                    <option>USD</option>
                    <option>€</option>
                    <option>ARS</option>
                    <option>CLP</option>
                    <option>MXN</option>
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
                    <option>+4</option>
                 
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
        <div className={style.services}>
          <label>WIFI <input type="checkbox" name="wifi" /></label>
          <label>AC <input type="checkbox" name="ac" /></label>
          <label>TV <input type="checkbox" name="tv" /></label>
          <label>securidad <input type="checkbox"  name="security" /></label>
          <label>Limpieza <input type="checkbox"  name="cleaning" /></label>
          <label>Estacionamiento <input type="checkbox"  name="parking" /></label>
          <label>Lavanderia <input type="checkbox"  name="laundry" /></label>
          <label>Agua caliente <input type="checkbox"   name="hotWater" /></label>
          <label>cocina <input type="checkbox"  name="kitchen" /></label>
          <label>Piscina <input type="checkbox" name="pool"  /></label>
          <label>Comedor <input type="checkbox"    name="dining" /></label>
          <label>Mascotas <input type="checkbox"   name="pets" /></label>
          </div>
      </div>
      {Object.entries(errors).length === 0 && input.title !== ""?
      <div>
      <button className={style.button}  type="submit">
        Crear hospedaje
      </button></div>:<div>
        <p >{errors.title}</p>
        <p>{errors.lodgingType}</p>
        <p >{errors.guests}</p>
        <p>{errors.rooms}</p>
        <p >{errors.currency}</p>
        <p >{errors.price}</p>
        <p >{errors.bathrooms}</p>
        <p >{errors.city}</p>
        <p >{errors.country}</p>
        <p >{errors.address}</p>
        <p >{errors.description}</p>
        <p >{errors.picture}</p>
        <p >{errors.beds}</p>
       <button className={style.button} disabled  type="submit">
       Crear hospedaje
     </button>
     </div>
     }
    

  </form>
    </div>
  );



}

