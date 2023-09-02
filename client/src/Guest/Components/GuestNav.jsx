import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {FaHome  } from 'react-icons/fa'
import {FiLogIn} from 'react-icons/fi'
import {BiCategoryAlt} from 'react-icons/bi'
import {BsFillArchiveFill } from 'react-icons/bs'
import { GlobalContext } from '../../Context/context';

export default function GuestNav() {
    const {state,dispatch}=useContext(GlobalContext)
    return (
        <Navbar expand="lg" className="bg-success bg-opacity-25">
            <Container>
                <Link className='Brand text-decoration-none text-success fw-bold fs-4' to='/'><FaHome /> Calzanda</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to='/login' className='mx-3 text-decoration-none text-dark boldLink '><FiLogIn/> Login</Link>
                        <Link to='/category-guest' className='boldLink mx-3 text-decoration-none text-dark '><BiCategoryAlt/> Category</Link>
                        <Link to='/products' className='boldLink mx-3 text-decoration-none text-dark '><BsFillArchiveFill /> Products</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}