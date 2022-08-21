import React from "react";
import { NavLink } from "react-router-dom";
import { orderPrice } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import s from "../Menu/Menu.module.css";
import { TbMap2 } from "react-icons/tb";

export default function Menu() {
  const dispatch = useDispatch();
  //order price
  function handleOrderPrice(e) {
    e.preventDefault();
    dispatch(orderPrice(e.target.value));
    //setCurrentPage(1);
    //setOrder(`Ordered ${e.target.value}`);
  }
  return (
    <div className="n1p4yt3r dir dir-ltr">
      <div className={s.container}>
          <div>
            <NavLink to="/map">Mapa <TbMap2 className={s.icon} /></NavLink>
          </div>
          <div className="c14whb16 dir dir-ltr">
            <div>Tipo de casa</div>
          <div>Mascotas</div>
          <div>
            <span>Ordena por</span>
            <select onClick={(e) => handleOrderPrice(e)}>
              <option value="lowest">Menor precio</option>
              <option value="highest">Mayor precio</option>
            </select>
          </div>
          </div>
      </div>
    </div>
  );
}
