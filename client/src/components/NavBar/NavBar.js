import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import s from "../NavBar/NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/nomadeLogo.svg";
import { TbUserCircle } from "react-icons/tb";

export default function NavBar() {

  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId)._id

  return (
    <React.Fragment>
      <div className="c1kn6kxw dir dir-ltr">
        <header className="c1kffd0v cxy853f c1g36qz5 dir dir-ltr">
          <div className={s.nav}>
            <div className="c1xsvlgx dir dir-ltr">
              <div>
                <div className={s.div_logo}>
                  <Link to="/" className="c13cw3wj cbavvlr dir dir-ltr">
                    <div className="l10sdlqs dir dir-ltr">
                      <img
                        alt="bg-button"
                        src={Logo}
                        className={s.logo}
                        width="150"
                        height="60"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div>
                <SearchBar />
              </div>
            </div>
            <div className="cylj8v3 dir dir-ltr">
              <div className="c1yo0219 dir dir-ltr">
                <div>
                  <div>
                    <nav className={s.nav_inside}>
                      <div className="_176ugpa">
                        <Link to={`${guestId}/form`} className="nav-link py-2 px-0 px-lg-2">
                          <button className={s.btn_host}>
                            Hospeda nómades
                          </button>
                        </Link>
                      </div>
                      <div className={s.container_btn_icon}>
                          <button
                            className={s.button}
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <TbUserCircle className={s.icon} />
                          </button>
                        <ul
                          className="dropdown-menu dropdown-menu-end show"
                          data-bs-popper="static"
                        >
                          <li>
                            <Link
                              to="/registerguest"
                              className="dropdown-item current"
                            >
                              Registrarse
                            </Link>
                          </li>
                          <li>
                            <Link to="/login" className="dropdown-item">
                              Iniciar sesión
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}
