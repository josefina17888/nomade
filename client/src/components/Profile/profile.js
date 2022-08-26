import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuest } from "../../Redux/Actions";
import Logo from "../../assets/nomadeLogo.svg";
import style from "./profile.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Profile(props) {
  const dispatch = useDispatch();
  const guestDet = useSelector((state) => state.guest);
  const detalles = guestDet[0];
  useEffect(() => {
    dispatch(getGuest(props.match.params.email));
  }, []);
  console.log(detalles);

  return (
    <div>
      <div>
        {detalles === undefined ? (
          <p>Loading...</p>
        ) : (
          <div className="_16grqhk">
            <NavBar />
            <div className={style.container}>
              <div>
                <h2>Detalle del Perfil</h2>
                <h4>Nombre</h4>
                <h6>
                  {detalles.name.charAt(0).toUpperCase() +
                    detalles.name.slice(1)}{" "}
                  {detalles.lastname.charAt(0).toUpperCase() +
                    detalles.lastname.slice(1)}
                </h6>
                <hr width="700"></hr>
                {detalles.birthDate ? (
                  <div>
                    <h4>Fecha de Nacimiento</h4>
                    <h6>{detalles.birthDate}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
                <h4>Correo Electronico</h4>
                <h6>{detalles.email}</h6>
                <hr width="700"></hr>
                <h4>Contraseña</h4>
                <h6>{detalles.password}</h6>
                <hr width="700"></hr>
                {detalles.cellPhone ? (
                  <div>
                    <h4>Telefono</h4>
                    <h6>{detalles.cellPhone}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={style.container_card_profile}>
                <div className={style.card_profile}>
                  <div className={style.foto}>
                    <div className={style._fvp3r0u}>
                      <div>
                        <div className={style._1h6n1zu}>
                          <img
                            src={detalles.picture}
                            alt="Sin foto.."
                            className={style._9ofhsl}
                          ></img>
                        </div>
                      </div>
                      <div>Actualizar foto</div>
                    </div>
                  </div>
                  <div>RESEÑAS BRUNO ahora estoy probando</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
