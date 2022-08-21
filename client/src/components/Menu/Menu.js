import React from "react";
import { NavLink } from "react-router-dom";
import { filterTypeHouse, orderPrice } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../Menu/Menu.module.css";
import { TbMap2 } from "react-icons/tb";
import { GiSpookyHouse } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
export default function Menu() {
  const allLodgings = useSelector(state => state.lodgings)
  const dispatch = useDispatch();
//Ordernar por Lodging tipo: Casa
  function handleFilterTypeHouse(e){
    e.preventDefault();
    dispatch(filterTypeHouse(e.target.value))
  }
  /* function handleFilterByPets(e){
    e.preventDefault();
    dispatch(filterTypeHouse(e.target.value))
  } */
  return (
    <div className="n1p4yt3r dir dir-ltr">
      <div className={s.container}>
        <div>
          <NavLink to="/map">
            Mapa <TbMap2 className={s.icon_map} />
          </NavLink>
        </div>
        <div className={s.container_icons}>
          <div>
            <button className={s.button_icon} onClick={handleFilterTypeHouse}>
              <span>
                <GiSpookyHouse className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Casa</span>
                </div>
              </span>
            </button>
          </div>
          <div>
            <button className={s.button_icon}>
              <span>
                <MdOutlinePets className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Mascotas</span>
                </div>
              </span>
            </button>
          </div>
          <div>
            <button className={s.button_icon}>
              <span>
                <TbTrendingUp className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Costo</span>
                </div>
              </span>
            </button>
          </div>
          <div>
            <button className={s.button_icon}>
              <span>
                <TbTrendingDown className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Costo</span>
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
