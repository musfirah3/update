import React from 'react'
import css from './Orders.module.css'
import {groupNumber,ordersData} from '../../data/index'
import OrderPieChart from '../OrderPieChart'
export default function Orders() {
  return (
    <div className={css.container}>
    <div className={css.head}>
        <span>Orders today</span>
    </div>

    <div className={css.stat}>
        <span>Amount</span>
        <span>$ {groupNumber(4560)}</span>
    </div>

    <div className={css.orders}>
        {
            ordersData.map((order, index) => (
                <div key={index} className={css.order}>
                    <div>
                        <span>{order.name}</span>
                        <span>$ {order.change}</span>
                    </div>
                    <div>
                        <span>{order.type}</span>
                        <span>Items: {order.items}</span>
                    </div>
                </div>
            ))
        }
    </div>


    <div className={css.orderChart}>
        <span>Split by orders</span>
       <OrderPieChart/>
    </div>
</div>
  )
}
