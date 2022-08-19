import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import s from '../NavBar/NavBar.module.css'

export default function NavBar() {
    return (
      <React.Fragment>
        <nav className={s.container}>
              <ul>
                  Nomade
              </ul>
              <ul>
                  <SearchBar/>
              </ul>
              <ul>
                  Hospeda un nómade
              </ul>
              <ul>
                  Icon
              </ul>
        </nav>
      </React.Fragment>
    );
  }