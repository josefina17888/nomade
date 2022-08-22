import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AllCards from '../AllCards/AllCards';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css'

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div className="c1kae56o dir dir-ltr">
    <NavBar/>
    <Menu/>
    <AllCards/>
    </div>
  )
}
