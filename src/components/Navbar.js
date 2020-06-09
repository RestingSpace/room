import React, { Component } from 'react'
import logo from '../images/icons8-room-64.png';
import { FaAlignRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Welcome from './Welcome'
import { RoomContext } from '../context'

export default class Navbar extends Component {
    static contextType = RoomContext;
    state = {
        isOpen: false,

    };
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    };



    render() {

        const { isLogin, getReservation } = this.context;
        return (
            <nav className="navbar">
                <div className="nav-center">

                    <div className="nav-header">
                        <Link to="/">
                            <img src={logo} alt="Room" />
                        </Link>

                        <button type="button" className="nav-btn"
                            onClick={this.handleToggle}>
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
                                    <Link to="/reserve" onChange={getReservation}>Reservation</Link>
                                </li>
                                :
                                null
                        }
                        {
                            !isLogin ?
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Sign Up</Link>
                                    </li>
                                </>
                                :
                                null
                        }

                        {!isLogin?
                            null
                            :
                            <li>
                                <Link to="/logout">Log Out</Link>
                            </li>
                        }
                        

                    </ul>
                </div>
                <div className="nav-header">
                    <Welcome></Welcome>
                </div>
            </nav>
        );
    }
}
