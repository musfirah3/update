import React, { useEffect, useState } from 'react'
import GuestCards from './GuestCards'
import { Spin } from 'antd'
import axios from 'axios'
import { TbCategory2 } from 'react-icons/tb'
// import { AppRoute } from '../../App';

export default function CategoryGuest() {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([])
    useEffect(() => {
        setLoading(true);
        axios.get('/api/all-categories')
            .then((json) => {
                setCategory(json.data.category)
                setLoading(false)
            })
            .catch(err => alert(err.message))

    }, [])
    if (loading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '80vh' }}>
            <Spin tip="Loading..." size="large">
                <div className="content" />
            </Spin>
        </div>
    }
    return (
        <div className="container my-5">
            <div className="text-center">
                <h2>Realm of Wonders <TbCategory2 /></h2>
                <small className="text-secondary">Elevate Your Shopping Experience with the Extraordinary</small>
            </div>

            <div className="row my-5">
                {
                    category?.map((val, key) => <GuestCards key={key} image={val.categoryImage} name={val.categoryName} />)
                }

            </div>
        </div>
    )
}