// import React, {Component} from 'react';
//
// class Summary extends Component {
//     constructor() {
//         super(props);
//     }
//     reserve(){
//         const URL = "http://localhost:8080/reserve2";
//         const requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             //credentials: "include",
//             body: JSON.stringify({
//                 start_time: this.scheduleObj.activeCellsData.startTime,
//                 end_time: this.scheduleObj.activeCellsData.endTime,
//                 username: this.props.username,
//                 rid:this.props.rid
//             }),
//             "Access-Control-Allow-Origin": "*"
//         };
//         fetch(URL, requestOptions).then(res => {
//             if (res.status === 200) {
//                 res.json().then((resp)=>{this.setState({reservationId: resp.id});});
//                 alert("Reservation Succeeded!")
//             } else {
//                 console.log(res.text());
//             }
//         })
//             .catch(err => {
//                 console.error(err);
//                 alert("Error making reservations please try again");
//             });
//         console.log(this.state.reservationId);
//     }
//
//     render() {
//         return (
//             <div>
//
//             </div>
//         );
//     }
// }
//
// export default Summary;