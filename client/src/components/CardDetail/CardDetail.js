import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../Redux/Actions/index";
import Card from "react-bootstrap/Card";
import Carousel from 'react-bootstrap/Carousel';
import DatePickerOk from "./DatePicker/DatePicker";
import ServiciosIncluidos from "./ServiciosIncluidos/serviciosincluidos";
import styles from "./CardDetail.module.css"
import { AiOutlineWifi, AiFillCar } from 'react-icons/ai';
import { GiThermometerCold, GiCookingPot, GiWashingMachine, GiShower } from 'react-icons/gi';
import { MdLocalDining, MdOutlinePets, MdOndemandVideo, MdCleaningServices, MdSecurity } from 'react-icons/md';
import { FaSwimmingPool } from 'react-icons/fa';

export default function CardDetail(props){ 
  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(getDetail(props.match.params._id))
  }, [dispatch])

  const myLodging = useSelector((state) => state.detail)
  console.log(myLodging.services)

  // //variables necesarias para renderizar servicios
  // const services = myLodging.services

  // const wifi = services.wifi
  // const ac = services.ac
  // const tv = services.tv
  // const security = services.security
  // const cleaning = services.cleaning
  // const parking = services.parking
  // const laundry = services.laundry
  // const hotWater = services.hotWater
  // const kitchen = services.kitchen
  // const pool = services.pool
  // const dining = services.dining
  // const pets = services.pets

  //variables necesarias para carrusel de imagenes
  const picture = myLodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const picture2 = obj["1"];
  const picture3 = obj["2"];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //renderizado

  return(
  <div className={styles.text}>
    {
      myLodging === undefined ? <p>Loading...</p> :
      <div className={styles.gral}>
        <div>  
          <div className={styles.padding}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
    
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={picture1}
        alt="First slide"
      />
    </Carousel.Item>
  
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={picture2}
        alt="Second slide"
      />
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={picture3}
        alt="Third slide"
      />
    </Carousel.Item>

  </Carousel>
          </div>
            
          <div>
            <h5 className={styles.city}>{myLodging.city}</h5>
          </div>
            
          <div className={styles.padding}>
            <h3 className={styles.titles}>Alojamiento</h3>
            <hr className={styles.hr}></hr>
            <div>
              <h4>{myLodging.lodgingType}</h4>
              <h4>{myLodging.name}</h4>
            </div>
          </div>
            
          <div className={styles.padding}>
            <h3 className={styles.titles}>Descripción</h3>
            <hr className={styles.hr}></hr>
              <h4>{myLodging.description}</h4>
          </div>
            
          <div className={styles.padding}>
            <h3 className={styles.titles}>Servicios Incluidos</h3>
            <hr className={styles.hr}></hr>

            {/* <div>
           <div><AiOutlineWifi /></div>
           <div>wifi === true ? <p className={styles.p1}>Wifi</p> : <p className={styles.p2}>Wifi</p></div>
        
           <div><GiThermometerCold /></div>
           <div>ac === true ? <p className={styles.p1}>Aire Acondicionado</p> : <p className={styles.p2}>Aire Acondicionado</p></div>

           <div><GiShower /></div>
           <div>hotWater === true ? <p className={styles.p1}>Agua Caliente</p> : <p className={styles.p2}>Agua Caliente</p></div>
        
           <div><MdOndemandVideo /></div>
           <div>tv === true ? <p className={styles.p1}>Televisión</p> : <p className={styles.p2}>Televisión</p></div>
        
           <div><MdSecurity /></div>
           <div>security === true ? <p className={styles.p1}>Seguridad</p> : <p className={styles.p2}>Seguridad</p></div>

           <div><AiFillCar /></div>
           <div>parking === true ? <p className={styles.p1}>Estacionamiento</p> : <p className={styles.p2}>Estacionamiento</p></div>

           <div><MdCleaningServices /></div>
           <div>cleaning === true ? <p className={styles.p1}>Limpieza</p> : <p className={styles.p2}>Limpieza</p></div>

           <div><GiWashingMachine /></div>
           <div>laundry === true ? <p className={styles.p1}>Lavanderia</p> : <p className={styles.p2}>Lavadero</p></div>

           <div><GiCookingPot /></div>
           <div>kitchen === true ? <p className={styles.p1}>Cocina</p> : <p className={styles.p2}>Cocina</p></div>
        
           <div><MdLocalDining /></div>
           <div>dining === true ? <p className={styles.p1}>Comedor</p> : <p className={styles.p2}>Comedor</p></div>
        
           <div><FaSwimmingPool /></div>
           <div>pool === true ? <p className={styles.p1}>Piscina</p> : <p className={styles.p2}>Piscina</p></div>

           <div><MdOutlinePets /></div>
           <div>pets === true ? <p className={styles.p1}>Mascotas</p> : <p className={styles.p2}>Mascotas</p></div>

       </div> */}

          </div>
        </div>

          <div>
            <div className={styles.flexcontainer1}>
            <Card className={styles.card} /> 

              <div className={styles.flexcontainer1}>
              <h3 className={styles.padding}>${myLodging.price} por noche</h3>
              
              <div>
                <DatePickerOk lodgingdId={props.match.params._id} />
              </div>

              {/* <div className={styles.flexcontainer3}>
                <h6 className={styles.select}>Huéspedes</h6>
                <form>
                  <input type="text"></input>
                </form>
              </div> */}
              
              {/* <div>
              <Link to= '/'>
                <button className={styles.button1}>Reservá ahora</button>
              </Link>
              </div> */}
            
              </div>
            {/* </Card> */}
              </div>
          </div>
      </div>
    } 
        
      <div>
        <Link to= '/'>
          <button className={styles.button}>Volver</button>
        </Link>
      </div>
        
    </div>
    )

}