import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext/context'
import { GlobalContext } from '../../Context/context'
import { decodeToken } from 'react-jwt'
import Loader from './Loader'
import axios from 'axios'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
// import { AppRoute } from '../../App';


function CartModal({ total, items }) {

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { cart_state, cart_dispatch } = useContext(CartContext)
  const [address, setAddress] = useState()
  const [contact, setContact] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { state, dispatch } = useContext(GlobalContext)
  const user = state.token ? decodeToken(state.token) : null;
  const [productQuantities, setProductQuantities] = useState(
    cart_state.cart.map(product => product.productQuantity)
  );



  const Checkout = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Confirm Checkout',
      text: 'Are you sure you want to proceed with the checkout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setAddress("")
        setContact("")
        const payload = {
          items: cart_state.cart,
          totalBill: total,
          customerAddress: address,
          customerContact: contact,
          customerName: user.username,
          customerEmail: user.email
        }
        axios.post('/api/create-order', payload).then(json => {
          console.log(json.data);
          setLoading(false)
          Swal.fire('Order Placed!', 'Your order has been placed successfully.', 'success');


          cart_dispatch(
            {
              type: "CLEAR_CART"
            }
          )

          setAddress("");
          setContact("");

        })
          .catch(error => { console.error(error); });
      }
    })
  }

  return (
    <>
      <button className="d-block w-100 btn btn-light " onClick={handleShow}>CheckOut</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={Checkout}>
            <div className="mb-3">
              <label className="form-label">Customer Email:</label>
              <div>{user.email}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Customer Name:</label>
              <div>{user.username}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Customer address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Customer contact number
              </label>
              <input
                type="number"
                className="form-control"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Total Bill:</label>
              <div>{total}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Items:</label>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item.title} - Quantity: {productQuantities[index]} - Total: {productQuantities[index] * item.price}
                  </li>
                ))}
              </ul>
            </div>
            <button className='btn btn-outline-success mt-3' type='submit' onClick={handleClose}> Confrim Your order</button>
          </form>

        </Modal.Body>

      </Modal>

      {loading ? <Loader /> : null}

    </>
  );
}

export default CartModal;