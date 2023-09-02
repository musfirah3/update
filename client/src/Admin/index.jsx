import React from 'react'
import Home from './Pages/Home/Home'
import Category from './Pages/Category'
import Sidebar from './Components/Sidebar'
import Calendar from './Pages/Calendar/Calendar'
import { Route, Routes, } from "react-router-dom";
import TrelloBoard from './Pages/TrelloBoard/index'

function Admin() {
  return (
    <>
      <div className="row m-0 p-0"style={{ backgroundColor: '#263043', color: '#9e9ea4' }} >
        <div className="col-md-3 m-0 p-0 ">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/board" element={<TrelloBoard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Admin