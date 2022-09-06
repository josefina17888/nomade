import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getGuests,
  getDetail,
  getGuestByEmail,
  deleteLodging,
} from "../../Redux/Actions/index";
import Carousel from "react-bootstrap/Carousel";
import GoogleMapDetail from "../GoogleMapsDetail/GoogleMapsDetail";
import Card from "react-bootstrap/Card";
import DatePickerOk from "../DatePicker/DatePicker";
import styles from "./CardDetail.module.css";
import { AiOutlineWifi, AiFillCar } from "react-icons/ai";
import { lodgingReviews } from "../../Redux/Actions/index";
import NavBar from "../NavBar/NavBar";
import s from "../DatePicker/DatePicker.module.css";

import {
  GiThermometerCold,
  GiCookingPot,
  GiWashingMachine,
  GiShower,
} from "react-icons/gi";
import {
  MdLocalDining,
  MdOutlinePets,
  MdOndemandVideo,
  MdCleaningServices,
  MdSecurity,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import ConditionalReview from "./ConditionalReview/ConditionalReview";

export default function CardDetail(props) {
  const dispatch = useDispatch();
  const lodgingId = props.match.params._id;
  const history = useHistory();
  let guestId = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId)._id;
    var userEmail = JSON.parse(guestId).email;
  }
  useEffect(() => {
    dispatch(getGuests());
    dispatch(getDetail(lodgingId));
    dispatch(getGuestByEmail(userEmail));
    dispatch(lodgingReviews());
  }, [dispatch]);
  const myLodging = useSelector((state) => state.detail);
  let stateLodgings = useSelector((state) => state.allLodgingsReviews);
  const allGuests = useSelector((state) => state.allGuests);
  const validateHost = useSelector((state) => state.hosts);
  console.log(validateHost, "AQUI VALIDATE HOST");
  let detailReview = stateLodgings.map((e) =>
    e.lodgingId === lodgingId ? [e.comments, e.rating] : false
  );
  let filtrado = detailReview.filter((e) => e !== false);

  // const servicios = useSelector((state) => state.detail.services)

  const servicios = myLodging.services;
  let arrFilter = allGuests.filter((e) => e.email === userEmail);
  console.log(allGuests, 'ALL GUESTS')
  const lodgingServices = [];
  const lodgingNoServices = [];
  var filterHost = allGuests.filter((e) => e._id === arrFilter[0]._id);
  var nameHost = "";

  for (let property in filterHost[0]) {
    if (property === "name") {
      nameHost = filterHost[0].name;
    }
  }

  for (const property in servicios) {
    if (servicios[property] === true) {
      lodgingServices.push(property);
    } else {
      lodgingNoServices.push(property);
    }
  }

  //variables necesarias para carrusel de imagenes
  const picture = myLodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const picture2 = obj["1"];
  const picture3 = obj["2"];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //renderizado
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteLodging(props.match.params._id));
    history.push("/");
  }

  return (
    <div>
      <NavBar />
      {myLodging === undefined ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.first_container}>
          <div className="w-75">
            <div className={styles.container}>
              <div className="d-flex justify-content-center">
                <h2>{myLodging.title}</h2>
              </div>
              <div className="p-2 w-100 rounded d-flex justify-content-center">
                <div className={styles.container_img}>
                  <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 rounded"
                        src={picture1}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 rounded"
                        src={picture2}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 rounded"
                        src={picture3}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
              <div className="d-block">
                <div className="d-flex justify-content-center">
                  <h5 className={styles.city}>{myLodging.city}, {myLodging.country}</h5>
                </div>
                <div className="d-flex justify-content-center">
                  <div className={styles.container_text}>
                    <div>
                      <h3 className={styles.titles}>Alojamiento</h3>
                      <div className={styles.description_lodging}>
                        <div>
                          <div>Anfitrión: {nameHost}</div>
                          <div>Tipo: {myLodging.lodgingType}</div>
                        </div>
                        <div>
                          <div>Huéspedes: {myLodging.guests} </div>
                          <div>Recámaras: {myLodging.rooms}</div>
                        </div>
                        <div>
                          <div>Camas: {myLodging.beds}</div>
                          <div>Baños: {myLodging.bathrooms}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className={styles.titles}>Descripción</h3>
                      <div className="d-flex justify-content-center">
                        <div className={styles.description}>
                          {myLodging.description}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className={styles.titles}>Servicios Incluidos</h3>
                      <div className="d-flex justify-content-center">
                        <div className={styles.services}>
                          <div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <AiOutlineWifi />
                              </div>
                              <div>
                                {lodgingServices.includes("wifi") ? (
                                  <p className={styles.p1}>Wifi</p>
                                ) : (
                                  <p className={styles.p2}>Wifi</p>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <GiThermometerCold />
                              </div>
                              <div>
                                {lodgingServices.includes("ac") === true ? (
                                  <p className={styles.p1}>
                                    Aire Acondicionado
                                  </p>
                                ) : (
                                  <p className={styles.p2}>
                                    Aire Acondicionado
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <GiShower />
                              </div>
                              <div>
                                {lodgingServices.includes("hotWater") ===
                                true ? (
                                  <p className={styles.p1}>Agua Caliente</p>
                                ) : (
                                  <p className={styles.p2}>Agua Caliente</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <MdOndemandVideo />
                              </div>
                              <div>
                                {lodgingServices.includes("tv") === true ? (
                                  <p className={styles.p1}>Televisión</p>
                                ) : (
                                  <p className={styles.p2}>Televisión</p>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <MdSecurity />
                              </div>
                              <div>
                                {lodgingServices.includes("security") ===
                                true ? (
                                  <p className={styles.p1}>Seguridad</p>
                                ) : (
                                  <p className={styles.p2}>Seguridad</p>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <AiFillCar />
                              </div>
                              <div>
                                {lodgingServices.includes("parking") ===
                                true ? (
                                  <p className={styles.p1}>Estacionamiento</p>
                                ) : (
                                  <p className={styles.p2}>Estacionamiento</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <MdCleaningServices />
                              </div>
                              <div>
                                {lodgingServices.includes("cleaning") ===
                                true ? (
                                  <p className={styles.p1}>Limpieza</p>
                                ) : (
                                  <p className={styles.p2}>Limpieza</p>
                                )}
                              </div>
                            </div>

                            <div className="d-flex flex-row gap-1">
                              <div>
                                <GiWashingMachine />
                              </div>
                              <div>
                                {lodgingServices.includes("laundry") ===
                                true ? (
                                  <p className={styles.p1}>Lavandería</p>
                                ) : (
                                  <p className={styles.p2}>Lavandería</p>
                                )}
                              </div>
                            </div>

                            <div className="d-flex flex-row gap-1">
                              <div>
                                <GiCookingPot />
                              </div>
                              <div>
                                {lodgingServices.includes("kitchen") ===
                                true ? (
                                  <p className={styles.p1}>Cocina</p>
                                ) : (
                                  <p className={styles.p2}>Cocina</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="d-flex flex-row gap-1">
                              <div>
                                <MdLocalDining />
                              </div>
                              <div>
                                {lodgingServices.includes("dining") === true ? (
                                  <p className={styles.p1}>Comedor</p>
                                ) : (
                                  <p className={styles.p2}>Comedor</p>
                                )}
                              </div>
                            </div>

                            <div className="d-flex flex-row gap-1">
                              <div>
                                <FaSwimmingPool />
                              </div>
                              <div>
                                {lodgingServices.includes("pool") === true ? (
                                  <p className={styles.p1}>Piscina</p>
                                ) : (
                                  <p className={styles.p2}>Piscina</p>
                                )}
                              </div>
                            </div>

                            <div className="d-flex flex-row gap-1">
                              <div>
                                <MdOutlinePets />
                              </div>
                              <div>
                                {lodgingServices.includes("pets") === true ? (
                                  <p className={styles.p1}>Mascotas</p>
                                ) : (
                                  <p className={styles.p2}>Mascotas</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className={styles.titles}>Mapa</h3>
                      <div className="d-flex justify-content-center">
                        <div>
                          <GoogleMapDetail />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className={styles.titles}>Reseñas</h3>
                      <div className="d-flex justify-content-center">
                        <div className={styles.reviews}>
                          {filtrado[0] !== undefined ? (
                            <div className={styles.texto}>
                              {filtrado.map((e) => (
                                <div className="d-flex flex-column pe-4">
                                  <label
                                    className={styles.estrellas}
                                    value={e[1]}
                                  >
                                    {e[1] === 5
                                      ? "★★★★★ "
                                      : e[1] === 4
                                      ? "★★★★ "
                                      : e[1] === 3
                                      ? "★★★ "
                                      : e[1] === 2
                                      ? "★★ "
                                      : e[1] === 1
                                      ? "★ "
                                      : false}
                                  </label>
                                  <label
                                    className={styles.value_reviews}
                                    value={e[0]}
                                  >
                                    {e[0]}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className={styles.aun}>
                              <h5>{"Aún no hay reseñas"}</h5>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
            <div className={styles.container_btn}>
              <ConditionalReview
                lodId={lodgingId}
                email={userEmail}
                userToken1={userToken}
              />

              <Link
                to={
                  userToken
                    ? `/complaint/${userToken}/${props.match.params._id}`
                    : "/login"
                }
                className="nav-link py-2 px-0 px-lg-2"
              >
                <button className={styles.buttonDenunciar}>
                  Denunciar hospedaje
                </button>
              </Link>
              {userToken &&
              allGuests[0] !== undefined &&
              arrFilter[0].isAdmin === true ? (
                <form onSubmit={(e) => handleSubmit(e)}>
                  <button className={styles.buttonDenunciar} type="submit">
                    Borrar alojamiento
                  </button>
                </form>
              ) : (
                <div></div>
              )}
            </div>
            </div>
          </div>
          <div>
            <DatePickerOk lodId={lodgingId} />
          </div>
        </div>
      )}
    </div>
  );
}
