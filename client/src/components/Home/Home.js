import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllCards from '../AllCards/AllCards';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';

import styles from './Home.module.css'
import Profile from '../Profile/profile';
export default function Home() {

  let guestId = localStorage.getItem("userInfo");
  let user = JSON.parse(guestId)
  console.log("user",user)

  let stateLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  const [lodgingPerPage, setLodgingPerPage] = useState(10); // setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = stateLodgings.slice(
    indexFirstLodging,
    indexLastLodging
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="c1kae56o dir dir-ltr">
    <NavBar
    email={user.email}/>
    <Menu setCurrentPage={setCurrentPage} paging={paging} lodgingPerPage={lodgingPerPage} currentLodging={currentLodging}/>
    <AllCards setCurrentPage={setCurrentPage} paging={paging} lodgingPerPage={lodgingPerPage} currentLodging={currentLodging}/>
    </div>
  )
}
