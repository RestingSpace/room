import React, {Component} from 'react';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, DragAndDrop, Resize} from "@syncfusion/ej2-react-schedule";


class Calendar extends Component {
    localData: EventSettingsModel = {
       dataSource:[{
           id:1,
           End: new Date(2020, 4, 14, 12, 30),
           Start: new Date(2020, 4, 14, 10, 0),
           Summary: 'Meeting',
           //IsAllDay: false,
           //RecurrenceRule: 'FREQ=DAILY; INTERVAL=1;COUNT=10',
           //IsReadonly: false,
           //IsBlock: true
           Location:'Building 1 RM301'
       },
       {
           id:2,
           End: new Date(2020, 4, 14, 10, 0),
           Start: new Date(2020, 4, 14, 9, 0),
           Summary: 'Meeting',
           IsAllDay: false,
           //RecurrenceRule: 'FREQ=DAILY; INTERVAL=1;COUNT=10',
           IsBlock: true
        }],

        fields:{
            subject: {name: 'Summary', default: 'No Title'},
            startTime: {name: 'Start'},
            endTime: { name: 'End'}
        }
    };

    onDragStart(args) {
        args.navigation = { enable: true, timeDelay: 4000 };
    }

    render() {
        return (
            <ScheduleComponent height = '800px' eventSettings ={this.localData}  allowDragAndDrop = {false}>
                <Inject services = {[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
            </ScheduleComponent>
        );
    }
}

export default Calendar;