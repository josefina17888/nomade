import React from "react";
import styles from "../Card/Card.module.css";
import { Link,useHistory } from "react-router-dom";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {lodgingReviews} from "../../Redux/Actions/index";
import { hacerAdmin, deleteUser,sacarAdmin} from "../../Redux/Actions/index";
export default function Users({ email, picture,visibility, id,name,lastname, isAdmin }) {
  const dispatch = useDispatch();
  useEffect(() => {
  }, [dispatch]);
  const history = useHistory()
  function handleSubmit(e){
    e.preventDefault()
    dispatch(deleteUser(id))  
    window.location.reload();
  }
  function handleSubmitAdmin(e){
    e.preventDefault()
    dispatch(hacerAdmin(id))  
    window.location.reload();
  }
  function handleSacarAdmin(e){
    e.preventDefault()
    dispatch(sacarAdmin(id))  
    window.location.reload();
  }
  return (
 
   <div>
      { visibility === undefined ||visibility === true  ? 
         <div className={styles.card}>
      <div>
        <div>
         
        </div>
      <div className={styles.text}>
          <h3 className={styles.city}>{`${name}, ${lastname}`}</h3>
          <p className={styles.price}>{`${email} `}</p>
          <p className={styles.price}>{`${id} `}</p>
          <form onSubmit={(e)=>handleSubmit(e)}> 
          <button className={styles.buttonDenunciar} type='submit'>Borrar Usuario</button>
          </form>
          {isAdmin === false || !isAdmin?
          <form onSubmit={(e)=>handleSubmitAdmin(e)}> 
          <button className={styles.buttonDenunciar} type='submit'>Hacer admin</button>
          </form>:<form onSubmit={(e)=>handleSacarAdmin(e)}> 
          <button className={styles.buttonDenunciar} type='submit'>sacar Admin</button>
          </form>}
          </div></div>
    </div>:<div className={styles.nover}></div>
}

</div>
  );
}