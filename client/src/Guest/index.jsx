import React from 'react'
import LoginProject from '../Guest/form/LoginProject'
import Signup from '../Guest/form/Signup'
import { Route, Routes } from "react-router-dom";
import GuestNav from './Components/GuestNav';
import GuestHome from './pages/GuestHome';
import GuestFooter from './Components/GuestFooter';
import CategoryGuest from './Components/CategoryGuest'; 
import Products from '../Users/assets/pages/Home/Products'

function Guest() {
  return (
    <>
      <GuestNav />
      <Routes>
        <Route path='/' element={<GuestHome />} />
        <Route path='/login' element={<LoginProject />} />
        <Route path='*' element={<LoginProject />} />
        <Route path='/signIn' element={<Signup />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/category-guest' element={<CategoryGuest />} />
      </Routes>
      <GuestFooter />
    </>
  )
}

export default Guest