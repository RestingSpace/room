import React, {Component} from 'react';
import {
    Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
    EventSettingsModel, DragAndDrop, Resize, ViewsDirective, ViewDirective
} from "@syncfusion/ej2-react-schedule";
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';


class Calendar extends Component {
    constructor() {
        super(...arguments);
        this.scheduleData=[{
           id:1,
           EndTime: new Date(2020, 4, 19, 12, 30),
           StartTime: new Date(2020, 4, 19, 10, 0),
           Subject: 'Meeting',
           //IsAllDay: false,
           //RecurrenceRule: 'FREQ=DAILY; INTERVAL=1;COUNT=10',
           //IsReadonly: false,
           //IsBlock: true
           Location:'Building 1 RM301'
       },
       {
           id:2,
           EndTime: new Date(2020, 4, 19, 10, 0),
           StartTime: new Date(2020, 4, 19, 9, 0),
           Subject: 'Meeting',
           IsAllDay: false,
           //RecurrenceRule: 'FREQ=DAILY; INTERVAL=1;COUNT=10',
           //IsBlock: true
        }];
    }

    remoteData = new DataManager({
        url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor,
        crossDomain:true //alow cross domain request
    });

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

    render() {
        return (
            <div>
                <ButtonComponent id='add' title='Add' ref={t => this.buttonObj = t} onClick={this.onAddClick.bind(this)}>Add</ButtonComponent>
                <ScheduleComponent ref={t => this.scheduleObj = t} width='100%' height='550px' eventSettings={{ dataSource: this.scheduleData }}>
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