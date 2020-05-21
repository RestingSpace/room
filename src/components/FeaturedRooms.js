import React, { Component } from 'react'
import Title from './Titles'
import Room from './Room'
import {RoomContext} from '../context'

export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
    
    render() {
        let {FeaturedRooms : rooms} = this.context;
        console.log(rooms)
        return (
            <div className='featured-rooms'> 
                <Title title="feature rooms"></Title>
                    <div className="featured-rooms-center">
                        {rooms}
                    </div>
            
            </div>
        )
    }
}