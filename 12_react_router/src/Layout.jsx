import React from 'react'
import Footer from './components/Footer/footer'
import Navbar from './components/Navbar/navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Layout
