import React from 'react'
import AllCards from '../AllCards/AllCards';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className="with-new-header touch">
    <NavBar/>
    <Menu/>
    <AllCards/>
    </div>
  )
}
