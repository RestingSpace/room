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
        const URL = "http://localhost:8080/reserve2";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //credentials: "include",
            body: JSON.stringify({
                start_time: this.state.StartTime,
                end_time: this.state.EndTime,
                username: this.state.username,
                rid:this.state.roomId
            }),
            "Access-Control-Allow-Origin": "*"
        };
        fetch(URL, requestOptions).then(res => {
            if (res.status === 200) { // success Log in
                res.json().then((resp)=>{this.setState({reservationId: resp.id});})
            } else {
                console.log(res.text());
            }
        })
            .catch(err => {
                console.error(err);
                alert("Error logging in please try again");
            });
        console.log(this.state.reservationId);
    }
    render(){
        return(
            <button onClick={()=>this.reserve()}>click me</button>

        )
    }
}
export default CheckOut;