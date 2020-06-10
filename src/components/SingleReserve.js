import React, { Component } from 'react'
import Room from './Room'
import CountDown from './CountDown'


class SingleReserve extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            
        };
    }

    fetchCancelReserve = () => {
        const { id } = this.props.room;
        var params = id;
        const cancelReservationURL = `http://localhost:8080/cancelReserve/${id}`;
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
                    this.props.action();
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
                console.log("cancel ress");
                
            },
                (error) => {
                    // this.setState({
                    //     isLoaded: true,
                    //     error
                    // });
                }
            )
        /*******end of */
    }

    handleClick() {
        const { handleReservationChange } = this.props.action;
        if (window.confirm("Do you want to cancel this reservation?")) {
            //call cancelorder
            this.fetchCancelReserve();
            console.log("ok");
            
        } else {
            console.log("You pressed Cancel!");
            //this.props.action();
        }
    }

    render() {
        const { start_time, end_time, totalPrice } = this.props.room;
        const condition = this.props.condition;
        console.log(condition);
        return (
            <div className='horizontal-box'>
                <section className='reserve-image'>
                    <Room key={this.props.room.id} room={this.props.room}></Room>
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
                                <button className='btn-primary' onClick={this.handleClick}>
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


}


export default SingleReserve;