import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilters,
  filterByQBathrooms,
  filterByQBeds,
  filterByQRooms,
  filterByRangePrice,
  filterByServices,
  filterByTypeRooms,
} from "../../../Redux/Actions";
import s from "../Filters/Filters.module.css";
import { CgPlayListRemove } from "react-icons/cg";
import { IoCheckmarkDoneOutline, IoBed } from "react-icons/io5";
import {
  MdMeetingRoom,
  MdWc,
  MdOtherHouses,
  MdApartment,
} from "react-icons/md";
import { GiWoodCabin, GiHouse } from "react-icons/gi";
import { TbBuildingWarehouse } from "react-icons/tb";

export default function Filters({clean}) {
  const [filter, setFilter] = useState({
    range: 0,
    beds: 0,
    rooms: 0,
    bathrooms: 0,
    lodgingType: "",
    wifi: false,
    ac: false,
    tv: false,
    parking: false,
    pets: false,
    hotWater: false,
  });
  const [services, setServices] = useState({
    wifi: false,
    ac: false,
    tv: false,
    parking: false,
    pets: false,
    hotWater: false,
  });
  const dispatch = useDispatch();
  const allLodgings = useSelector((state) => state.lodgings);
  const filtered = allLodgings.filter((e) => e.Visibility === true);

  useEffect(() => {
    dispatch(filterByRangePrice(filter));
    dispatch(filterByQBeds(filter));
    dispatch(filterByQRooms(filter));
    dispatch(filterByQBathrooms(filter));
    dispatch(filterByTypeRooms(filter));
    dispatch(filterByServices(filter));
  }, [filter]);
  /* useEffect(() => {
  }, [services]); */
  useEffect(()=>{
    if(clean){
      setFilter({
        range: 0,
        beds: 0,
        rooms: 0,
        bathrooms: 0,
        lodgingType: "",
        wifi: false,
        ac: false,
        tv: false,
        parking: false,
        pets: false,
        hotWater: false,
      });
      dispatch(cleanFilters());
    }
  })

  function handleChangeRange(e) {
    setFilter({ ...filter, range: e.target.value });
  }

  function handleChangeQBeds(e) {
    setFilter({
      ...filter,
      beds: e.target.value,
    });
  }
  function handleChangeQRooms(e) {
    setFilter({
      ...filter,
      rooms: e.target.value,
    });
  }
  function handleChangeQBathrooms(e) {
    setFilter({
      ...filter,
      bathrooms: e.target.value,
    });
  }

  function handleChangeTypeProperty(e) {
    console.log(e.target.name);
    setFilter({
      ...filter,
      lodgingType: e.target.name,
    });
  }

  function handleCheckBoxes(e) {
    const { value, checked } = e.target;
    setFilter({
      ...filter,
      [e.target.value]: checked,
    });
  }

  function stateCleaner(e) {
    e.preventDefault();
    setServices({
      wifi: false,
      ac: false,
      tv: false,
      parking: false,
      pets: false,
      hotWater: false,
    });
    setFilter({
      range: 0,
      beds: 0,
      rooms: 0,
      bathrooms: 0,
      lodgingType: "",
      services: services,
    });

    dispatch(cleanFilters());
  }
  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Filtros
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <div className={s.container_range_price}>
          <div className={s.title_filters}>Rango de precios</div>
          <div className={s.container_range_span}>
            <input
              type="range"
              className={s.form_range}
              min="0"
              max="350"
              step="1"
              onChange={handleChangeRange}
              defaultValue="0"
            ></input>
            <span>De 0 a {`${filter.range}`} USD</span>
          </div>
        </div>
        <div className={s.container_range_price}>
          <div className={s.title_filters}>Cantidad de...</div>
          <div>
            <div className={s.container_icons_quantity}>
              <IoBed />
              Camas {filter.beds !== 0 ? `${filter.beds}` : ``}
            </div>
            <div
              className="btn-group mb-2 top-50 start-50 translate-middle btn-group-sm"
              role="group"
            >
              <button
                className="btn btn-outline-secondary"
                value="1"
                onClick={handleChangeQBeds}
              >
                1
              </button>
              <button
                className="btn btn-outline-secondary"
                value="2"
                onClick={handleChangeQBeds}
              >
                2
              </button>
              <button
                className="btn btn-outline-secondary"
                value="3"
                onClick={handleChangeQBeds}
              >
                3
              </button>
              <button
                className="btn btn-outline-secondary"
                value="4"
                onClick={handleChangeQBeds}
              >
                4
              </button>
            </div>
            <div className={s.container_icons_quantity}>
              <MdMeetingRoom />
              Recámaras {filter.rooms !== 0 ? `${filter.rooms}` : ``}
            </div>
            <div
              className="btn-group mb-2 top-50 start-50 translate-middle btn-group-sm"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <button
                className="btn btn-outline-secondary"
                value="1"
                onClick={handleChangeQRooms}
              >
                1
              </button>
              <button
                className="btn btn-outline-secondary"
                value="2"
                onClick={handleChangeQRooms}
              >
                2
              </button>
              <button
                className="btn btn-outline-secondary"
                value="3"
                onClick={handleChangeQRooms}
              >
                3
              </button>
              <button
                className="btn btn-outline-secondary"
                value="4"
                onClick={handleChangeQRooms}
              >
                4
              </button>
            </div>
            <div className={s.container_icons_quantity}>
              <MdWc /> Baños{" "}
              {filter.bathrooms !== 0 ? `${filter.bathrooms}` : ``}
            </div>
            <div
              className="btn-group mb-2 top-50 start-50 translate-middle btn-group-sm"
              role="group"
            >
              <button
                className="btn btn-outline-secondary"
                value="1"
                onClick={handleChangeQBathrooms}
              >
                1
              </button>
              <button
                className="btn btn-outline-secondary"
                value="2"
                onClick={handleChangeQBathrooms}
              >
                2
              </button>
              <button
                className="btn btn-outline-secondary"
                value="3"
                onClick={handleChangeQBathrooms}
              >
                3
              </button>
              <button
                className="btn btn-outline-secondary"
                value="4"
                onClick={handleChangeQBathrooms}
              >
                4
              </button>
            </div>
          </div>
        </div>
        <div className={s.container_range_price}>
          <div className={s.title_filters}>Tipo de alojamiento</div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-outline-secondary"
              name="Casa"
              onClick={handleChangeTypeProperty}
            >
              <GiHouse />
              Casa
            </button>
            <button
              className="btn btn-outline-secondary"
              name="Albergue"
              onClick={handleChangeTypeProperty}
            >
              <MdOtherHouses />
              Albergue
            </button>
            <button
              className="btn btn-outline-secondary"
              name="Hostal"
              onClick={handleChangeTypeProperty}
            >
              <TbBuildingWarehouse />
              Hostal
            </button>
            <button
              className="btn btn-outline-secondary"
              name="Cabaña"
              onClick={handleChangeTypeProperty}
            >
              <GiWoodCabin />
              Cabaña
            </button>
            <button
              className="btn btn-outline-secondary"
              name="Apartamento"
              onClick={handleChangeTypeProperty}
            >
              <MdApartment />
              Apartamento
            </button>
            <button
              className="btn btn-outline-secondary"
              name="Habitación"
              onClick={handleChangeTypeProperty}
            >
              <MdMeetingRoom />
              Habitación
            </button>
          </div>
        </div>
        <div className={s.container_range_price}>
          <div className={s.title_filters}>Servicios</div>
          <div className={s.container_services}>
            <div className={s.subcontainer_services}>
              <div className={s.container_check}>
                <input
                className={s.check_box}
                  type="checkbox"
                  name="services"
                  value="wifi"
                  checked={filter.wifi}
                  onChange={handleCheckBoxes}
                  id="checkWifi"
                />
                <label for="checkWifi">
                  Wifi
                </label>
              </div>
              <div className={s.container_check}>
                <input
                  type="checkbox"
                  name="services"
                  value="ac"
                  checked={filter.ac}
                  onChange={handleCheckBoxes}
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  AC
                </label>
              </div>
              <div className={s.container_check}>
                <input
                  type="checkbox"
                  name="services"
                  value="tv"
                  checked={filter.tv}
                  onChange={handleCheckBoxes}
                />
                <label className="form-check-label" for="inlineCheckbox1">
                  TV
                </label>
              </div>
            </div>
            <div className={s.subcontainer_services}>
              <div className={s.container_check}>
                <input
                  type="checkbox"
                  name="services"
                  value="parking"
                  checked={filter.parking}
                  onChange={handleCheckBoxes}
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  Estacionamiento
                </label>
              </div>
              <div className={s.container_check}>
                <input
                  type="checkbox"
                  name="services"
                  value="hotWater"
                  checked={filter.hotWater}
                  onChange={handleCheckBoxes}
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  Agua caliente
                </label>
              </div>
              <div className={s.container_check}>
                <input
                  type="checkbox"
                  name="services"
                  value="pets"
                  checked={filter.pets}
                  onChange={handleCheckBoxes}
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  Mascotas
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.modal_footer}>
        <button
          type="button"
          className={s.button_remove}
          onClick={stateCleaner}
        >
          <CgPlayListRemove />
          Remover filtros
        </button>
        <button type="button" className={s.button_show} data-bs-dismiss="modal">
          Mostrar {`${filtered.length}`} alojamientos <IoCheckmarkDoneOutline />
        </button>
      </div>
    </div>
  );
}
