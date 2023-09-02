import React from 'react'
import web from '../../images/main.svg'
import Category from '../../Components/Category'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <>

            <div className="bg-success bg-opacity-25 font-family" style={{ height: '92vh' }}>
                <div className="container">
                    <div className="row">
                        <div className=" col-md-6  py-5">
                            <div className="p-5 my-5 ">
                                <h1 className='data-text' >Calzanda</h1>
                                <p className='typewriter '>A walk-in-a-park online shopping experience!</p>
                                <Link to="/products"><button className='btn btn-outline-success btn-lg rounded-pill mt-4 w-80'>Shop Now!</button></Link>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <img src={web} alt="hero image" className="img-fluid animated py-5 my-5" />
                        </div>
                    </div>
                </div>
            </div>
            <Category />
        </>
    )
}

export default Home