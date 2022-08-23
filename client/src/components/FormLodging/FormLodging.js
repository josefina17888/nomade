import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { Link,useHistory } from "react-router-dom";
import style from "./FormLodging.module.css";
import { postGuest, postLodging} from "../../Redux/Actions";

export default function FormLodging() {

  return (
    <div className={style.containerUser}>
      <form  encType='multipart/form-data' action="http://localhost:3001/api/lodging/62fe7ea0b2a41b94d94fd0f2"  method="POST">
      <div className={style.titulo}>
      <h1 className={style.title}>Registra tu alojamiento</h1>
      </div>
      <div className={style.containerForm}>
          <input
          className={style.inputPassword}
          type="text"
          name ="title"
      
          placeholder="Titulo del hospedaje"
    
        />
          <select  name="lodgingType" >
                    <option disabled selected>Tipo de hospedaje</option>
                    <option>Cabaña</option>
                    <option>Albergue</option>
                    <option>Hostal</option>
                    <option>Hotel</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>habitacion</option>
          </select>
          <select   name ="guests" >
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
          <select   name ="rooms" >
                    <option disabled selected>habitaciones</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>mas de 5</option>
          </select>
          <select   name ="beds" >
                    <option disabled selected>Camas</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>mas de 5</option>
          </select>
          <select    name ="currency" >
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
          
          placeholder="Precio por noche"
        
        />

         <label>Baño propio<input type="checkbox"   name="ownBathroom" /></label>
         <select     name ="bathrooms" >
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
         
          placeholder="Ciudad"
       
        />
        
         <input
          className={style.inputPassword}
          type="text"
          name ="country"
         
          placeholder="Pais"
        
        />
         <input
          className={style.inputPassword}
          type="text"
          name ="address"
         
          placeholder="Direccion"
        
        />
         <textarea
          className={style.inputPassword}
          type="text"
          name ="description"
          
          placeholder="Descripcion"
       
        />
         <input
          className={style.inputPassword}
          type="file"
          name ="picture"
          
          placeholder="picture"
      
          multiple
        />
        <h3>servicios</h3>
        <div className={style.services}>
          <label>WIFI <input type="checkbox"  name="wifi" /></label>
          <label>AC <input type="checkbox"  name="ac" /></label>
          <label>TV <input type="checkbox"  name="tv" /></label>
          <label>securidad <input type="checkbox"    name="security" /></label>
          <label>Limpieza <input type="checkbox" name="cleaning" /></label>
          <label>Estacionamiento <input type="checkbox"  name="parking" /></label>
          <label>Lavanderia <input type="checkbox"   name="laundry" /></label>
          <label>Agua caliente <input type="checkbox" name="hotWater" /></label>
          <label>cocina <input type="checkbox"  name="kitchen" /></label>
          <label>Piscina <input type="checkbox"  name="pool"  /></label>
          <label>Comedor <input type="checkbox"    name="dining" /></label>
          <label>Mascotas <input type="checkbox"   name="pets" /></label>
          </div>
      </div>
      <button className={style.button}  type="submit">
        Crear hospedaje

      </button>
  </form>
    </div>
  );



}

