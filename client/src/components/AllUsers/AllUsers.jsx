import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getLodgings,
  getGuests,
  setLoaderFalse,
  setLoaderTrue,
} from "../../Redux/Actions/index";
import AllUsersPaging from "../AllUsersPaging/AllUsersPaging";
import Users from "../Users/Users";
import { Link } from "react-router-dom";
import styles from "../AllCards/AllCards.module.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton.js";



export default function AllUsers({setCurrentPage, paging, guestPerPage, currentLodging}) {
  const dispatch = useDispatch();
  let guests = useSelector((state) => state.allGuests);
  console.log(guests)
  const [order, setOrder] = useState("");


  useEffect(() => {
    dispatch(getGuests());
  }, [dispatch]);

  let userId = localStorage.getItem("userInfo");
  
  if(userId) {
    var user = JSON.parse(userId);
  }
  let guestVisibles=guests.filter(e=>e.Visibility === true )
  console.log(guestVisibles)
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        {
          currentLodging.map((e) => {
            return (
              <div key={e._id} className={styles.cards}>
                <div  className={styles.card}>
                <div>
                    <Users
                      email={e.email}
                      name={e.name}
                      id={e._id}
                      lastname={e.lastname}
                      visibility={e.Visibility}
                      picture={e.picture}
                      isAdmin={e.isAdmin}
                    />
                </div>
                  
                </div>
              </div>
            );
          })
        }
      </div>

      <div className={styles.pag}>
        <div>
            <AllUsersPaging
              lodgingPerPage={guestPerPage}
              stateLodgings={guestVisibles.length}
              paging={paging}
            />
        </div>
      </div>
      <div className={styles.overlay}>
        <div className={styles.containerModal}>
          
       </div>
      </div>
    </div>
  );
}