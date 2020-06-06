import React, { Component } from 'react'
import logo from '../images/icons8-room-64.png';
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Welcome from './Welcome'

export default class Navbar extends Component {
    state = {
        isOpen: false
    };
    hadleToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    };
    
    render() {
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
                    <li>
                        <Link to="/reserve">Reservation</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Sign Up</Link>
                    </li>
                    <li>
                        <Welcome></Welcome>
                    </li>
                </ul>
            </div>
        </nav>
        );        
    }
}
