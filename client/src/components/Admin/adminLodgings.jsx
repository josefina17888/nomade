import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllCards from '../AllCards/AllCards';
import Menu from './menuAdmin';
import NavBar from '../NavBar/NavBar';
import {getGuests} from "../../Redux/Actions/index";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import styles from "../Home/Home.module.css";
//import styles from './Home.module.css'
import Profile from '../Profile/profile';
export default function Home() {
  useEffect(() => {
    dispatch(getGuests());
  }, [dispatch]);
  let guestId = localStorage.getItem("userInfo");

  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId)._id;
    var userEmail = JSON.parse(guestId).email;
    var user = JSON.parse(guestId)
    var admin = JSON.parse(guestId).isAdmin;
  }
  const allGuests = useSelector((state) => state.allGuests);
  let stateLodgings = useSelector((state) => state.lodgings);
  let lodgingsVisibles= stateLodgings.filter(e=> e.Visibility===true)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  const [lodgingPerPage, setLodgingPerPage] = useState(10); // setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = lodgingsVisibles.slice(
    indexFirstLodging,
    indexLastLodging
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const onClickButton = () => {
    setLodgingPerPage(pageMore => pageMore + 10)
  }


  const backTop = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }


  return (
    <div className="c1kae56o dir dir-ltr">
       {userToken && allGuests[0]!== undefined && admin === true ?
    <div>
    <NavBar
    email={user?user.email: ""} />
    <AllCards
        setCurrentPage={setCurrentPage}
        paging={paging}
        lodgingPerPage={lodgingPerPage}
        currentLodging={currentLodging}
      />
      <div onClick={onClickButton} className={styles.scrolldown}>
        <div className={styles.chevrons}>
          <div className={styles.chevrondown}></div>
          <div className={styles.chevrondown}></div>
        </div>
      </div>
      <div className={styles.containerButton}>
          <IoChevronUpCircleOutline
            className={styles.buttonUp}
            onClick={backTop}
          >
          </IoChevronUpCircleOutline>
      </div>
    </div>:
    <h1>No puedes ver esta pagina.</h1>}
    </div>
  )
}
