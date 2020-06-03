import React, {Component} from 'react';

class CheckOut extends Component{
    constructor(props) {
        super(props);
        this.state={
            roomId:this.props.roomId,
            username: this.props.username,
            EndTime:this.props.EndTime,
            StartTime:this.props.StartTime,
            reservationId:null
        }
    }
    reserve(){
        alert("reserve called");
        console.warn("state", this.state);
        const signupURL = "http://localhost:8080/reserve";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // credentials: "include",
            body: JSON.stringify({
                start_time: this.state.StartTime,
                end_time: this.state.EndTime,
                username: this.state.username,
                rid:this.state.roomId
            }),
            "Access-Control-Allow-Origin": "*"
        };
        fetch(signupURL, requestOptions).then((result)=>{
            result.json().then((resp)=>{
                this.setState({reservationId: resp.id});
            })
        })
    }
    render(){
        return


    }
}