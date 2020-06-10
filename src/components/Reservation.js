import React, { Component } from 'react'
import SingleReserve from './SingleReserve';
import Moment from 'react-moment';
import Loading from './Loading'
import { withRoomConsumer } from '../context'
import moment from 'moment';
import ReservationInfo from '../ReservationInfo'
import { RoomContext } from '../context'
import { render } from '@testing-library/react';

export default class Reservation extends Component {
    
    static contextType = RoomContext;
    constructor(props) {
        super(props)
        //function passed to child component 
        this.handleReservationChange = this.handleReservationChange.bind(this);
        this.state = ({
            futureRes: [],
            currentRes: [],
            pastRes: [],
            reservationRoom: [],
            loading: true,
            reRender: true
            
     
        })
        console.log(this);
    }
    


    componentDidMount() {
        console.log("reservation did mount ");
        const getReservationURL = `http://localhost:8080/reservations/${localStorage.getItem('username')}`;
        const action = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                //'Authorization': document.cookie
            }
        }
        fetch(getReservationURL, action)
            .then(res => {
                this.setState({loading: false});
                if (res.status === 200) {
                    console.log("success getting reservation");
                    //res.sort((a,b)=>new Date(a.start_time) - new Date(b.start_time));
                }
                else if (res.status === 403) {
                    console.log("403 forbidden");
                }
                else {
                    console.log("error getting reservation");
                    return;
                }
                return res.json()
            })
            .then((result) => {
                result.sort((a,b)=>new Date(a.start_time) - new Date(b.start_time));
                this.setState({
                    reservationRoom: result
                })
                
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    
    }


    handleReservationChange() {
        console.log("force update");
        console.log(this);
        //this.setState({reRender: !this.state.reRender});
        console.log("rerender", this.state.reRender);
        //this.forceUpdate();
        this.componentDidMount();
     
    }

    render() {
        let{futureRes, currentRes, pastRes, reservationRoom} = this.state;
        console.log(reservationRoom);
        let reservationRooms = reservationRoom;
        let now_time = moment();
        reservationRooms.map((room) => {

            if (moment(now_time).isAfter(room.start_time)) {
                if (moment(now_time).isAfter(room.end_time)) {
                    pastRes = [...pastRes, room];
                }
                else {
                    currentRes = [...currentRes, room];
                }
            }
            else {
                futureRes = [...futureRes, room];
            }
        })

        console.log(pastRes);
        console.log(currentRes);
        console.log(futureRes);

        if (this.state.loading) {
            return <Loading></Loading>
        }

        else {
            return (
                <div className='reservation'>
                    <div className="reserve-block">
                        <h4>Ongoing Reservation</h4>
                        {
                            currentRes.map(item => {
                                return <SingleReserve key={item.id} room={item} condition="current" action={this.handleReservationChange}/>;
                            })}
                    </div>

                    <div className="reserve-block">
                        <h4>Future Reservation</h4>
                        {
                            futureRes.map(item => {
                                return <SingleReserve key={item.id} room={item} condition="future" action={this.handleReservationChange}/>;
                            })}
                    </div>

                    <div className="reserve-block">
                        <h4>History</h4>

                        {
                            pastRes.map(item => {
                                return <SingleReserve key={item.id} room={item} condition="past" action={this.handleReservationChange}/>;
                            })}
                    </div>
                </div>
            )
        }
    }

}


