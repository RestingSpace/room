import React, {Component} from 'react';
import Summary from '../components/Summary';
import Navbar from "../components/Navbar"

class CheckOut extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        {{console.log(this.props)}}
        return (
            <>
            <Navbar/>
            <div className="box">
                <Summary/>
            </div>

            </>
        );
    }
}

export default CheckOut;


