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
    picture:""
})    
  useEffect(() => {
  }, []);


  function handleDelete(){
    
    document.getElementById("file").click()
  }

  function handleChange(e){
   console.log(input.picture)
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
 
  if(document.getElementById("imgPreview0"))
  {
    for(let i = 0; i<3 ; i++)
    {
      if(document.getElementById("imgPreview" + i))
      {
        document.getElementById("imgPreview" + i).remove();
      }
    }
  }
  for(let i= 0; i<e.target.files.length;i++ )
  {
          let  reader = new FileReader()
            reader.readAsDataURL(e.target.files[i])
            reader.onload = function(){
            let preview = document.getElementById("preview")
            let imagen=document.createElement("img")
            imagen.src = reader.result;
            imagen.style.width = "200px"
            imagen.id= "imgPreview"+ i
            preview.append(imagen)
            console.log(reader)
        }
  }
  if(!document.getElementById("reset"))
  {
    let buttonDelet = document.getElementById("buttonDelet")
    let boton=document.createElement("button")
    boton.type="button"
    boton.id= "reset"
    boton.onclick = handleDelete
    boton.innerHTML = "Cambiar seleccion";
    buttonDelet.append(boton)
  }
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
      <script src="./preview.js"></script>
      <div className={style.titulo}>
      <h1 className={style.title}>Registra tu alojamiento</h1>
      </div>
      <div className={style.containerForm}>
          <input
          type="text"
          name ="title"
          value={input.title}
          placeholder="Titulo del hospedaje"
          onChange={handleChange}
        />
        <p >{errors.title}</p>
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
          <p>{errors.lodgingType}</p>
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
          <p >{errors.guests}</p>
          <select   onChange={handleChange}  name ="rooms" >
                    <option disabled selected>habitaciones</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>+5</option>
          </select>
          <p>{errors.rooms}</p>
          <select   onChange={handleChange}  name ="beds" >
                    <option disabled selected>Camas</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>+5</option>
          </select>
          <p >{errors.beds}</p>
          
          <select   onChange={handleChange}  name ="currency" >
                    <option disabled selected>moneda:</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>ARS</option>
                    <option>CLP</option>
                    <option>MXN</option>
          </select>
          <p >{errors.currency}</p>
          <input
          type="number"
          name ="price"
          min="1" step="any"
          value={input.price}
          placeholder="Precio por noche"
          onChange={handleChange}
        />
        <p >{errors.price}</p>
         <label>Baño propio<input type="checkbox"  onChange={handleChange} name="ownBathroom" /></label>
         <select   onChange={handleChange}  name ="bathrooms" >
                    <option disabled selected>Baños</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>+4</option>
                 
          </select>
          <p >{errors.bathrooms}</p>
        <input
          type="text"
          name ="city"
          value={input.city}
          placeholder="Ciudad"
          onChange={handleChange}
        />
        <p >{errors.city}</p>
         <input
          type="text"
          name ="country"
          value={input.country}
          placeholder="Pais"
          onChange={handleChange}
        />
        <p >{errors.country}</p>
         <input
          type="text"
          name ="address"
          value={input.address}
          placeholder="Direccion"
          onChange={handleChange}
        />
        <p >{errors.address}</p>
         <textarea
          type="text"
          name ="description"
          value={input.description}
          placeholder="Descripcion"
          onChange={handleChange}
        />
        <p >{errors.description}</p>
         <input
          type="file"
          name ="picture"
          id="file"
          value={input.picture}
          placeholder="picture"
          onChange={handleChange}
          multiple
        />
        <div id="contenedorHandle">
        <div id="preview"></div>
        <div id="buttonDelet"></div>
        </div>
        <p >{errors.picture}</p>
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
      {console.log(input.picture)}
      {Object.entries(errors).length === 0 && input.title !== "" && input.picture !== ""?
      <div>
      <button className={style.button}  type="submit">
        Crear hospedaje
      </button></div>:<div>
       <button className={style.button} disabled  type="submit">
       Crear hospedaje
     </button>
     </div>
     }
  </form>
    </div>
  );
}

