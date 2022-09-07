import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  filterByPets,
  filterTypeHouse,
  orderByHigherCost,
  orderByLowerCost,
  orderByRating,
} from "../../Redux/Actions";
import { useDispatch} from "react-redux";
import s from "../Menu/Menu.module.css";
import { TbMap2 } from "react-icons/tb";
import { IoIosStar } from "react-icons/io";
import { CgPlayListRemove } from "react-icons/cg";
import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import Filters from "./Filters/Filters";
export default function Menu({ paging }) {
  const dispatch = useDispatch();
  const [clean, setClean] = useState(false);
  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
  }
  function handleOrderByLowest(e) {
    e.preventDefault();
    dispatch(orderByLowerCost(e.target.value));
  }
  function handleOrderByHighest(e) {
    e.preventDefault();
    dispatch(orderByHigherCost(e.target.value));
  }

  function changeCleaner(e){
    e.preventDefault();
    setClean(true)
    setTimeout(()=>{setClean(false)},2000)
  }
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
          {/* <div>
            <button className={s.button_icon} onClick={handleFilterTypeHouse}>
              <span>
                <GiSpookyHouse className={s.icons} />
                <div>
                  <span className={s.text_desc_icon}>Casa</span>
                </div>
              </span>
            </button>
          </div> */}
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
        <div className="d-flex flex-row gap-2">
          <button type="button" className={s.button_remove} onClick={changeCleaner}>
            <CgPlayListRemove/>
            Remover filtros
          </button>
          <button
            type="button"
            className={s.button_modal}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Filtros
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className={s.modal_content}>
                <Filters clean={clean}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
