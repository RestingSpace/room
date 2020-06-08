import React, { Component } from 'react'
import Room from './Room'
import CountDown from './CountDown'


export default function SingleReserve({ room, condition }) {
    const { start_time, end_time, totalPrice, id } = room

    let handleChange = () => {
        var params = {id}; 
        const cancelReservationURL = `http://localhost:8080/cancelReserve/${params.toString()}`;
        
        const action = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                //'Authorization': document.cookie
            }
        }
        fetch(cancelReservationURL, action)
            .then(res => {
                //console.log(res);
                if (res.status === 200) {
                    console.log("success CANCEL reservation");
                }
                else if (res.status === 403) {
                    console.log("403 forbidden");
                }
                else {
                    console.log("error CANCEL reservation");
                    return;
                }
                return res.json()
            })
            .then((result) => {
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

    return (
        <div className='horizontal-box'>
            <section className='reserve-image'>
                <Room key={room.id} room={room}></Room>
            </section>
            <section className='reserve-info'>
                <div className='reserve-text'>
                    <h5>
                        start time: {start_time}
                    </h5>
                    <h5>
                        end time: {end_time}
                    </h5>
                    <h5>
                        price: {totalPrice} $
                    </h5>
                </div>

                <div className='reserve-rest'>
                    {
                        condition == "future"
                            ?
                            <button className='btn-primary' >
                                cancel order
                        </button>
                            :
                            <div></div>
                    }

                    {
                        condition == "current"
                            ?
                            <CountDown futureTime={end_time}></CountDown>
                            :
                            <div></div>
                    }
                </div>

            </section>

        </div>
    )


}


