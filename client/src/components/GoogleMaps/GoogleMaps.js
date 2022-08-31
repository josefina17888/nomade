import { useState, useMemo, useEffect } from "react";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function GoogleMaps() {
  const selector = useSelector((state) => state.lodgings);
  console.log(selector);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [selected, setSelected] = useState(null);

  const onChange = (e) => {
    setAddress(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    setCoordinates(data.results[0].geometry.location);
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
    { lat: 11.9473632, lng: -66.6781427 },
    { lat: -32.9398988, lng: -71.5482386 },
    { lat: -13.5168599, lng: -71.9841378 },
    { lat: -34.9547682, lng: -54.938577 },
    { lat: -32.9415184, lng: -71.5479584 },
    { lat: -31.8960751, lng: -64.7799006 },
    { lat: -31.2955709, lng: -58.0055963 },
    { lat: -38.0083016, lng: -57.5475263 },
    { lat: -5.1852349, lng: -80.6199183 },
    { lat: -5.1903382, lng: -80.6231898 },
    { lat: -12.1214739, lng: -77.0462931 },
    { lat: -34.8567735, lng: -56.2238914 },
  ];

  function createKey(location) {
    return location.lat + location.lng;
  }

  const center = useMemo(
    () => ({
      lat: -32.497260,
      lng: -66.108828,
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
        zoom={6}
        center={center}
        mapContainerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        options={options}
      >
        <MarkerF position={centerTest}>
        </MarkerF>
        <MarkerClusterer>
          {(clusters) =>
            locations.map((location) => (
              <MarkerF key={createKey(location)}
              position={location}
              clusterer={clusters}
              icon={{
                url: 'https://i.postimg.cc/MXpXtBZL/Nomade.png',
                scaledSize: new window.google.maps.Size(22, 22),
              }}
              onClick={() => {
                setSelected(location);
              } }>
                {
                  selected ? (
                    <InfoWindow position={centerTest} onCloseClick={() => setSelected(null)}>
                      <div className={style.infoBox}>
                        <h1 className={style.title}>{selector[0].title}</h1>
                        <img className={style.img} src={selector[0].picture[0]}></img>
                      </div>
                    </InfoWindow>
                  ) : null
                }
              </MarkerF>
            ))
          }    
        </MarkerClusterer>
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


