import { useState, useMemo, useEffect } from "react";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import style from "./GoogleMapsDetail.module.css";
import { getDetail } from "../../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function GoogleMaps() {
  const selectorDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  const [selectDetail, setSelectDetail] = useState(selectorDetail);

  useEffect(() => {
    getDetail();
    setSelectDetail("");
  }, [dispatch]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  let objetoLtgLng = Object.values(selectorDetail);
  let latitud = objetoLtgLng[15];
  let longitud = objetoLtgLng[16];

  const locations = {
    lat: Number(latitud),
    lng: Number(longitud),
  };

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
    <div className={style.containerMap}>
      <GoogleMap
        zoom={13}
        center={locations}
        mapContainerStyle={{
          height: "50vh",
          width: "50vw",
        }}
        options={options}
      >
        <MarkerF
          position={locations}
          icon={{
            url: "https://i.postimg.cc/rR6NFv8h/address.png",
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        ></MarkerF>
      </GoogleMap>
    </div>
  );
}
