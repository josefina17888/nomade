import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from '../../../Redux/Actions';
import styles from "./serviciosincluidos.module.css";
import { AiOutlineWifi, AiFillCar } from 'react-icons/ai';
import { GiThermometerCold, GiCookingPot, GiWashingMachine, GiShower } from 'react-icons/gi';
import { MdLocalDining, MdOutlinePets, MdOndemandVideo, MdCleaningServices, MdSecurity } from 'react-icons/md';
import { FaSwimmingPool } from 'react-icons/fa';

export default function ServiciosIncluidos (props) {

const dispatch = useDispatch();
    
useEffect(() => {
      dispatch(getDetail(props.match.params._id))
}, [dispatch])

const myLodging = useSelector((state) => state.detail)

const wifi = myLodging.services.wifi
const ac = myLodging.services.ac
const tv = myLodging.services.tv
const security = myLodging.services.security
const cleaning = myLodging.services.cleaning
const parking = myLodging.services.parking
const laundry = myLodging.services.laundry
const hotWater = myLodging.services.hotWater
const kitchen = myLodging.services.kitchen
const pool = myLodging.services.pool
const dining = myLodging.services.dining
const pets = myLodging.services.pets

    {
    <div>
        
        <div>
        <AiOutlineWifi />  
        </div>
        <div>
        wifi === true ? <p className={styles.p1}>Wifi</p> : <p className={styles.p2}>Wifi</p>
        </div>
        
        <div>
        <GiThermometerCold />
        </div>
        <div>
        ac === true ? <p className={styles.p1}>Aire Acondicionado</p> : <p className={styles.p2}>Aire Acondicionado</p>
        </div>

        <div>
        <GiShower />
        </div>
        <div>
        hotWater === true ? <p className={styles.p1}>Agua Caliente</p> : <p className={styles.p2}>Agua Caliente</p>
        </div>
        
        <div>
        <MdOndemandVideo />
        </div>
        <div>
        tv === true ? <p className={styles.p1}>Televisión</p> : <p className={styles.p2}>Televisión</p>
        </div>
        
        <div>
        <MdSecurity />
        </div>
        <div>
        security === true ? <p className={styles.p1}>Seguridad</p> : <p className={styles.p2}>Seguridad</p>
        </div>

        <div>
        <AiFillCar />
        </div>
        <div>
        parking === true ? <p className={styles.p1}>Estacionamiento</p> : <p className={styles.p2}>Estacionamiento</p>
        </div>

        <div>
        <MdCleaningServices />
        </div>
        <div>
        cleaning === true ? <p className={styles.p1}>Limpieza</p> : <p className={styles.p2}>Limpieza</p>
        </div>

        <div>
        <GiWashingMachine />
        </div>
        <div>
        laundry === true ? <p className={styles.p1}>Lavanderia</p> : <p className={styles.p2}>Lavadero</p>
        </div>

        <div>
        <GiCookingPot />
        </div>
        <div>
        kitchen === true ? <p className={styles.p1}>Cocina</p> : <p className={styles.p2}>Cocina</p>
        </div>
        
        <div>
        <MdLocalDining />
        </div>
        <div>
        dining === true ? <p className={styles.p1}>Comedor</p> : <p className={styles.p2}>Comedor</p>
        </div>
        
        <div>
        <FaSwimmingPool />
        </div>
        <div>
        pool === true ? <p className={styles.p1}>Piscina</p> : <p className={styles.p2}>Piscina</p>
        </div>

        <div>
        <MdOutlinePets />
        </div>
        <div>
        pets === true ? <p className={styles.p1}>Mascotas</p> : <p className={styles.p2}>Mascotas</p>
        </div>

    </div>
    }
}