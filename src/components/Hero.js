
import logo from '../images/icons8-room-96.png';
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import React from 'react'
import room1 from '../images/room-1.jpeg'
import room2 from '../images/room-2.jpeg'
export default function Hero({children, hero}) {
    
        return (
            <div>
                <header className={hero}>
                
                </header>
                {/* <div className="MagicScroll" data-options="mode: carousel; height: 275px;">
                    
                    <img src={room1}/>
                    <img src={room2}/>
    
                </div> */}
            </div>
            
        )
    
}

Hero.defaultProps = {
    hero: "defaultHero"
}
