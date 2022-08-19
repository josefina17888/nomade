import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLodgings, orderPrice, setLoaderFalse, setLoaderTrue } from '../../Redux/Actions/index';
import AllCardsPaging from './AllCardsPaging/AllCardsPaging';
import Card from '../Card/Card'
import { Link } from 'react-router-dom';
import styles from './AllCards.module.css'

export default function AllCards() {
  
  let stateLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);// guardar en estado local la página actual
  const [lodgingPerPage, setLodgingPerPage] = useState(20);// setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = stateLodgings.slice(indexFirstLodging, indexLastLodging);
  const loader = useSelector((state) => state.loader);
  const [order, setOrder] = useState('')

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getLodgings());
  }, [dispatch]) 

    //order price
  function handleOrderPrice (e){
    e.preventDefault();
    dispatch(orderPrice(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  return (
    <div>
    <div>AllCards</div>
    <div className={styles.paging}>
      <h3>Ordenar por costo</h3>
        <select onClick={e => handleOrderPrice(e)}>
            <option value= 'lowest'>Más barato a más costoso</option>
            <option value= 'highest'>Más costoso a más barato</option>
        </select>
    </div>
    <div className={styles.paging}>
        <div>
          { !loader ? <AllCardsPaging
          lodgingPerPage= {lodgingPerPage}
          stateLodgings={stateLodgings.length}
          paging = {paging} /> : null
          }
        </div>
        <div>
            { loader ? (<h2>Loading...</h2>) : 
            currentLodging.length < 1 ? <h2>No se encontraron alojamientos</h2> : 
            currentLodging.map((e) => {
                return (
                <div key={e.lodgingId}>
                    <Link to={`/api/lodging/${e.lodgingId}`}>
                        <Card
                        lodgingType={e.lodgingType}
                        price={e.price}
                        guests={e.guests}
                        description={e.description}/>
                    </Link>
                </div>)})
            }
            </div>
        </div>
        </div>
  )
}


   