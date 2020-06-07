import React, {Component} from 'react';
import{Link} from 'react-router-dom';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state={
            isCheckedOut:false,
        }
    }

    handleClick(){
        console.log("email sent!");
        //window.location = "/rooms";
    }
    redirect(){
        //window.location = "/rooms"
    }


    render() {
        return (
            <div>
                {
                    !this.state.isCheckedOut?
                        <div className="checkout">
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
                                <button className ='primary' onClick={() => {
                                    this.setState({isCheckedOut: true});
                                    this.forceUpdate();
                                }}>Place Order</button>
                            </div>

                        </div>

                        :

                        <div className="login">
                            <p>Thanks for your order!</p>
                            <p>Do you want to email the order information to you?</p>
                            <button onClick={this.handleClick()}>Yes</button>
                            <button onClick = {this.redirect()}>No</button>

                        </div>
                }
            </div>
        );
    }
}

export default Summary;