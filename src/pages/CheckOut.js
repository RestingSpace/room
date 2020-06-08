import React, {Component} from 'react';
import Summary from '../components/Summary';
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"

class CheckOut extends Component {
    constructor(props) {
        super(props);
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search);
        //console.log(params.get("username"))
        this.state={
            start_time:params.get("start_time"),
            end_time:params.get("end_time"),
            rid:params.get("rid"),
            username:params.get("username")
        }
    }

    render() {

        return (
            <>
            <Navbar/>
            <Hero>
                <Summary start_time = {this.state.start_time} end_time = {this.state.end_time}
                         rid = {this.state.rid} username = {this.state.username}/>
            </Hero>

            </>
        );
    }
}

export default CheckOut;


