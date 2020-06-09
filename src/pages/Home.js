import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import { Link } from 'react-router-dom'
import Services from "../components/Services"
import FeaturedRooms from '../components/FeaturedRooms'
import { RoomContext } from '../context'

class Home extends Component {
    
    render() {
        {console.log(localStorage.getItem('rootState_isLogin'))}
        return (

            <>
                {console.log("hero")}
                < Hero >
                    <Banner title="Resting Space" subtitle="Room for You to Rest">
                        <Link to="rooms" className="btn-primary">
                            Rooms
                </Link>
                    </Banner>
                </Hero >
                <Services></Services>
                <FeaturedRooms></FeaturedRooms>
            </>
        )
    }
}
export default Home;