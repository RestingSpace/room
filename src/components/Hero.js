
import logo from '../images/icons8-room-64.png';
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import React from 'react'
import room1 from '../images/room-1.jpeg'
import room2 from '../images/room-2.jpeg'


export default function Hero({children, hero}) {
    return <header className={hero}>
            {children}
  
        </header>
    
}

Hero.defaultProps = {hero: "defaultHero"}
