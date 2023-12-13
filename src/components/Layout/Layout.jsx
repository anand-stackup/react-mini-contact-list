import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'

const Layout = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </div>
  )
}

export default Layout