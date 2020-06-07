import React, { Component } from 'react'
import Title from './Titles'
import Room from './Room'
import Loading from './Loading'
import {RoomContext} from '../context'

export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
    
    render() {
        let {loading, featuredRooms : rooms} = this.context;
    
        
        rooms = rooms.map(room =>{
            return <Room key={room.id} room={room}></Room>
        })
        return (
            <div className='featured-rooms'> 
                <Title title="feature rooms"></Title>
                    <div className="featured-rooms-center">
                        {loading? Loading : rooms}
                    </div>
            
            </div>
        )
    }
}