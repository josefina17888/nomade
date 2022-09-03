import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getLodgings,
  orderPrice,
  setLoaderFalse,
  setLoaderTrue,
} from "../../Redux/Actions/index";
import AllCardsPaging from "../AllCardsPaging/AllCardsPaging";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import styles from "./AllCards.module.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton.js";



export default function AllCards({setCurrentPage, paging, lodgingPerPage, currentLodging}) {
  let stateLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  // const [lodgingPerPage, setLodgingPerPage] = useState(10); // setear en 20 la cantidad de hospedajes por página
  // const indexLastLodging = currentPage * lodgingPerPage;
  // const indexFirstLodging = indexLastLodging - lodgingPerPage;
  // const currentLodging = stateLodgings.slice(
  //   indexFirstLodging,
  //   indexLastLodging
  // );
  const loader = useSelector((state) => state.loader);
  const [order, setOrder] = useState("");

  // const paging = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  useEffect(() => {
    dispatch(getLodgings());
  }, [dispatch]);

  let userId = localStorage.getItem("userInfo");
  
  if(userId) {
    var user = JSON.parse(userId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        {loader ? (
          <h2>Loading...</h2>
        ) : currentLodging.length < 1 ? (
          <h2>No se encontraron alojamientos</h2>
        ) : (
          currentLodging.map((e) => {
            return (
              <div key={e._id} className={styles.cards}>

                <div  className={styles.card}>

                <div>

                {

                    user ? <FavoriteButton guestInfo= {localStorage.getItem("userInfo")} id={e._id} city={e.city}
                    country={e.country}
                    price={e.price}
                    guests={e.guests}
                    picture={e.picture[0]}
                    currency={e.currency}/> 
                    : 
                    <Link to={`/login`} className={styles.link}><FavoriteButton ></FavoriteButton></Link>
                  }

                  <Link to={`/detail/${e._id}`} className={styles.link}>

                    <Card
                      id={e._id}
                      city={e.city}
                      country={e.country}
                      price={e.price}
                      guests={e.guests}
                      picture={e.picture[0]}
                      currency={e.currency}
                    />

                    </Link>

                </div>
                  
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className={styles.pag}>
        <div>
          {!loader ? (
            <AllCardsPaging
              lodgingPerPage={lodgingPerPage}
              stateLodgings={stateLodgings.length}
              paging={paging}
            />
          ) : null}
        </div>
      </div>
      <div className={styles.overlay}>
        <div className={styles.containerModal}>
          
       </div>
      </div>
    </div>
  );
}
