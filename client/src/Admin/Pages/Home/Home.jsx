import React from 'react'
import { groupNumber, cardsData } from '../../data/index'
import css from './Home.module.css'
import Statistic from '../../Components/Statistic/Statistic'
import Orders from '../../Components/Orders/Orders'

function Home() {
    return (
        <div className={css.container}>
            <div className={css.dashboard}>
                <div className={css.dashboardHead}>
                    <div className={css.head}>
                        <span>Home</span>
                        <div className={css.durationButton}>
                            <select>
                                <option value="">1 week</option>
                                <option value="">1 month</option>
                                <option value="">1 year</option>
                            </select>
                        </div>

                    </div>
                    <div className={css.cards}>
                        {
                            cardsData.map((card, index) => (
                                <div className={css.card}>
                                    <div className={css.cardHead}>
                                        <span>{card.title}</span>
                                        <span>+{card.change}</span>
                                    </div>

                                    <div className={css.cardAmount}>
                                        <span>$</span>
                                        <span>{groupNumber(card.amount)}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Statistic/>
            </div>
                <Orders/>
            
        </div>
    )
}

export default Home