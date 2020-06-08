import React, {Component} from 'react';
import{Link} from 'react-router-dom';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state={
            isCheckedOut:false,
            reservationId:'',
            credit_number:'',
            name:'',
            month:'',
            year:'',
            cvv:'',
            address:'',
            city:'',
            state:'',
            zip:''
        }
    }

    handlePlaceOrder(){
        if(this.state.credit_number===''||
            this.state.name === '' ||
            this.state.month === '' ||
            this.state.year === ''||
            this.state.cvv === ''||
            this.state.address === ''||
            this.state.city === ''||
            this.state.state === ''||
            this.state.zip === '')
            alert("Please enter full payment information to place orders!");
        else {
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
                    rid: this.props.rid
                }),
                "Access-Control-Allow-Origin": "*"
            };
            // console.log(moment(this.scheduleObj.activeEventData.event.StartTime).format('YYYY-MM-DD HH:mm:ss'));
            // console.log(moment(this.scheduleObj.activeEventData.event.EndTime).format('YYYY-MM-DD HH:mm:ss'));
            fetch(URL, requestOptions).then(res => {
                if (res.status === 200) {
                    console.log(res);
                    res.json().then((resp) => {
                        this.setState({reservationId: resp.id});
                    });
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
    }

    handleClick(){
        //console.log(this.scheduleObj.activeEventData.event.id);
        const URL = `http://localhost:8080/send-email/${this.state.reservationId}`;
        const Options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                //'Authorization': document.cookie
            },
            "Access-Control-Allow-Origin": "*"
        }
        fetch(URL, Options).then(res => {
            if (res.status === 200) {
                console.log(res);
                alert("Email sent!");
                window.location = `/reserve`;
            } else {
                console.log(res.text());
            }
        })
            .catch(err => {
                console.error(err);
                alert("ERROR sending an email!");
            });
    }
    redirect(){
        window.location = `/reserve`;
    }


    render() {
        return (
            <div>
                {
                    !this.state.isCheckedOut?
                        <div className="login">
                            <h4>Credit Card Information</h4>
                            <input className = "checkout_input" type="text" placeholder=" credit card number"
                                   onChange={(e) => {
                                       this.setState({credit_number: e.target.value})
                                   }}
                            /><br/><br/>
                            <input className = "checkout_input" type="text" placeholder=" Name on the card"
                                   onChange={(e) => {
                                       this.setState({name: e.target.value})
                                   }}
                            /> <br/><br/>

                            <input className = "credit_card" type="text" placeholder=" Expiration Month"
                                   onChange={(e) => {
                                       this.setState({month: e.target.value})
                                   }}
                            />
                            <input className = "credit_card" type="text" placeholder=" Expiration Year"
                                   onChange={(e) => {
                                       this.setState({year: e.target.value})
                                   }}
                            />
                            <input className = "credit_card" type="text" placeholder=" CVV"
                                   onChange={(e) => {
                                       this.setState({cvv: e.target.value})
                                   }}
                            /><br/><br/>
                            <h4>Billing Address</h4>
                            <input className = "checkout_input" type="text" placeholder=" Street Address"
                                   onChange={(e) => {
                                       this.setState({address: e.target.value})
                                   }}
                            /><br/>
                            <input className = "credit_card" type="text" placeholder=" City"
                                   onChange={(e) => {
                                       this.setState({city: e.target.value})
                                   }}
                            />
                            <input className = "credit_card" type="text" placeholder=" State"
                                   onChange={(e) => {
                                       this.setState({state: e.target.value})
                                   }}
                            />
                            <input className = "credit_card" type="text" placeholder=" Zip"
                                   onChange={(e) => {
                                       this.setState({zip: e.target.value})
                                   }}
                            />
                            <div>
                                <button className ='primary' onClick={()=> this.handlePlaceOrder()}>Place Order</button>
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