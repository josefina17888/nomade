import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
  filterByPets,
  filterTypeHouse,
  orderByHigherCost,
  orderByLowerCost,
  orderByRating
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../Menu/Menu.module.css";
import { TbMap2 } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import {BsGraphUp} from "react-icons/bs";
import {BsFillPersonLinesFill} from "react-icons/bs";
import { BsShieldFillExclamation } from "react-icons/bs";
import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
export default function Menu({setCurrentPage, paging, lodgingsPerPage, currentLodging}) {
  const allLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();

  return (
    <div className="n1p4yt3r dir dir-ltr">
      <div className={s.container}>
          <Link to="/map" style={{ textDecoration: 'none' }}>
        <button className={s.button_icon}>
          <TbMap2 className={s.icons} />
            <div className={s.text_desc_icon}>
            Mapa
            </div>
        </button>
          </Link>
        <div className={s.container_icons}>
          <div>
          <Link to="/admin/lodgings">
            <button className={s.button_icon} >
              <span>
                <AiFillHome className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Alojamientos</span>
                </div>
              </span>
            </button>
            </Link>
          </div>
          <div>
            <Link to="/admin/users">
            <button className={s.button_icon} >
              <span>
                <BsFillPersonLinesFill className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Usuarios</span>
                </div>
              </span>
            </button>
            </Link>
          </div>
          <div>
          <Link to="/admin/estadisticas">
            <button className={s.button_icon} >
              <span>
                <BsGraphUp className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Estadisticas</span>
                </div>
              </span>
            </button>
          </Link>
          </div>
          <div>
          <Link to="/admin/complaints">
            <button className={s.button_icon} >
              <span>
                <BsShieldFillExclamation className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Denuncias</span>
                </div>
              </span>
            </button>
          </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
}
