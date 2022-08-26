import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../Redux/Actions/index";
import Carousel from 'react-bootstrap/Carousel';
import Card from "react-bootstrap/Card"
import DatePickerOk from "./DatePicker/DatePicker";
import styles from "./CardDetail.module.css"
import { AiOutlineWifi, AiFillCar } from 'react-icons/ai';
import { GiThermometerCold, GiCookingPot, GiWashingMachine, GiShower } from 'react-icons/gi';
import { MdLocalDining, MdOutlinePets, MdOndemandVideo, MdCleaningServices, MdSecurity } from 'react-icons/md';
import { FaSwimmingPool } from 'react-icons/fa';

export default function CardDetail(props){ 
  
  const dispatch = useDispatch();
  let guestId = localStorage.getItem("userInfo");

  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId)._id;
  }
  useEffect(() => {
    dispatch(getDetail(props.match.params._id))
}, [dispatch])

  const myLodging = useSelector((state) => state.detail)

  // const servicios = useSelector((state) => state.detail.services)
  

  const servicios = myLodging.services
  // console.log(servicios)


  const lodgingServices = []
  const lodgingNoServices = []

  for (const property in servicios) {
    if (servicios[property] === true) {
      lodgingServices.push(property)
    }
    else {
      lodgingNoServices.push(property)
    }
  }
  console.log(lodgingServices)
  console.log(lodgingNoServices)

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
            <h4>{myLodging.title}</h4>
            <h4>{myLodging.lodgingType}</h4>
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
            {
              lodgingServices.map((e) => {
                return(
                  <p className={styles.p1}>{e}</p>
                )
              })
            }
          </div> */}
           <div className={styles.flexcontainer2}>

            <div className={styles.flexcontainer4}>
           <div><AiOutlineWifi /></div>
           <div>{lodgingServices.includes("wifi") ? <p className={styles.p1}>Wifi</p> : <p className={styles.p2}>Wifi</p>}</div>
            </div>

            <div className={styles.flexcontainer4}>
           <div><GiThermometerCold /></div>
           <div>{lodgingServices.includes("ac") === true ? <p className={styles.p1}>Aire Acondicionado</p> : <p className={styles.p2}>Aire Acondicionado</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><GiShower /></div>
           <div>{lodgingServices.includes("hotWater") === true ? <p className={styles.p1}>Agua Caliente</p> : <p className={styles.p2}>Agua Caliente</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><MdOndemandVideo /></div>
           <div>{lodgingServices.includes("tv") === true ? <p className={styles.p1}>Televisión</p> : <p className={styles.p2}>Televisión</p>}</div>
            </div>
           
            <div className={styles.flexcontainer4}>
           <div><MdSecurity /></div>
           <div>{lodgingServices.includes("security") === true ? <p className={styles.p1}>Seguridad</p> : <p className={styles.p2}>Seguridad</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><AiFillCar /></div>
           <div>{lodgingServices.includes("parking") === true ? <p className={styles.p1}>Estacionamiento</p> : <p className={styles.p2}>Estacionamiento</p>}</div>
            </div>

            <div className={styles.flexcontainer4}>
           <div><MdCleaningServices /></div>
           <div>{lodgingServices.includes("cleaning") === true ? <p className={styles.p1}>Limpieza</p> : <p className={styles.p2}>Limpieza</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><GiWashingMachine /></div>
           <div>{lodgingServices.includes("laundry") === true ? <p className={styles.p1}>Lavandería</p> : <p className={styles.p2}>Lavandería</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><GiCookingPot /></div>
           <div>{lodgingServices.includes("kitchen") === true ? <p className={styles.p1}>Cocina</p> : <p className={styles.p2}>Cocina</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><MdLocalDining /></div>
           <div>{lodgingServices.includes("dining") === true ? <p className={styles.p1}>Comedor</p> : <p className={styles.p2}>Comedor</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><FaSwimmingPool /></div>
           <div>{lodgingServices.includes("pool") === true ? <p className={styles.p1}>Piscina</p> : <p className={styles.p2}>Piscina</p>}</div>
           </div>

            <div className={styles.flexcontainer4}>
           <div><MdOutlinePets /></div>
           <div>{lodgingServices.includes("pets") === true ? <p className={styles.p1}>Mascotas</p> : <p className={styles.p2}>Mascotas</p>}</div>
           </div>

          </div>
          </div>
        </div>

          <div>
            <div className={styles.flexcontainer1}>
            <Card className={styles.card} /> 

              <div className={styles.flexcontainer1}>
              <h3 className={styles.padding}>${myLodging.currency} {myLodging.price} por noche</h3>
              
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
        <Link to={userToken ? `/lodgingreview/${userToken}/${props.match.params._id}` : "/login"} className="nav-link py-2 px-0 px-lg-2">
          <button className={styles.button}>Califica este hospedaje!</button>
        </Link>
                    
      </div>
        
    </div>
    )

}