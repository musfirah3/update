import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  
  return (
    <>

  <section className="page_404">
          <div className="container">
            <div className="row"> 
              <div className="col-sm-12 ">
                <div className="col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center text-success">404</h1>
                  </div>
                  <div className="contant_box_404">
                  <h4 className='text-success'>UH OH! You're lost.</h4>
     <p className='text-secondary'>The page you are looking for does not exist.How you get here is a mystery.But you can click the button to go back the homepage.</p>
                    <Link to='/'><button className="link_404">Go to Home</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
  )
}

export default ErrorPage