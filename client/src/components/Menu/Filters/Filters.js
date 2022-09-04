import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterByQBathrooms,
  filterByQBeds,
  filterByQRooms,
  filterByRangePrice,
  filterByServices,
  filterByTypeRooms,
} from "../../../Redux/Actions";

export default function Filters() {
  const [filter, setFilter] = useState({
    range: 50,
    beds: 0,
    rooms: 0,
    bathrooms: 0,
    lodgingType: ""
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

  useEffect(() => {
    dispatch(filterByRangePrice(filter));
    dispatch(filterByQBeds(filter));
    dispatch(filterByQRooms(filter));
    dispatch(filterByQBathrooms(filter));
    dispatch(filterByTypeRooms(filter));
  }, [filter, services]);
  useEffect(() => {
    dispatch(filterByServices(services))
  }, [services]);
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
    const {value, checked} = e.target
    setServices({
      ...services, [e.target.value]:checked
    })
    console.log(value, checked)
  }
  return (
    <div>
      <div>
        Rango de precios
        <input
          type="range"
          className="form-range"
          min="0"
          max="500"
          step="1"
          onChange={handleChangeRange}
        ></input>
        <div>
          <span>De 0 </span> <span>a {`${filter.range}`} USD</span>
        </div>
      </div>
      <div>
        Cantidad de...
        <div>
          <div>Camas</div>
          <div>
            <button value="1" onClick={handleChangeQBeds}>
              1
            </button>
            <button value="2" onClick={handleChangeQBeds}>
              2
            </button>
            <button value="3" onClick={handleChangeQBeds}>
              3
            </button>
            <button value="4" onClick={handleChangeQBeds}>
              +4
            </button>
          </div>
          <div>Recámaras</div>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <button value="1" onClick={handleChangeQRooms}>
              1
            </button>
            <button value="2" onClick={handleChangeQRooms}>
              2
            </button>
            <button value="3" onClick={handleChangeQRooms}>
              3
            </button>
            <button value="4" onClick={handleChangeQRooms}>
              +4
            </button>
          </div>
          <div>Baños</div>
          <div className="btn-group">
            <button value="1" onClick={handleChangeQBathrooms}>
              1
            </button>
            <button value="2" onClick={handleChangeQBathrooms}>
              2
            </button>
            <button value="3" onClick={handleChangeQBathrooms}>
              3
            </button>
            <button value="4" onClick={handleChangeQBathrooms}>
              +4
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>Tipo de propiedad</div>
        <div className="btn-group">
          <button name="Casa" onClick={handleChangeTypeProperty}>
            Casa
          </button>
          <button name="Albergue" onClick={handleChangeTypeProperty}>
            Albergue
          </button>
          <button name="Hostal" onClick={handleChangeTypeProperty}>
            Hostal
          </button>
          <button name="Cabaña" onClick={handleChangeTypeProperty}>
            Cabaña
          </button>
          <button name="Apartamento" onClick={handleChangeTypeProperty}>
            Apartamento
          </button>
          <button name="Habitación" onClick={handleChangeTypeProperty}>
            Habitación
          </button>
        </div>
      </div>
      <div>
        <div>Servicios</div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="services"
            value="wifi"
            checked={services.wifi}
            onChange={handleCheckBoxes}
          />
          <label className="form-check-label" for="inlineCheckbox1">
            Wifi
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="services"
            value="ac"
            checked={services.ac}
            onChange={handleCheckBoxes}
          />
          <label className="form-check-label" for="inlineCheckbox2">
            AC
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="services"
            value="tv"
            checked={services.tv}
            onChange={handleCheckBoxes}
          />
          <label className="form-check-label" for="inlineCheckbox1">
            TV
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="services"
            value="parking"
            checked={services.parking}
            onChange={handleCheckBoxes}
          />
          <label className="form-check-label" for="inlineCheckbox2">
            Estacionamiento
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="services"
            value="hotWater"
            checked={services.hotWater}
            onChange={handleCheckBoxes}
          />
          <label className="form-check-label" for="inlineCheckbox2">
            Agua caliente
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="services"
            value="pets"
            checked={services.pets}
            onChange={handleCheckBoxes}
          />
          <label className="form-check-label" for="inlineCheckbox2">
            Mascotas
          </label>
        </div>
      </div>
    </div>
  );
}
