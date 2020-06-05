import React, { Component } from 'react'
import Room from './Room'



export default function SingleReserve({room}) {


        return (
            <div className='horizontal-box'>
                <section className='reserve-image'>
                    <Room key={room.id} room={room}></Room>
                </section>
                <section className='reserve-info'>
                    start and end time 
                </section>
                
            </div>
        )
    
    
}


