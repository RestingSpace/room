import React from 'react'
import Room from './Room'
export default function RoomsList({rooms}) {
    let {roomsL} = rooms;
    if (rooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>
                    Sorry, no match
                </h3>
            </div>
        )
    }
    roomsL = rooms.map(room => {
        
        return <Room key={room.id} room={room}></Room>
    })
    

    return (
        
        <section className='roomslist'>
            <div className='roomslist-center'>
                {roomsL}
            </div>
        </section>
    )
}
