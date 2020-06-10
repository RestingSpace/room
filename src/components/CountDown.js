import React from 'react';
import ReactMomentCountDown from 'react-moment-countdown';
import moment from 'moment';


class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let futureTime = this.props.futureTime;
            let handleTimeUp = this.props.handleTimeUp;
            //console.log(futureTime);


            var eventTime = moment(futureTime);
            //2020-06-10 21:00:00
            //var eventTime = moment("2020-06-10 14:43:09");
            var currentTime = new Date().getTime();

            // console.log(eventTime);
            // console.log(currentTime);

            var diffTime = eventTime - currentTime;
            var countdown = moment.duration(diffTime, 'milliseconds');
            //console.log(countdown);

            const days = countdown._data.days;
            const hours = countdown._data.hours;
            const minutes = countdown._data.minutes;
            const seconds = countdown._data.seconds;

            this.setState({ days, hours, minutes, seconds });
            if (diffTime < 0) {
                var result = window.confirm("Times up!");

                if (result) {
                    // the user clicked ok
                    console.log("click ok time up");
                    clearInterval(this.interval);
                    this.props.handleTimeUp();

                } else {
                    // the user clicked cancel or closed the confirm dialog.
                }
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;

        return (
            <div className='count-down'>
                <div className="countdown-wrapper">
                    {/* <div className="countdown-item">
                        {days}
                        <span>days</span>
                    </div> */}
                    <div className="countdown-item">
                        {hours}
                        <span>hours</span>
                    </div>
                    <div className="countdown-item">
                        {minutes}
                        <span>minutes</span>
                    </div>
                    <div className="countdown-item">
                        {seconds}
                        <span>seconds</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Countdown;