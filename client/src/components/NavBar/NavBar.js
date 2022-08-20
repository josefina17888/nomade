import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../Redux/Actions/index";
import styles from "./CardDetail.module.css"

export default function CardDetail(props){ 
  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(getDetail(props.match.params._id))
  }, [dispatch])

  const myLodging = useSelector((state) => state.detail)
  console.log(myLodging)
  // console.log(Object.keys(myLodging))
  // const { lodgingType, price, description, picture } = myLodging
  return(
    <div>
      {
        myLodging === undefined ? <p>Loading...</p> :
          <div>
            <div>
              <h1>{myLodging[0]}</h1>
            </div>
            <div>
              <img src={myLodging.picture} alt='img not found'/>
            </div>
            <div>
              <h3>Descripción: {myLodging.description}</h3>
            </div>
            <div>
              <h3>Costo por noche: {myLodging.price}</h3>
            </div>
            </div>
      } 
            <Link to= '/'>
                <button>Volver</button>
            </Link>
        </div>
    )

}