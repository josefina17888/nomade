import { useState, useMemo } from "react";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
  MarkerClusterer,
} from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";

export default function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  console.log(coordinates);

  const onChange = (e) => {
    setAddress(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    setCoordinates(data.results[0].geometry.location);
    setAddress("");
  };

  const centerTest = useMemo(() => {
    return coordinates;
  } , [coordinates]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  }

  const locations = [
    { lat: -31.56391, lng: -71.0229 },
    { lat: -32.9398988, lng: -71.5482386 },
  ];

  function createKey(location) {
    return location.lat + location.lng;
  }

  const center = useMemo(
    () => ({
      lat: -32.933738,
      lng: -71.5480715,
    }),
    []
  );

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
        zoom={15}
        center={center}
        mapContainerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        options={options}
      >
        <MarkerF position={centerTest} draggable={true} />
        {/* <MarkerClusterer>
          {(clusters) =>
            locations.map((location) => (
              <MarkerF
                key={createKey(location)}
                position={location}
                clusterer={clusters}
              />
            ))
          }
        </MarkerClusterer> */}
      </GoogleMap>
      <Autocomplete>
        <input
          onKeyPress={handleKeyPress}
          value={address}
          onChange={onChange}
          type="text"
          placeholder="Search:"
          className={style.input}
        />
      </Autocomplete>
    </div>
  );
}


