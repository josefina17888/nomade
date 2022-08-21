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

export default function AllCards() {
  let stateLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  const [lodgingPerPage, setLodgingPerPage] = useState(20); // setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = stateLodgings.slice(
    indexFirstLodging,
    indexLastLodging
  );
  const loader = useSelector((state) => state.loader);
  const [order, setOrder] = useState("");

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getLodgings());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.paging}>
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

        <div className={styles.cards}>
          {loader ? (
            <h2>Loading...</h2>
          ) : currentLodging.length < 1 ? (
            <h2>No se encontraron alojamientos</h2>
          ) : (
            currentLodging.map((e) => {
              return (
                <div className={styles.card}>
                <div key={e._id} >
                  <Link to={`/detail/${e._id}`} className={styles.link}>
                    <Card
                      city={e.city}
                      country={e.contry}
                      price={e.price}
                      guests={e.guests}
                      picture={e.picture}
                      description={e.description}
                    />
                  </Link>
                </div>
                </div>
              );
            })
          )}
        </div>
      
    </div>
  );
}
