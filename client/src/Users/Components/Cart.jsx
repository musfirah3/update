import React, { useContext, useState } from 'react'
import bag from '../images/shopping.png'

import { BsFillTrashFill } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { CartContext } from '../context/CartContext/context'

import CartModal from './CartModal'

export default function Cart() {

    const { cart_state, cart_dispatch } = useContext(CartContext)
   
   

    // Create a state array for product quantities
    const [productQuantities, setProductQuantities] = useState(
        cart_state.cart.map(product => product.productQuantity)
    );

    const total = cart_state.cart.reduce((accumulator, product, index) => {
        return accumulator + (product.price * productQuantities[index]);
    }, 0);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedQuantities = [...productQuantities];
        updatedQuantities[index] = newQuantity;
        setProductQuantities(updatedQuantities);
    };

    const handleProductDelete = async (index) => {
        try {
            cart_dispatch({
                type: "REMOVE_ITEM",
                payload: cart_state.cart[index]._id
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    } 

    
    


    return (
        <>
            <div className="container">
                <div className="text-center my-3">
                    <h2><img src={bag} alt="" style={{ height: '8vh' }} />Goods in Your Bag</h2>
                    <small className="text-secondary">Welcome to your shopping bag, where all your chosen items await their journey to your doorstep.<TbTruckDelivery /></small>
                </div>

                <div className="p-5 mb-4 rounded bg-success bg-opacity-75">
                    {cart_state.cart.map((val, index) => (
                        <div className="card mb-3 w-100" key={index}>
                            <div className="row g-0">
                                <div className="col-md-2 d-flex justify-content-center align-items-center">
                                    <img src={val.thumbnail} style={{ height: '10vh', objectFit: 'contain' }} className="img-fluid rounded-start" alt={val.title} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{val.title} - {val.price} $ </h5>
                                        <p className="card-text">{val.description}</p>
                                        <div className="my-3 d-flex align-items-center">
                                            <button
                                                className="btn btn-light mx-3"
                                                disabled={productQuantities[index] > 1 ? false : true}
                                                onClick={() => handleQuantityChange(index, productQuantities[index] - 1)}
                                            >
                                                <AiOutlineMinus />
                                            </button>
                                            {productQuantities[index]}
                                            <button
                                                className="btn btn-light mx-3"
                                                onClick={() => handleQuantityChange(index, productQuantities[index] + 1)}
                                            >
                                                <AiOutlinePlus />
                                            </button>
                                            <span className='text-danger'>
                                                <BsFillTrashFill onClick={() => handleProductDelete(index)} />
                                            </span>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <h5 className="card-title text-center pt-5">{productQuantities[index] * val.price}</h5>

                                </div>

                            </div>

                        </div>
                    ))}
                    <div className="border border-dark border-3 bg-light px-5 py-3 rounded d-flex justify-content-around align-items-center">
                        <h6>Total</h6>
                        <div>{total}</div>
                    </div>
                    <div className="container mt-3">
                        <CartModal total={total} items={cart_state.cart} />
                    </div>
                </div>
            </div >
          
            </>
            )
}
