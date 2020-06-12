import React, { Component } from 'react'
import QRCode from 'qrcode'
import axios from 'axios';
import Loading from './Loading'


export default class QRCodeDisplay extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      source: null,
      isLoaded: true,

    }


  }

  fetchQRCode = () => {    //memory leak error when there is no () => 
    const { reserveid } = this.props;

    axios
      .get(
        `http://localhost:8080/send-email/${reserveid}`,
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        this.setState({
          isLoaded: false,
        });
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        this.setState({ source: "data:;base64," + base64 });
        console.log(base64);
      }, (error) => {
        this.setState({
          isLoaded: true,

        });
      }
      );
  }

  render() {
    if (this.state.source === null) {
      this.fetchQRCode();
  
    }
      return (
        <div className="qrCode">
          <img src={this.state.source} />
        </div>)
    
    
      
    
    
    
  }
}