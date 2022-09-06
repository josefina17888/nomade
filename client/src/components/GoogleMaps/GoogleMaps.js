import { useState, useMemo, useEffect } from "react";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";
import { getDetail, getLodgings } from "../../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function GoogleMaps() {
  const selector = useSelector((state) => state.lodgings);
  const selectorDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(null);
  const [selectDetail, setSelectDetail] = useState(selectorDetail);
  const [center, setCenter] = useState({
    lat: -34.397,
    lng: 150.644,
  });

  useEffect(() => {
    dispatch(getLodgings());
    setSelected("");
    getDetail();
    setSelectDetail("");
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const locations = selector.map((e) => {
    return {
      lat: Number(e.latitud),
      lng: Number(e.longitud),
      title: e.title,
      picture: e.picture,
      _id: e._id,
      price: e.price,
      country: e.country,
      city: e.city,
    };
  });

  function createKey(location) {
    return location.latitud + location.longitud;
  }

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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <NavBar/>
    <div className={style.containerMap}>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerStyle={{
          height: "91vh",
          width: "100%",
        }}
        options={options}
      >
        <MarkerClusterer>
          {(clusters) =>
            locations.map((location) => (
              <MarkerF
                key={createKey(location)}
                position={{ lat: location.lat, lng: location.lng }}
                clusterer={clusters}
                icon={{
                  url: "https://i.postimg.cc/rR6NFv8h/address.png",
                  scaledSize: new window.google.maps.Size(25, 25),
                }}
                onClick={() => {
                  setSelected(location);
                }}
              ></MarkerF>
            ))
          }
        </MarkerClusterer>
        {selected ? (
          <InfoWindow
            position={selected}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className={style.infoBox}>
              <Link className={style.link} to={`/detail/${selected._id}`}>
                <img
                  className={style.img}
                  src={selected.picture[0]}
                  alt="image lodging"
                />
                <div className={style.containerP}>
                  <p className={style.country}>{selected.country + ', ' + selected.city}</p>
                  <p className={style.price}>${selected.price} Noche</p>
                </div>
              </Link>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
    </div>
  );
}
