import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getLodgings,
  orderPrice,
  setLoaderFalse,
  setLoaderTrue,
  getGuests,
  deleteComplaint,
  getComplaints
} from "../../Redux/Actions/index";
import AllComplaintsPaging from "../AllComplaintsPaging/AllComplaintsPaging.jsx";
import CardComplaint from "../CardComplaint/CardComplaint";
import { Link ,useHistory} from "react-router-dom";
import styles from "../AllCards/AllCards.module.css";

export default function AllComplaints({setCurrentPage, paging, lodgingPerPage, currentLodging}) {
  
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
  const history = useHistory()
  // const paging = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  useEffect(() => {
    dispatch(getComplaints());
  }, [dispatch]);

  function handleSubmit(e,id){
    e.preventDefault()
    dispatch(deleteComplaint(id))  
    window.location.reload();
  }

 

let guestId = localStorage.getItem("userInfo");

if (!guestId) {
} else {
  var userToken = JSON.parse(guestId)._id;
  var userEmail = JSON.parse(guestId).email;
  var admin = JSON.parse(guestId).isAdmin;
}
let stateComplaints = useSelector((state) => state.allcomplaints);
let lodgingsVisibles= stateComplaints.filter(e=> e.Visibility===true)
  {console.log(admin)}
const allGuests = useSelector((state) => state.allGuests);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        { 
         admin === true && currentLodging.map((e) => {
            return (
              <div key={e._id} className={styles.cards}>
                <div  className={styles.card}>
                <div>
                  <Link to={`/detail/${e.lodgingId}`} className={styles.link}>
                    
                    <CardComplaint
                      id={e._id}
                      tipo={e.tipo}
                      descripcion={e.descripcion}
                      dated={e.dated}
                      visibility={e.Visibility}
                      guest={e.guestId}
                      lodgingId={e.lodgingId}
                    />
                    </Link>
                  
                    {
                    userToken && allGuests[0]!== undefined &&  admin===true?
                    <form onSubmit={(j)=>handleSubmit(j,e._id)}> 
                    <button className={styles.buttonDenunciar} type='submit'>Borrar Denuncia</button>
                    </form>:
                    <div></div>
        }
                </div>
                  
                </div>
              </div>
            );
          })
        }
      </div>

      <div className={styles.pag}>
        <div>
            <AllComplaintsPaging
              lodgingPerPage={lodgingPerPage}
              stateLodgings={lodgingsVisibles.length}
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