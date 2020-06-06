import React, {Component} from 'react';
import {
    Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
    EventSettingsModel, DragAndDrop, Resize, ViewsDirective, ViewDirective
} from "@syncfusion/ej2-react-schedule";
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import items from "../data"


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

    // formatSchedule(schedules) {
    //     let tempSchedules = schedules.map(schedule => {
    //         let item = {...schedule.fields,id};
    //         let start = new Date(schedule.start_time);
    //         let end = new Date(schedule.end_time);
    //         item["StartTime"] = start;
    //         item["EndTime"] = end;
    //
    //         if(schedule.user_id === this.props.username)
    //             item["IsReadonly"] = false;
    //         else
    //             item["IsReadonly"] = true;
    //         return item;
    //     });
    //     return tempSchedules;
    // }

    onAddClick() {
        let Data = [{
            Id: 1,
            Subject: 'Conference',
            StartTime: new Date(2018, 1, 12, 9, 0),
            EndTime: new Date(2018, 1, 12, 10, 0),
            IsAllDay: false
        }, {
            Id: 2,
            Subject: 'Meeting',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 15, 11, 30),
            IsAllDay: false
        }];
        this.scheduleObj.addEvent(Data);
        this.buttonObj.element.setAttribute('disabled', 'true');
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