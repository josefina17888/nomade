import React from "react";
import { NavLink } from "react-router-dom";
import { orderPrice } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import s from '../NavBar/NavBar.module.css'

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
    <nav className={s.container}>
        <ul>
          <NavLink to="/map">Mapa</NavLink>
        </ul>
        <ul>Tipo de casa</ul>
        <ul>Mascotas</ul>
        <ul>
          <span>Ordena por</span>
          <select onClick={(e) => handleOrderPrice(e)}>
            <option value="lowest">Menor precio</option>
            <option value="highest">Mayor precio</option>
          </select>
        </ul>
    </nav>
  );
}
