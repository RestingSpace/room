import React, {Component} from 'react';
import Summary from '../components/Summary';
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"

class CheckOut extends Component {
    constructor(props) {
        super(props);
        // const search = window.location.search; // returns the URL query String
        // const params = new URLSearchParams(search);
        // //console.log(params.get("username"))
        // this.state={
        //     start_time:params.get("start_time"),
        //     end_time:params.get("end_time"),
        //     rid:params.get("rid"),
        //     slug:params.get("slug")
        // }
    }


    render() {
        {console.log(this.props.location.state.start_time)}
        return (
            <>
            <Navbar/>
            <Hero>
                <Summary start_time = {this.props.location.state.start_time}
                         end_time = {this.props.location.state.end_time}
                         rid = {this.props.location.state.rid}
                         slug = {this.props.location.state.slug}/>
            </Hero>

            </>
        );
    }
}

export default CheckOut;


