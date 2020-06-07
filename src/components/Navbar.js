import React, { Component } from 'react'
import logo from '../images/icons8-room-64.png';
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Welcome from './Welcome'

import {RoomContext} from '../context'

export default class Navbar extends Component {
    static contextType = RoomContext;
    state = {
        isOpen: false,
        
    };
    hadleToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    };
    
    
    
    render() {
        
        const {isLogin} = this.context;
        return (
        <nav className="navbar">
            <div className="nav-center">
                
                <div className="nav-header">
                    <Link to="/">
                        <img src={logo} alt="Room" />
                    </Link>

                    <button type="button" className="nav-btn"
                    onClick={this.hadleToggle}>
                        <FaAlignRight className="nav-icon" />
                    </button>
                </div>

                <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/rooms">Rooms</Link>
                    </li>
                    {
                        isLogin ?
                            <li>
                                <Link to="/reserve">Reservation</Link>
                            </li>
                            :
                            <li>

                            </li>
                    }
                    
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Sign Up</Link>
                    </li>
                    
                </ul>

               

            </div>
            <div className="nav-header">
                <Welcome></Welcome>
            </div>
        </nav>
        );        
    }
}
