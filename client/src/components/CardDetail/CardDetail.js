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
  
  /* const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params._id))
}, [dispatch])

  const myLodging = useSelector((state) => state.detail)
  console.log(myLodging)

  // const servicios = useSelector((state) => state.detail.services)
  

  const servicios = myLodging.services
  const lodgingServices = []
  const lodgingNoServices = []

  for (const property in servicios) {
    if (property === true) {
      lodgingServices.push(property)
      console.log(property)
    }
    else {
      lodgingNoServices.push(property)
      console.log(property)
    }
  }


  // const ac = myLodging[0].services.ac
  // const ac = servicios.ac
  // console.log(ac)
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

    if (servicios[property] === true) {
      lodgingServices.push(property)
    }
    else {
      lodgingNoServices.push(property)
    }
  


  //variables necesarias para carrusel de imagenes
  const picture = myLodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const picture2 = obj["1"];
  const picture3 = obj["2"];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex); */
 

  //renderizado

  return(
  <div className={styles.text}>
    
         
    </div>
    )

}