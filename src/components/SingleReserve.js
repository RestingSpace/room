import React, { Component } from 'react'
import Room from './Room'



export default function SingleReserve({room}) {


        return (
            <div className='horizontal-box'>
                <section className='reserve-image'>
                    <Room key={room.id} room={room}></Room>
                </section>
                <section className='reserve-info'>
                 
                    <h5>
                        start time: 
                    </h5>
                    <h5>
                        end time:
                    </h5>
                    <h5>
                        price: 
                    </h5>
                    <h5>
                        reservation id: 
                    </h5>
                    <button>
                        
                    </button>
                </section>
                
            </div>
        )
    
    
}


