import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import style from "./FormLodging.module.css";
import { postGuest, postLodging, getCountry } from "../../Redux/Actions";
import validate from "./validation";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import NavBar from "../NavBar/NavBar";
import Swal from "sweetalert";

export default function FormLodging() {
  const [coordinates, setCoordinates] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const [address, setAddress] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    lodgingType: "",
    currency: "",
    guests: "",
    rooms: "",
    typeOfRoom: "",
    beds: "",
    bathrooms: "",
    ownBathroom: "",
    price: "",
    city: "",
    country: "",
    address: "",
    numOfGuests: "",
    checkInHour: "",
    checkOutHour: "",
    description: "",
    picture: "",
    latitud: "",
    longitud: "",
  });
  useEffect(() => {
    dispatch(getCountry());
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapId: "22d661f3188bcd6d",
    }),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const onChange = (e) => {
    setAddress(e.target.value);
    setInput({ ...input, address: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length === 0) {
      return alert("No se encontro la dirección");
    }
    setInput({
      ...input,
      latitud: data.results[0].geometry.location.lat,
      longitud: data.results[0].geometry.location.lng,
    });

    setCoordinates(data.results[0].geometry.location);
    setErrors({ latitud: "" });
  };

  const handleClickDirection = (e) => {
    onSubmit(e);
  };

  // const handleEditAddres = (e) => {
  //   e.preventDefault()
  //   setInput({...input, address: "", longitud: "", latitud: ""})
  //   setErrors({latitud:"sad"})
  // }

  function handleDelete() {
    document.getElementById("file").click();
  }

  function handleChange(e) {
    if (e.target.name !== "picture") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      if (document.getElementById("imgPreview0")) {
        for (let i = 0; i < 3; i++) {
          if (document.getElementById("imgPreview" + i)) {
            document.getElementById("imgPreview" + i).remove();
          }
        }
      }
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = function () {
          let preview = document.getElementById("preview");
          let imagen = document.createElement("img");
          imagen.src = reader.result;
          imagen.style.width = "200px";
          imagen.id = "imgPreview" + i;
          preview.append(imagen);
        };
      }
      if (!document.getElementById("reset")) {
        let buttonDelet = document.getElementById("buttonDelet");
        let boton = document.createElement("button");
        boton.type = "button";
        boton.id = "reset";
        boton.onclick = handleDelete;
        boton.innerHTML = "Cambiar seleccion";
        buttonDelet.append(boton);
      }
      let imgs = Object.entries(e.target.files).length;
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: imgs,
        })
      );
    }
  }

  if (!isLoaded) return <div>Loading...</div>;

  let hostId = params.hostId;
  console.log(hostId);
  return (
    <div className={style.ContForm}>
      <NavBar />
      <div className={style.containerUser}>
        <form action= {`${process.env.REACT_APP_API}/api/lodging/${hostId}`}  method="POST" encType="multipart/form-data" >
        {/* <form
          className={style.lodgForm}
          encType="multipart/form-data"
          action={`http://localhost:3001/api/lodging/${hostId}`}
          method="POST"
        > */}
          <script src="./preview.js"></script>

          <div className={style.titulo}>
            <h1 className={style.lTitle}>Registra tu alojamiento</h1>
          </div>

          <input
            className={style.lodTitle}
            type="text"
            name="title"
            value={input.title}
            placeholder="Titulo de tu publicacion"
            onChange={handleChange}
          />
          <p className={style.error}>{errors.title}</p>

          <div className={style.lselect}>
            <div className={style.group1}>
              <div className={style.select1}>
                <select
                  className={style.s1}
                  onChange={handleChange}
                  name="lodgingType"
                >
                  <option disabled selected>
                    Tipo de hospedaje
                  </option>
                  <option>Cabaña</option>
                  <option>Albergue</option>
                  <option>Hostal</option>
                  <option>Hotel</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                  <option>habitacion</option>
                  
                </select>
                <p className={style.error}>{errors.lodgingType}</p>
    
              </div>

              <div className={style.group1}>
                <div>
                  <select
                    className={style.s1}
                    onChange={handleChange}
                    name="guests"
                  >
                    <option disabled selected>
                      Huespedes
                    </option>
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
                  <p className={style.error}>{errors.guests}</p>
                </div>
              </div>
              <div>
                <select
                  className={style.s1}
                  onChange={handleChange}
                  name="rooms"
                >
                  <option disabled selected>
                    Habitaciones
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>+5</option>
                </select>
                <p className={style.error}>{errors.rooms}</p>
              </div>
            </div>
            <div className={style.group2}>
              <div>
                <select
                  className={style.s1}
                  onChange={handleChange}
                  name="beds"
                >
                  <option disabled selected>
                    Camas
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>+5</option>
                </select>
                <p className={style.error}>{errors.beds}</p>
              </div>
              <div>
                <select
                  className={style.s1}
                  onChange={handleChange}
                  name="currency"
                >
                  <option disabled selected>
                    Moneda:
                  </option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>ARS</option>
                  <option>CLP</option>
                  <option>MXN</option>
                </select>
                <p className={style.error}>{errors.currency}</p>
              </div>
              <div>
                <input
                  className={style.s2}
                  type="number"
                  name="price"
                  min="1"
                  step="any"
                  value={input.price}
                  placeholder="Precio por noche"
                  onChange={handleChange}
                />
                <p className={style.error}>{errors.price}</p>
              </div>
            </div>
          </div>

          <div className={style.group3}>
            <div className={style.bathCheck}>
              <label className={style.fcontainer}>
                Baño propio
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="ownBathroom"
                />
                <div className={style.checkmark} />
              </label>
             
            </div>

            <div className={style.bthrooms}>
              <select className={style.s1} onChange={handleChange} name="bathrooms">
                <option disabled selected>
                  Numero de Baños
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>+4</option>
              </select>
              <p className={style.error}>{errors.bathrooms}</p>
            </div>
          

          <div className={style.bthrooms}>
          <select className={style.s2} onChange={handleChange} name="country">
            <option value="" disabled selected>
              País
            </option>
            {countries.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          </div>
          <div className={style.bthrooms}>
          <input
            type="text"
            name="city"
            value={input.city}
            placeholder="Ciudad"
            onChange={handleChange}
          />
          <p className={style.error}>{errors.city}</p>
          </div>
          </div>
          <div className={style.containerMap}>
            <div className={style.mapL}>
              <GoogleMap
                zoom={15}
                center={coordinates}
                mapContainerStyle={{
                  height: "30vh",
                  width: "30vw",
                }}
                options={options}
              >
                <MarkerF position={coordinates}></MarkerF>
              </GoogleMap>
            </div>
            <div className={style.group4}>
              <div className={style.eAddress}>
            <input
              name="address"
              value={input.address}
              onChange={onChange}
              type="text"
              placeholder="Direccion Exacta:"
              className={style.aInput}
              title="Debes verificar la direccion"
              required={true}
            />
            <p className={style.error}>{errors.address}</p>
            </div>
            <button className={style.verButton} onClick={handleClickDirection}>
              Verificar dirección
            </button></div>
            <p>{errors.latitud}</p>
            <input
              value={input.latitud}
              name="latitud"
              onChange={(e) => onChange(e)}
              type="text"
              className={style.inputLtgLtg}
            ></input>
            <input
              value={input.longitud}
              name="longitud"
              onChange={(e) => onChange(e)}
              type="text"
              className={style.inputLtgLtg}
            ></input>
          </div>
          {/* <button onClick={handleEditAddres}>Editar</button> */}
          <textarea
            maxlength="400"
            className={style.textA}
            type="text"
            name="description"
            value={input.description}
            placeholder="Describe tu alojamiento (Maximo 500 caractéres)"
            onChange={handleChange}
          />
          <p className={style.error}>{errors.description}</p>
          <input
            type="file"
            name="picture"
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
          <p>{errors.picture}</p>
          <div className={style.services}>

            <h3>Servicios</h3>
            <div className={style.serv}>
              <label className={style.fcontainer}>
                WIFI
                <input name="wifi" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                AC
                <input name="ac" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Seguridad
                <input name="security" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Limpieza
                <input name="cleaning" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Estacionamiento
                <input name="parking" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Lavanderia
                <input name="laundry" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Agua caliente
                <input name="hotWater" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Cocina
                <input name="kitchen" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Piscina
                <input name="pool" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Comedor
                <input name="dining" type="checkbox" />
                <div className={style.checkmark} />
              </label>
              <label className={style.fcontainer}>
                Mascotas
                <input name="pets" type="checkbox" />
                <div className={style.checkmark} />
              </label>
            </div>

          </div>

          {Object.entries(errors).length === 0 &&
          input.title !== "" &&
          input.picture !== "" &&
          input.latitud !== "" ? (
            <div>
              <button className={style.lButton} type="submit">
                Publicar Hospedaje
              </button>
            </div>
          ) : (
            <div>
              <button className={style.lButton} disabled type="submit">
                Publicar Hospedaje
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
