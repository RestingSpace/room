import React, { Component } from 'react';
import defaultBcg from '../images/meditation-room.jpg';
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar"
//import Hero from '../components/Hero';
//import Banner from '../Components/Banner';
//import {Link} from 'react-router-dom';
//import {RoomContext} from '../context';
export default class SingleRoom extends Component {
    //Access the URL parameter
    constructor(props) {
        super(props);
        this.state={
            //slug:this.props.match.params.slug,
            defaultBcg: defaultBcg
        };
    }

    //static  contextType = RoomContext;
    //componentDidMount() {}

    render() {
        //const {getRoom} = this,context;
        //const room = getRoom(this.state.slug);

        return (
            <>
                <Navbar />
                <section className="single-room">
                    <div className = "single-room-images"><img src={defaultBcg} alt="Room"></img></div>


                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>Meditation Room</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : $10 </h6>
                            <h6>size : 10 SQFT</h6>
                            <h6>
                                max capacity : 4
                            </h6>
                            <h6>Pet: no pets allowed</h6>
                            <h6>Bed: not available</h6>
                            <h6>Bath Room: not available</h6>
                            <h6>wifi: yes </h6>

                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h3>Reservation </h3>
                    <div>
                        <Calendar />
                    </div>

                </section>


            </>
        );
    }
}
