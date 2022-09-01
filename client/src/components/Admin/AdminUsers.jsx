import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllUsers from '../AllUsers/AllUsers';
import Menu from './menuAdmin';
import NavBar from '../NavBar/NavBar';
import {
  getLodgings,
  getGuests,
  setLoaderFalse,
  setLoaderTrue,
} from "../../Redux/Actions/index";

import styles from './admin.module.css'
import Profile from '../Profile/profile';


export default function Home() {

  let guestId = localStorage.getItem("userInfo");
  let user = JSON.parse(guestId)
  let guests = useSelector((state) => state.allGuests);
  console.log(guests)
  let stateLodgings = useSelector((state) => state.lodgings);
  let lodgingsVisibles= guests.filter(e=> e.Visibility===true)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  const [guestPerPage, setguestPerPage] = useState(10); // setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * guestPerPage;
  const indexFirstLodging = indexLastLodging - guestPerPage;
  const currentLodging = lodgingsVisibles.slice(
    indexFirstLodging,
    indexLastLodging
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="c1kae56o dir dir-ltr">
    <NavBar
    email={user?user.email: ""} />
    
    <Menu setCurrentPage={setCurrentPage} paging={paging} guestPerPage={guestPerPage} currentLodging={currentLodging}/>
    <AllUsers setCurrentPage={setCurrentPage} paging={paging} guestPerPage={guestPerPage} currentLodging={currentLodging}/>
    </div>
  )
}
