import React from 'react'
import { FaHome } from 'react-icons/fa'
import { AiFillPhone } from 'react-icons/ai'
import { BsFillEnvelopeAtFill } from 'react-icons/bs'
import { AiFillPrinter } from 'react-icons/ai'


function GuestFooter() {
  return (
    <>
      <footer className='bg-success  bg-opacity-25 pt-5 pb-4'>
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h3 className='mb-4 font-weight-bold text-success'>Calzanda</h3>
              <p>A walk-in-a-park online shopping experience!</p>

            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className='text-uppercase mb-4 font-weight-bold text-success '>Products</h5>
              <p>
                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>The Providers</a>
              </p>
              <p>
                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Creativity</a>
              </p>
              <p>


                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Consumer Cares</a>
              </p>
              <p>
                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Food Services</a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className='text-uppercase mb-4 font-weight-bold text-success'>informations</h5>


              <p>
                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Terms & Conditions</a>
              </p>
              <p>
                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Return & Exchange</a>
              </p>
              <p>


                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Shipping & Delivery</a>
              </p>
              <p>
                <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>Private Policy</a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className='text-uppercase mb-4 font-weight-bold text-success'>Contact</h5>

              <p>
                <span className='mr-3'><FaHome /> Karachi,74600,Pak</span>
              </p>

              <p>
                <span className='mr-3'><AiFillPhone /> +92-23456789</span>
              </p>

              <p>
                <span className='mr-3'><AiFillPrinter /> +01-335 633 77</span>
              </p>

              <p>
                <span className='mr-3'><BsFillEnvelopeAtFill />calzanda@gmail.com</span>
              </p>
            </div>
            <hr className='mb-4' />
            <div className="row align-items-center">
              <div className="col">
                <p>Copyright &copy; 2023 All rights reserved by:
                  <a href="" className='text-decoration-none'><strong className="text-success"> Calzanda</strong></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default GuestFooter