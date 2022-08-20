import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import s from "../NavBar/NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/nomadeLogo.svg";

export default function NavBar() {
  return (
    <React.Fragment>
      <nav className={s.nav}>
        <div className={s.div_logo}>
          <NavLink to="/">
            <img alt="bg-button" src={Logo} className={s.logo} />
          </NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className={s.container_navLink_btn}>
          <NavLink to="/form" className={s.NavLink}>
            <button className={s.div_host}>Hospeda nómades</button>
          </NavLink>
          <button>User</button>
        </div>
      </nav>
    </React.Fragment>
  );
}
