import React from 'react'
import AllCards from '../AllCards/AllCards';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
    <NavBar/>
    <SearchBar />
    <Menu/>
    <AllCards/>
    </div>
  )
}
