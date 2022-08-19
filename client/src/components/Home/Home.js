import React from 'react'
import AllCards from '../AllCards/AllCards';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
    <NavBar/>
    <Menu/>
    <AllCards/>
    </div>
  )
}
