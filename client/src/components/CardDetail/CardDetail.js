import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../Redux/Actions/index";
import Card from "react-bootstrap/Card";
import ControlledCarousel from "./Carousel/Carousel";
import DatePickerOk from "./DatePicker/DatePicker";
import ServiciosIncluidos from "./ServiciosIncluidos/serviciosincluidos";
import styles from "./CardDetail.module.css"

export default function CardDetail(props){ 
  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(getDetail(props.match.params._id))
  }, [dispatch])

  const myLodging = useSelector((state) => state.detail)

  
  return(
  <div className={styles.text}>
    {
      myLodging === undefined ? <p>Loading...</p> :
      <div className={styles.gral}>
        <div>  
          <div className={styles.padding}>
            <ControlledCarousel />
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
              <ServiciosIncluidos />
          </div>
        </div>

          <div>
            <div className={styles.flexcontainer1}>
            <Card className={styles.card}> 

              <div className={styles.flexcontainer1}>
              <h3 className={styles.padding}>${myLodging.price} por noche</h3>
              
              <div>
                <DatePickerOk />
              </div>

              <div className={styles.flexcontainer3}>
                <h6 className={styles.select}>Huéspedes</h6>
                <form>
                  <input type="text"></input>
                </form>
              </div>
              
              <div>
              <Link to= '/'>
                <button className={styles.button1}>Reservá ahora</button>
              </Link>
              </div>
            
              </div>
            </Card>
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