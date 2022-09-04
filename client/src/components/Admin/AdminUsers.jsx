import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllUsers from '../AllUsers/AllUsers';
import Menu from './menuAdmin';
import UserNav from './userNavBar';
import {getGuests} from "../../Redux/Actions/index";
import styles from './admin.module.css'
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
  }
  const allGuests = useSelector((state) => state.allGuests);
  let arrFilter =  allGuests.filter(e => e.email === userEmail)
  let stateLodgings = useSelector((state) => state.lodgings);
  let lodgingsVisibles= allGuests.filter(e=> e.Visibility===true)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  const [guestPerPage, setguestPerPage] = useState(10); // setear en 20 la cantidad de hospedajes por página
  const indexLastUser = currentPage * guestPerPage;
  const indexFirstUser = indexLastUser- guestPerPage;
  const currentUser = lodgingsVisibles.slice(
    indexFirstUser,
    indexLastUser
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="c1kae56o dir dir-ltr">
      {userToken && allGuests[0]!== undefined && (arrFilter[0].isAdmin || arrFilter[0].isAdmin === true) ?
    <div>
   
   <UserNav
    email={user?user.email: ""} />
    <Menu setCurrentPage={setCurrentPage} paging={paging} guestPerPage={guestPerPage} currentLodging={currentUser}/>
    <AllUsers setCurrentPage={setCurrentPage} paging={paging} guestPerPage={guestPerPage} currentLodging={currentUser}/>
    </div>:
    <h1>No puedes ver esta pagina.</h1>}
    </div>
  )
}
