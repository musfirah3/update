import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactStars from 'react-stars';
import Swal from 'sweetalert2'

function EditReview(props) {
    const [review, setReview] = useState("")
    const [ratingstar, setratingStar] = useState(0)
    const ratingChanged = (newRating) => {
        setratingStar(newRating)
    }

    const [show, setShow] = useState(false);
    const submitReview = () => {
        setShow(false)
        Swal.fire({
            title: 'Successfully Submitted!',
            text: 'Thanks for reviewing our product',
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        })

        const payload = {
            productID: productID,
            review: review,
            rating: ratingstar
        }
        console.log(payload)




    }

    const handleClose = () => {
        setShow(false)

        Swal.fire({
            title: 'Successfully Submitted!',
            text: 'Thanks for reviewing our product',
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        })
    }
        ;
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-outline-success ' onClick={handleShow}>Review</button>


            <Modal
                {...props}
                show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <h2 id="contained-modal-title-vcenter" className='text-success fw-bold'>Review Your Thoughts..</h2>

                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating">
                        <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: 100 }}
                            defaultValue={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <label htmlFor="floatingTextarea2" className='text-secondary'>Share your thoughts about product...</label>
                    </div>

                    <div className='mt-2 text-secondary'>

                        Rate Us :
                        <div className="d-flex align-items-center ">
                            <ReactStars
                                count={5}
                                size={24}
                                value={ratingstar}
                                onChange={ratingChanged}
                                color2={'#ffd700'}
                            />

                            <span className='ms-3'>({ratingstar})</span>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className='my-3 btn btn-outline-success' onClick={handleClose}>
                        Close
                    </button>
                    <button className='my-3 btn btn-outline-success' onClick={submitReview}>Submit review</button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditReview