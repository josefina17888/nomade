import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLodgings, setLoaderFalse, setLoaderTrue } from '../../Redux/Actions/index';
import AllCardsPaging from './AllCardsPaging/AllCardsPaging';
import Card from '../Card/Card'
import { Link } from 'react-router-dom';

export default function AllCards() {
  
  let stateLodgings = useSelector((state) => state.lodgings);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);// guardar en estado local la página actual
  const [lodgingPerPage, setLodgingPerPage] = useState(20);// setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = stateLodgings.slice(indexFirstLodging, indexLastLodging);
  const loader = useSelector((state) => state.loader);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber)
}

  useEffect(() => {
    dispatch(getLodgings());
    }, [dispatch]) 

  return (
    <div>
    <div>AllCards</div>
    <div>
        <div>
          { !loader ? <AllCardsPaging
          lodgingPerPage= {lodgingPerPage}
          stateLodgings={stateLodgings.length}
          paging = {paging} /> : null
          }
        </div>
        <div>
            { loader ? (<h2>Loading...</h2>) : 
            currentLodging.length < 1 ? <h2>No lodgings were found</h2> : 
            currentLodging.map((e) => {
                return (
                <div key={e.id}>
                    <Link to={`/api/lodging/${e.id}`}>
                        <Card/>
                    </Link>
                </div>)})
            }
            </div>
        </div>
        </div>
  )
}


   