import React, { Component } from 'react'
import SingleReserve from './SingleReserve';
import Moment from 'react-moment';
import Loading from './Loading'
import {withRoomConsumer} from '../context'
import moment from 'moment';
import ReservationInfo from '../ReservationInfo'

function Reservation ({context}) { 
        let futureRes = [];
        let currentRes =[];
        let pastRes = [];

        //test //2019-06-06 17:00:00
        
        
        const {rooms, loading} = context;

        // async function getData() {
        //     const response = await fetch();
        //     return response.json()
        // }
        
        // async function main() {
        //     const data = await getData(URL);
        
        //     console.log(data)
        // }


        async function getData() {
            const response = await fetchURL();
            return response.json()
        }
        
        async function main() {
            const data = await getData();
        
            console.log(data)
        }



            let fetchURL = () => {
                const getReservationURL = 'http://localhost:8080/reservations/jiuchao';
                const action = {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        //'Authorization': document.cookie
                    }
                }          
                fetch(getReservationURL, action)
                .then(res => {
                    //console.log(res);
                    if(res.status === 200){
                        console.log("success getting reservation");
                    }
                    else if(res.status === 403){
                        console.log("403 forbidden");
                    }
                    else{
                        console.log("error getting reservation");
                        return;
                    }
                    return res.json()
                })
                .then((result) => {
                        const reservationRoom = result;
                        console.log(reservationRoom);
                        return reservationRoom;
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
            

    
                let reservationRooms = ReservationInfo;
                let {start_time, end_time, totalPrice} = reservationRooms;
                let now_time = moment();
                reservationRooms.map((room) => {
               
                    if (moment(now_time).isAfter(room.start_time)) {
                        if (moment(now_time).isAfter(room.end_time)){
                            pastRes = [...pastRes, room];
                        }
                        else{
                            currentRes = [...currentRes, room];
                        }
                    }
                    else{
                        futureRes = [...futureRes, room];
                    }
                })

                console.log(pastRes);
                console.log(currentRes);
                console.log(futureRes);
        
                let handleTimeReservation = (pastRes) => {
                    let handleSingleReserve = (pastRes) => {
                        pastRes.map(item => {
                            return <SingleReserve key={item.id} room={item} />;
                    })}
                    if (pastRes.length < 1) {
                        return null;
                    }
                    else{
                        let singleR = handleSingleReserve();
                        return singleR;
                    }
                }

        

        if (rooms === undefined) {
           return <Loading></Loading>
        }
        
        else{
            return (
                <div className='reservation'>
                    <div className="reserve-block">
                    <h4>Ongoing Reservation</h4>
                    {
                        currentRes.map(item => {
                            return <SingleReserve key={item.id} room={item} condition="current"/>;
                        })} 
                    </div>
                    
                    <div className="reserve-block">
                    <h4>Future Reservation</h4>
                    {
                        futureRes.map(item => {
                            return <SingleReserve key={item.id} room={item} condition="future"/>;
                        })}
                    </div>

                    <div className="reserve-block">
                    <h4>History</h4>
                    
                        {
                        pastRes.map(item => {
                            return <SingleReserve key={item.id} room={item} condition="past"/>;
                        })}
                    </div> 
                </div>
            )
        }
        
}


export default withRoomConsumer(Reservation);