import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import ReactStars from 'react-stars'
import Swal from 'sweetalert2'
import ImageSection from '../pages../../../Components/ImageSection'
import { Typography } from 'antd'
import { TbTruckDelivery } from 'react-icons/tb'
import { TbReplace } from 'react-icons/tb'
import { BiShieldQuarter } from 'react-icons/bi'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { GiBrokenShield } from 'react-icons/gi'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import EditReview from '../../Components/EditReview'
import { CartContext } from '../../context/CartContext/context'
// import { AppRoute } from '../../../App';


export default function ProductPage() {
    const [loading, setLoading] = useState(false);
    const { productID } = useParams()
    const [product, setproduct] = useState({})
    const [productQuantity, setproductQuantity] = useState(1)
    const { cart_state, cart_dispatch } = useContext(CartContext)


    const addtoCart = (item) => {
        const totalPrice = productQuantity * item.price
        const payload = { ...product, productQuantity, totalPrice }
        console.log(payload)
        cart_dispatch({
            type: "ADD_TO_CART",
            payload
        })
        Swal.fire({
            title: 'Added to Cart!',
            text: 'Check your Cart for Checkout',
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        });
    };



    useEffect(() => {
        setLoading(true)
        axios.get(`/api/product/${productID}`)
            .then((json) => {
                setproduct(json.data.product)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '80vh' }}>
            <span className="loader"></span>
        </div>
    }
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mt-3">

                        {
                            product?.images?.length > 0 && <ImageSection images={product.images} />
                        }

                    </div>


                    <div className="col-lg-6">

                        <div className="container mt-5">

                            <h3 className='text-success fw-bold fs-2'>{product.title}</h3>
                            <p className=' text-secondary '>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    edit={false}
                                    value={product.rating}
                                    color2={'#ffd700'}
                                />  ({product.rating} customer reviews)
                            </p>
                            <Typography.Paragraph className='fs-5 text-success fw-bold'>
                                Deal of the Day: ${product.price}{" "}
                                <Typography.Text delete type='danger'>
                                    MRP: $
                                    {parseFloat(product.price +
                                        (product.price * product.discountPercentage) / 100).toFixed(2)}
                                </Typography.Text>
                            </Typography.Paragraph>

                            <p className="text-secondary">{product.description}</p>

                            <div className="d-flex justify-content-between"></div>
                            <p className="d-flex justify-content-around"><TbTruckDelivery /> <TbReplace /><GiBrokenShield /><BiShieldQuarter /><AiOutlineFieldTime /></p>
                            <p className="d-flex justify-content-around text-secondary fontP"><span>Free delivery</span> <span>30 Days replacement</span> <span>Handle with care</span><span>2 Years warranty</span> <span>On time</span></p>
                            <hr />

                            <p className=' text-secondary'>Availabe: <strong>{product.stock} are in stocks</strong></p>
                            <p className=' text-secondary'>Product ID: <strong>{product._id}</strong></p>
                            <p className=' text-secondary'>Brand: <strong>{product.brand}</strong></p>

                            <hr className='hr-bw' />


                            <div className="my-3 d-flex align-items-center">
                                <button className="btn btn-light mx-3" disabled={productQuantity > 1 ? false : true} onClick={() => setproductQuantity(productQuantity - 1)}><AiOutlineMinus /></button>
                                {productQuantity}
                                <button className="btn btn-light mx-3" onClick={() => setproductQuantity(productQuantity + 1)}><AiOutlinePlus /></button>
                            </div>

                            <Link><button className='btn-space btn btn-outline-success' disabled={cart_state.cart.some(item => item._id === product._id)} onClick={() => addtoCart(product)}>Add to Cart</button></Link>
                            <EditReview />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}