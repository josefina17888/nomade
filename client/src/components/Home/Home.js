
import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import AllCards from "../AllCards/AllCards";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Profile from "../Profile/profile";
import Footer from '../Footer/Footer'


export default function Home() {
  let guestId = localStorage.getItem("userInfo");
  let user = JSON.parse(guestId)

  let stateLodgings = useSelector((state) => state.lodgings);
  console.log(stateLodgings)
  let lodgingsVisibles= stateLodgings.filter(e=> e.Visibility===true)

  //PAGINATED
  const [currentPage, setCurrentPage] = useState(1); 
  const [lodgingPerPage, setLodgingPerPage] = useState(10); 
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = lodgingsVisibles.slice(
    indexFirstLodging,
    indexLastLodging
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="c1kae56o dir dir-ltr">
      <NavBar email={user ? user.email : ""} />
      <Menu
        setCurrentPage={setCurrentPage}
        paging={paging}
        lodgingPerPage={lodgingPerPage}
        currentLodging={currentLodging}
      />
      <AllCards
        setCurrentPage={setCurrentPage}
        paging={paging}
        lodgingPerPage={lodgingPerPage}
        currentLodging={currentLodging}
      />
      <Footer/>
    </div>
  );
}
