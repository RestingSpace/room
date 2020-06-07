import React, { Component } from 'react'
import Room from './Room'
import CountDown from './CountDown'


export default function SingleReserve({room, condition}) {
        const{start_time, end_time, totalPrice} = room
      
        return (
            <div className='horizontal-box'>
                <section className='reserve-image'>
                    <Room key={room.id} room={room}></Room>
                </section>
                <section className='reserve-info'>
                 <div className='reserve-text'>
                    <h5>
                        start time: {start_time}
                    </h5>
                    <h5>
                        end time: {end_time}
                    </h5>
                    <h5>
                        price: {totalPrice} $
                    </h5>
                </div>

                <div className='reserve-rest'>
                    {
                        condition == "future"
                        ?
                        <button className='btn-primary'>
                            cancel order
                        </button>
                        :
                        <div></div>
                    }

                    {
                        condition == "current"
                        ?
                        <CountDown futureTime={end_time}></CountDown>
                        :
                        <div></div>
                    }
                </div>

                </section>
                
            </div>
        )
    
    
}


