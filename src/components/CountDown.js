import React from 'react';
import ReactMomentCountDown from 'react-moment-countdown';
import moment from 'moment';
 
//    export default function CountDown ({futureTime}) {
//     const then = moment(futureTime);
//     const now = moment();
//     const countdown = moment(then - now);
//     console.log(countdown);
//     const days = countdown.format('D');
//     const hours = countdown.format('HH');
//     const minutes = countdown.format('mm');
//     const seconds = countdown.format('ss');




//     let now_time = moment();
//     const dateInFuture = new Date('2020-06-08');
//     console.log(dateInFuture);
     
//      return (
//        <ReactMomentCountDown toDate={dateInFuture} sourceFormatMask='YYYY-MM-DD HH:mm:ss'/>
//      );
//    };


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
            let futureTime = this.props;
            let futureTimeValid = moment(futureTime);
            
            const now = moment();
            const countdown = moment(futureTimeValid - now);
            //console.log(countdown);
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            this.setState({ days, hours, minutes, seconds });
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