import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import {GlobalContext} from '../../Context/context'
import {
    BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation()
    const {state,dispatch}=useContext(GlobalContext)
    const NavItems = [
        {
            tab: 'Dashboard',
            url: '/',
            icon: <BsGrid1X2Fill />

        },
        {
            tab: 'Products',
            url: '/product',
            icon: <BsFillArchiveFill />
        },
        {
            tab: 'Categories',
            url: '/category',
            icon: <BsFillGrid3X3GapFill />
        },
        {
            tab: 'Customers',
            url: '/customer',
            icon: <BsPeopleFill />
        },
        {
            tab: 'Trello board',
            url: '/board',
            icon: <BsListCheck />
        },
        {
            tab: 'Calendar',
            url: '/calendar',
            icon: <BsMenuButtonWideFill />
        },
        {
            tab: 'Setting',
            url: '/setting',
            icon: <BsFillGearFill />
        }
    ]
    


    return (
        <>

            <div className=' p-3 d-flex justify-content-between align-items-center fs-5' style={{ backgroundColor: '#1d2634' }}>
                <span>Admin Name</span>
                <button className='btn btn-outline-warning' onClick={()=>{
                    Cookies.remove('token')
                    dispatch({type:"USER_LOGOUT"})
                }}>Logout</button>
            </div>

            <ul className="nav flex-column pt-3">
                {
                    NavItems.map((item) => (
                        <li key={item.tab} className={`nav-items m-2 ${location.pathname == item.url ? 'bg-dark rounded bg-opacity-50' : null}`}>
                            <Link to={item.url} className='nav-link d-flex align-items-center gap-2 fs-5' style={{ color: '#9e9ea4' }}>
                                <span>{item.icon}</span>
                                <span>{item.tab}</span>

                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default Sidebar