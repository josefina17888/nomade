import React from 'react'
import Content from './Content'
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'


export default function AdminDash() {
  return (
    <div>
        <Header/>
        <Aside/>
        <Content/>
        <Footer/>
    </div>
  )
}
