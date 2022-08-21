import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import s from "../NavBar/NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/nomadeLogo.svg";

export default function NavBar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className={s.div_logo}>
          <Link to="/">
            <img alt="bg-button" src={Logo} className={s.logo} />
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className={s.container_navLink_btn}>
          <Link to="/form" className={s.NavLink}>
            <button className={s.div_host}>Hospeda nómades</button>
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
            >Action</button>
            <ul className="dropdown-menu" role="menu">
              <li>
                <Link to="/registerguest" className="dropdown-item">
                  Registrarse
                </Link>
              </li>
              <li>Iniciar sesión</li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
