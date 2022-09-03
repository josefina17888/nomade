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
import { getLodgings } from '../../Redux/Actions/index'
import { useSelector, useDispatch } from "react-redux";

export default function GoogleMaps() {
  const selector = useSelector((state) => state.lodgings);
  console.log(selector)
  const dispatch = useDispatch()
  const [center, setCenter] = useState({
    lat: -34.397,
    lng: 150.644,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  
  useEffect(() => {
    dispatch(getLodgings())
  }, [dispatch])

useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  } ,[])
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

  const locations = selector.map((e) => {
    return {
      lat: Number(e.latitud),
      lng: Number(e.longitud),
    }
  })
  
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
        zoom={15}
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
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              onClick={() => {
                setSelected(location);
              } }>
                {
                  selected ? (
                    <InfoWindow  onCloseClick={() => setSelected(null)}>
                      <div>
                        <div className={style.infoBox}>
                          <h1 className={style.title}>{selector.map(e => e.title)}</h1>
                          <img className={style.img} src={selector[0].picture[0]}></img>
                        </div>
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
    </div>
  );
}