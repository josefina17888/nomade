import React from 'react'
import AllCards from '../AllCards/AllCards';
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
    <div>Home</div>
    <AllCards />
    </div>
  )
}
