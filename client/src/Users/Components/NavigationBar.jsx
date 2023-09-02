import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FcShop } from 'react-icons/fc';
import { FaHome } from 'react-icons/fa'
import { BsFillBoxSeamFill } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaSignOutAlt } from 'react-icons/fa';
import { GlobalContext } from '../../Context/context';
import { CartContext } from '../context/CartContext/context'
import { decodeToken } from 'react-jwt'
import Cookies from 'js-cookie';
import { Badge} from 'antd'



function NavigationBar() {
  const { state, dispatch } = useContext(GlobalContext)
  const { cart_state, cart_dispatch } = useContext(CartContext);
  const user = decodeToken(state.token)


  return (

    <Navbar expand="lg" className="bg-success bg-opacity-25">
      <Container>
        <Link to="/" className='Brand text-decoration-none text-success fw-bold fs-4'><span className='largeNavIcon'><FcShop /></span>Calzanda</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <div className='d-flex align-items-center'>
              <Link to="/" className='mx-3 text-decoration-none text-dark'><FaHome /> Home</Link>
              <Link to="/products" className='mx-3 text-decoration-none text-dark'><BsFillBoxSeamFill /> Products</Link>
            </div>
          </Nav>


          <div className="d-flex gap-3">
            <Link to='/profile' className="btn d-flex align-items-center gap-3">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" style={{ height: '3vh', objectFit: 'contain' }} alt="" />
              {user.username}
            </Link>
            <Link to='/cart' className='btn'>
              <Badge count={cart_state.cart.length} offset={[10, 0]}>
                <AiOutlineShoppingCart /> Cart
              </Badge>

            </Link>
            <button className="btn"
              onClick={() => {
                Cookies.remove('token')
                dispatch({ type: "USER_LOGOUT" })
              }}

            ><FaSignOutAlt /> Sign Out</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavigationBar