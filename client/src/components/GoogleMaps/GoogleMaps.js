import { useState, useMemo } from "react";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";

export default function GoogleMaps() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const center = useMemo(
    /** @type LatLngLiteral = google.maps.LatLngLiteral */ () => ({
      lat: -32.933738,
      lng: -71.5480715,
    }),
    []
  );

  const options = useMemo(
    /** @type google.maps.MapOptions */
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
        <MarkerF position={center} />
      </GoogleMap>
      <Autocomplete>
        <input type="text" placeholder="Search:" className={style.input} />
      </Autocomplete>
    </div>
  );
}













// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   libraries: ["places"],
// });

// const [address, setAddress] = useState("");

// /** @type React.MutableRefObject<HTMLInputElement> */
// const addresRef = useRef();

// const [map, setMap] = useState(/** @type google.maps.Map */ (null));

// if (!isLoaded) {
//   return <div>Loading...</div>;
// }

// return (
//   <div className={style.map}>
//     <GoogleMap
//       center={center}
//       zoom={14}
//       mapContainerStyle={{
//         height: "100vh",
//         width: "100vw",
//       }}
//       options={{
//         disableDefaultUI: true,
//         clickableIcons: false,
//         zoomControl: false,
//         streetViewControl: false,
//         mapTypeControl: false,
//         fullscreenControl: false,
//         mapId: "22d661f3188bcd6d",
//       }}
//       onLoad={(map) => {
//         setMap(map);
//       }}
//     >
//       <MarkerF position={center} />
//     </GoogleMap>
//     <Autocomplete>
//       <input
//         ref={addresRef}
//         type="text"
//         placeholder="Search:"
//         className={style.input}
//       />
//     </Autocomplete>

//     {/* <button onClick={() => map.panTo(center)}>
//    x
//   </button> */}
//   </div>
// );
