import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import styles from "./ResDetail.module.css";

export default function ResDetail({ bookingInfo }) {
  const scrollRef = useRef();
  let lodgingId = bookingInfo.lodgingId;
  const [infoLodging, setInfoLodging] = useState({});

  useEffect(() => {
    const getLodgings = async () => {
      try {
        const res = await axios.get("api/lodging/detail/" + lodgingId);
        let data = res.data;
        if (data) {
          setInfoLodging(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLodgings();
  }, [bookingInfo]);
  console.log("estado", infoLodging);

  console.log("pais", infoLodging.country);
  console.log("adress", infoLodging.address);
  //variables necesarias para carrusel de imagenes
  const picture = infoLodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const picture2 = obj["1"];
  const picture3 = obj["2"];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  /* const pets = (bookingInfo)=>{
  if (bookingInfo.pets=== true){
    return "Si"
  }else{
    return "No"
  }
} */

  return (
    <div ref={scrollRef} className={styles.containerInfo}>
      <div className={styles.carouselChatContainer}>
        <div className={styles.carouselChat}>
          <div className="_168ht2w">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              className="_168ht2w"
            >
              <Carousel.Item className="_168ht2w">
                <img
                  className={styles.picture1}
                  src={picture1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className={styles.picture1}
                  src={picture2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className={styles.picture1}
                  src={picture3}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.check}>
        <div className={styles.in}>
          <span className={styles.cI}>Check-in</span>
          <span className={styles.cDate}>
            {new Date(bookingInfo.checkIn).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.out}>
          <span className={styles.cI}>Check-out</span>
          <span className={styles.cDate}>
            {new Date(bookingInfo.checkOut).toLocaleDateString()}
          </span>
        </div>
      </div>
      <hr />
      <div className={styles.code}>
        <span className={styles.cD}>Tu Codigo de reserva</span>
        <span className={styles.cR}>{bookingInfo.code}</span>
      </div>
      <hr />
      <div className={styles.cGuests}>
        <div className={styles.nmds}>
          <div className={styles.cI}>Cantidad de Nomades</div>
          <div className={styles.cDate}>{bookingInfo.guests}</div>
        </div>
        <div className={styles.petsC}>
          <span className={styles.cM}>Mascotas</span>
         {/*  <span className={styles.cDate}>{ pets? (<div>si</div>) :( <div>no</div>)}</span> */}
        </div>
      </div>
      <hr />

      <div className={styles.adressC}>
        <span className={styles.cAddress}>¿Cómo Llegar?</span>
        <span className={styles.cA}>
          {infoLodging.address}, {infoLodging.city}, {infoLodging.country}
        </span>
      </div>
    </div>
  );
}
