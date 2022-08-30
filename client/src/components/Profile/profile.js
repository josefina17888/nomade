import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './profile.module.css'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.js'

export default function Profile({email}) {
  const dispatch = useDispatch()
  const guestDet = useSelector((state) => state.guest)
  let guestId = localStorage.getItem("userInfo");
  let user = JSON.parse(guestId)

  return (
    <div>
      <div>
        {user === undefined ? (
          <p>Loading...</p>
        ) : (
          <div className="_16grqhk">
            <NavBar />
            <div className={style.container}>
              <div>
                <h2>Detalle del Perfil</h2>
                <h4>Nombre</h4>
                <h6>
                  {user.name.charAt(0).toUpperCase() +
                    user.name.slice(1)}{" "}
                  {user.lastname.charAt(0).toUpperCase() +
                    user.lastname.slice(1)}
                </h6>
                <hr width="700"></hr>
                {user.birthDate ? (
                  <div>
                    <h4>Fecha de Nacimiento</h4>
                    <h6>{(user.birthDate).slice(0, -14)}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
                <h4>Correo Electronico</h4>
                <h6>{user.email}</h6>
                <hr width="700"></hr>
                <h4>Contraseña</h4>
                <Link to={`/${user.email}/resetPassword`} ><button>Actualizar Contraseña</button></Link>
                <hr width="700"></hr>
                {user.cellPhone ? (
                  <div>
                    <h4>Telefono</h4>
                    <h6>{user.cellPhone}</h6>
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
                            src={user.picture}
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
