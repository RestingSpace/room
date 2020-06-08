import React, {Component} from 'react';
import{Link} from 'react-router-dom';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state={
            isCheckedOut:false,
        }
    }

    handlePlaceOrder(){
        const URL = "http://localhost:8080/reserve";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                //'Authorization': document.cookie
            },
            //credentials: "include",
            body: JSON.stringify({
                start_time: this.props.start_time,
                end_time: this.props.end_time,
                username: this.props.username,
                rid:this.props.rid
            }),
            "Access-Control-Allow-Origin": "*"
        };
        // console.log(moment(this.scheduleObj.activeEventData.event.StartTime).format('YYYY-MM-DD HH:mm:ss'));
        // console.log(moment(this.scheduleObj.activeEventData.event.EndTime).format('YYYY-MM-DD HH:mm:ss'));
        fetch(URL, requestOptions).then(res => {
            if (res.status === 200) {
                console.log(res);
                res.json().then((resp)=>{this.setState({reservationId: resp.id});});
                // alert("Reservation Succeeded!");
                this.setState({isCheckedOut: true});
                this.forceUpdate();
                // this.getReservationByRoom();
                // this.forceUpdate();
            } else {
                console.log(res.text());
            }
        })
            .catch(err => {
                console.error(err);
                alert("Error making reservations please try again");
            });
    }

    handleClick(){
        alert("email sent!");
        window.location = "/rooms";
    }
    redirect(){
        window.location = "/rooms"
    }


    render() {
        return (
            <div>
                {
                    !this.state.isCheckedOut?
                        <div className="login">
                            <h4>Credit Card Information</h4>
                            <input className = "checkout_input" type="text" placeholder=" credit card number"
                            /><br/><br/>
                            <input className = "checkout_input" type="text" placeholder=" Name on the card"
                            /> <br/><br/>

                            <input className = "credit_card" type="text" placeholder=" Expiration Month"
                            />
                            <input className = "credit_card" type="text" placeholder=" Expiration Year"
                            />
                            <input className = "credit_card" type="text" placeholder=" CVV"
                            /><br/><br/>
                            <h4>Billing Address</h4>
                            <input className = "checkout_input" type="text" placeholder=" Street Address"
                            /><br/>
                            <input className = "credit_card" type="text" placeholder=" City"
                            />
                            <input className = "credit_card" type="text" placeholder=" State"
                            />
                            <input className = "credit_card" type="text" placeholder=" Zip"
                            />
                            <div>
                                <button className ='primary' onClick={()=>
                                    this.handlePlaceOrder()}>Place Order</button>
                            </div>

                        </div>

                        :

                        <div className="login">
                            <h1>Thanks for your order!</h1>
                            <h4> You reservation with room {this.props.rid} from {this.props.start_time} to {this.props.end_time} has been placed! Go to reservation page to check the detailed information. </h4>
                            <br/>
                            <h4> Do you want to receive the reservation information and the barcode to access the room by email?</h4>
                            <button onClick={()=>this.handleClick()}>Yes</button>
                            <button onClick = {()=>this.redirect()}>No</button>

                        </div>
                }
            </div>
        );
    }
}

export default Summary;