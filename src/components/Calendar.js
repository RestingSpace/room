import React, {Component} from 'react';
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


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleData:[]
        };
    }

    getReservationByRoom(){
        const getRoomReservationRL = `http://localhost:8080/reservationsbyRoom/${this.props.rid}`;
        const action = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': document.cookie
            }
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
                        item["StartTime"] = start;
                        item["EndTime"] = end;
                        if(result["user"]["username"] !== this.props.username)
                        {
                            //item["IsReadonly"] = true;
                            item["IsBlock"] = true;
                            item["Subject"] = "Not Available";
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
         console.log(this.scheduleObj.activeCellsData.startTime);
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
        const URL = "http://localhost:8080/reserve2";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //credentials: "include",
            body: JSON.stringify({
                start_time: moment(this.scheduleObj.activeCellsData.startTime).format('YYYY-MM-DD hh:mm:ss'),
                end_time: moment(this.scheduleObj.activeCellsData.endTime).format('YYYY-MM-DD hh:mm:ss'),
                username: this.props.username,
                rid:this.props.rid
            }),
            "Access-Control-Allow-Origin": "*"
        };
        fetch(URL, requestOptions).then(res => {
            if (res.status === 200) {
                console.log(res);
                res.json().then((resp)=>{this.setState({reservationId: resp.id});});
                alert("Reservation Succeeded!")
            } else {
                console.log(res.text());
            }
        })
            .catch(err => {
                console.error(err);
                alert("Error making reservations please try again");
            });
        console.log(this.state.reservationId);
    }

     componentDidMount() {
         this.getReservationByRoom();
        //  let allSchedules = this.state.scheduleData;
        //  let valid = formatSchedule(allSchedules);
        //  this.setState({
        //      validSchedules:valid
        // });
     }

    render() {
        return (
            <div>
                <ButtonComponent id='add' title='Add' ref={t => this.buttonObj = t} onClick={this.onAddClick.bind(this)}>Add</ButtonComponent>
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