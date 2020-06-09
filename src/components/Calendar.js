import React, {Component, useContext} from 'react';
import {
    Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
    EventSettingsModel, DragAndDrop, Resize, ViewsDirective, ViewDirective
} from "@syncfusion/ej2-react-schedule";
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import items from "../data";
import defaultImage from "../images/imagenotavailable.png";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import {RoomContext} from "../context"


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleData:[]
        };
    }
    static context = RoomContext;

    getReservationByRoom(){
        const getRoomReservationRL = `http://localhost:8080/reservationsbyRoom/${this.props.rid}`;
        const action = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                //'Authorization': document.cookie
            },
            "Access-Control-Allow-Origin": "*"
        }
        fetch(getRoomReservationRL, action)
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    console.log("success getting reservations");
                }
                else if(res.status === 403){
                    console.log("403 forbidden");
                }
                else{
                    console.log("error getting reservations");
                }
                return res.json()

            })
            .then(
                (results) => {
                    console.log(results);
                    let res = results.map(result => {
                        let item = new Object();
                        item["id"] = result.id;
                        let start = new Date(result.start_time);
                        let end = new Date(result.end_time);
                        if(start - new Date() < 0)
                            item["IsReadonly"] = true;
                        else
                            item["IsReadonly"] = false;
                        item["StartTime"] = start;
                        item["EndTime"] = end;
                        item["id"] = result.id;
                        if(result["user"]["username"] !== this.props.username)
                        {

                            item["IsBlock"] = true;
                            item["Subject"] = "Reserved by others";
                        }
                        else {
                            item["IsBlock"] = false;
                            item["Subject"] = this.props.username;
                        }
                        return item;
                    });
                    this.setState({
                        scheduleData:res
                    });
                    console.log(this.state.scheduleData);
                }
            )
            .catch(err => {
            console.error(err);
            alert("Error getting reservations please try again");
        });
    }

    onAddClick() {
        // const context = this.context;
        // console.log(this.context);
        // const {username, isLogin} = context;
        // console.log(isLogin);
        let currentTime = new Date();
        if(this.props.username === ' ')
            alert('You must login to make reservations!');
        else if(this.scheduleObj.activeEventData.event.StartTime - currentTime < 0)
            alert("You cannot make a reservation starting at a past time point!");
        else {
            let data = ({
                start_time: moment(this.scheduleObj.activeEventData.event.StartTime).format('YYYY-MM-DD HH:mm:ss'),
                end_time: moment(this.scheduleObj.activeEventData.event.EndTime).format('YYYY-MM-DD HH:mm:ss'),
                username: this.props.username,
                rid: this.props.rid
            });
            console.log(`/checkout?start_time=${data.start_time}&end_time=${data.end_time}&username=${data.username}&rid=${data.rid}`);
            if (this.props.username === null)
                alert("Please login to make reservations!")
            window.location = `/checkout?start_time=${data.start_time}&end_time=${data.end_time}&username=${data.username}&rid=${data.rid}`;
        }
        //console.log(this.scheduleObj.activeEventData);
        // console.log(this.scheduleObj);
        // return <Redirect to={{
        //     pathname:`/checkout`,
        //     state:{
        //         start_time: this.scheduleObj.activeCellsData.startTime,
        //         end_time: this.scheduleObj.activeCellsData.endTime,
        //         username: this.props.username,
        //         rid:this.props.rid
        //     }
        // }}
        // />
        // console.log(this.scheduleObj.activeEventData.event);
        // const URL = "http://localhost:8080/reserve";
        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //         //'Authorization': document.cookie
        //     },
        //     //credentials: "include",
        //     body: JSON.stringify({
        //         start_time: moment(this.scheduleObj.activeEventData.event.StartTime).format('YYYY-MM-DD HH:mm:ss'),
        //         end_time: moment(this.scheduleObj.activeEventData.event.EndTime).format('YYYY-MM-DD HH:mm:ss'),
        //         username: this.props.username,
        //         rid:this.props.rid
        //     }),
        //     "Access-Control-Allow-Origin": "*"
        // };
        // // console.log(moment(this.scheduleObj.activeEventData.event.StartTime).format('YYYY-MM-DD HH:mm:ss'));
        // // console.log(moment(this.scheduleObj.activeEventData.event.EndTime).format('YYYY-MM-DD HH:mm:ss'));
        // fetch(URL, requestOptions).then(res => {
        //     if (res.status === 200) {
        //         console.log(res);
        //         res.json().then((resp)=>{this.setState({reservationId: resp.id});});
        //         alert("Reservation Succeeded!");
        //         this.getReservationByRoom();
        //         this.forceUpdate();
        //     } else {
        //         console.log(res.text());
        //     }
        // })
        //     .catch(err => {
        //         console.error(err);
        //         alert("Error making reservations please try again");
        //     });
       // console.log(this.state.reservationId);
    }

    onDeleteClick(){
        let currentTime = new Date();
        if(this.scheduleObj.activeEventData.event.EndTime - currentTime < 0)
            alert("You cannot delete a past reservation!")
        else if(this.scheduleObj.activeEventData.event.StartTime - currentTime < 0)
            alert("You cannot delete an ongoing reservation!");
        else {
            //console.log(this.scheduleObj.activeEventData.event.id);
            const URL = `http://localhost:8080/cancelReserve/${this.scheduleObj.activeEventData.event.id}`;
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                    //'Authorization': document.cookie
                },
                //credentials: "include",
                body: JSON.stringify({
                    id: this.scheduleObj.activeEventData.event.id
                }),
                "Access-Control-Allow-Origin": "*"
            };
            fetch(URL, requestOptions).then(res => {
                if (res.status === 200) {
                    console.log(res);
                    alert("Reservation Deleted!")
                    this.getReservationByRoom();
                    this.forceUpdate();
                } else {
                    console.log(res.text());
                }
            })
                .catch(err => {
                    console.error(err);
                    alert("Error deleting the reservation please try again");
                });
        }
    }

     componentDidMount() {
         this.getReservationByRoom();
     }


    render() {
        return (
            <div>
                <ButtonComponent id='add' title='Add' ref={t => this.buttonObj = t} onClick={this.onAddClick.bind(this)}>Reserve</ButtonComponent>
                <ButtonComponent id='delete' title='delete' ref={t => this.buttonObj = t} onClick={this.onDeleteClick.bind(this)}>Delete</ButtonComponent>
                <ScheduleComponent ref={t => this.scheduleObj = t} width='100%' height='550px' eventSettings={{ dataSource: this.state.scheduleData }}>
                    <ViewsDirective>
                        <ViewDirective option='Day'/>
                        <ViewDirective option='Week'/>
                        <ViewDirective option='WorkWeek'/>
                        <ViewDirective option='Month'/>
                        <ViewDirective option='Agenda'/>
                    </ViewsDirective>
                    <Inject services = {[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
                </ScheduleComponent>
            </div>

        );
    }
}

export default Calendar;