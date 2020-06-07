import React, { Component } from 'react'
import SingleReserve from './SingleReserve';

import Loading from './Loading'
import {withRoomConsumer} from '../context'

function Reservation ({context}) { 
    
    
        const {rooms, loading, getReservation} = context;
        console.log(rooms);
        console.log(getReservation());
        if (rooms === undefined) {
           return <Loading></Loading>
        }
        
        else{
            return (
                <div className='reservation'>
                    {rooms.map(item => {
                        return <SingleReserve key={item.id} room={item} />;
                    })}
                    
                </div>
            )
        }
        
    


}

export default withRoomConsumer(Reservation);