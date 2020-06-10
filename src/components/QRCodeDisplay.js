import React, { Component } from 'react'
import QRCode from 'qrcode'

// export default function QRCodeDisplay() {


//   return (
//     <>

//       <QRCode
//         level="Q"
//         style={{ width: 256, marginBottom: 50 }}
//         value={'hello world'}
//       />

//     </>

//   )
// }

export default class QRCodeDisplay extends Component {
  constructor(props) {
    super(props);
    this.generateQR = this.generateQR.bind(this);
  }

  generateQR(){
    let str = 'My first QR code!'
    QRCode.toCanvas(document.getElementById('canvas'), str, function (error) {
      if (error) console.error(error)
      console.log('success generated!')
    })
  }

  render() {
    return (
      <div className="qrCode">
        <canvas id="canvas" />
        
        <button onClick={this.generateQR} className="btn-primary btn-reserve btn-generate">
          Generate
     </button>


      </div>
    )
  }
}