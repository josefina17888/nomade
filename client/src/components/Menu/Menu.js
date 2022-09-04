import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  filterByPets,
  filterTypeHouse,
  orderByHigherCost,
  orderByLowerCost,
  orderByRating,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../Menu/Menu.module.css";
import { TbMap2 } from "react-icons/tb";
import { GiSpookyHouse } from "react-icons/gi";
import { IoIosStar } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";
import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import Filters from "./Filters/Filters";
export default function Menu({
  setCurrentPage,
  paging,
  lodgingsPerPage,
  currentLodging,
}) {
  const allLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();
  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
  }

  //Ordernar por Lodging tipo: Casa
  function handleFilterTypeHouse(e) {
    e.preventDefault();
    dispatch(filterTypeHouse(e.target.value));
    paging(1);
  }
  function handleFilterByPets(e) {
    e.preventDefault();
    dispatch(filterByPets(e.target.value));
    paging(1);
  }
  function handleOrderByLowest(e) {
    e.preventDefault();
    dispatch(orderByLowerCost(e.target.value));
  }
  function handleOrderByHighest(e) {
    e.preventDefault();
    dispatch(orderByHigherCost(e.target.value));
  }

  // function handleSortByRating(e) {
  //   e.preventDefault()
  //   dispatch(orderByRating(e.target.value))
  // }

  return (
    <div className="n1p4yt3r dir dir-ltr">
      <div className={s.container}>
        <Link to="/map" style={{ textDecoration: "none" }}>
          <button className={s.button_icon}>
            <TbMap2 className={s.icons} />
            <div className={s.text_desc_icon}>Mapa</div>
          </button>
        </Link>
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
            <button className={s.button_icon} onClick={handleSortByRating}>
              <span>
                <IoIosStar className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Rating</span>
                </div>
              </span>
            </button>
          </div>
          <div>
            <button className={s.button_icon} onClick={handleFilterByPets}>
              <span>
                <MdOutlinePets className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Mascotas</span>
                </div>
              </span>
            </button>
          </div>
          <div>
            <button className={s.button_icon} onClick={handleOrderByLowest}>
              <span>
                <TbTrendingUp className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Costo</span>
                </div>
              </span>
            </button>
          </div>
          <div>
            <button className={s.button_icon} onClick={handleOrderByHighest}>
              <span>
                <TbTrendingDown className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Costo</span>
                </div>
              </span>
            </button>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Filtros
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Filtros
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                    <Filters/>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Quitar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
