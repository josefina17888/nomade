import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../Redux/Actions/index";
import styles from "./CardDetail.module.css"

export default function CardDetail(props){
    
  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(getDetail(props.match.params.id))
  }, [dispatch])

  const myLodging = useSelector((state) => state.detail)
  console.log(myLodging)

  return(
    <div>
      {
        myLodging === undefined ? <p>Loading...</p> :
          <div>
            <div>
              <h1>{myLodging.lodgingType}</h1>
            </div>
            <div>
              <h3>Descripción: {myLodging.description}</h3>
            </div>
            <div>
              <h3>Costo por noche: {myLodging.price}</h3>
            </div>
            <div>
              <img src={myLodging.picture} alt='img not found'/>
            </div>
            </div>
            } 
            <Link to= '/'>
                <button>Volver</button>
            </Link>
        </div>
    )

}