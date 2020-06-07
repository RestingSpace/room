import React, {Component} from 'react'
import Title from './Titles.js'
import {FaBed, FaCoffee, FaFilm} from 'react-icons/fa'
import { IoMdWalk } from "react-icons/io";
export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaBed/>,
                title: "cozy resting place",
                info : "Twin beds are provided in some rooms for laying down"
            },
            {
                icon: <FaFilm/>,
                title: "free entertainment",
                info : "Thousands of movies and video games are available"
            },
            {
                icon: <FaCoffee/>,
                title: "free drink refill",
                info : "Refill your waterbottle whenever you need"
            },    
            {
                icon: <IoMdWalk/>,
                title: "easy to reach",
                info : "Within 5 minutes walking distance from your working place"
            },    
        ]
    };

    aa() {
        this.state.services.map((item, index) => {
            // console.log(item.info);
            // console.log(index);
          });
        
    }

    render() {
        this.aa();
        return (
            <section className="services">
                <Title title="services"/>
                    <div className="services-center">
                        
                        {this.state.services.map((item, index) => {
                            return (
                            <article key={index} className = "service">
                                <h6 className="iconStyle">{item.icon}</h6>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        );
                        })}
                    </div>
             
            </section>
        )
    }
}