import { useMemo, useState } from "react";
import React from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";

export default function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC5qq1NGWjUmjiuvDFormsHEGGQ2QtIVng",
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: -33.45694, lng: -70.64827 }), []);

  const [direction, setDirection] = useState(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDirection(e.target.value);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={style.containerMap}>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMap>
      <Autocomplete>
        <input
          value={direction}
          type="text"
          placeholder="Search:"
          className={style.input}
          onKeyPress={handleKeyPress}
        />
      </Autocomplete>
    </div>
  );
}
