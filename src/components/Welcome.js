import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'

import  UserProfile from './UserProfile.js'

export default function Welcome() {
    const context = useContext(RoomContext);
    const {username, isLogin} = context;
    console.log(username);
    
    return (
        
        <div className = "nav-links a welcome">
            {!isLogin ?
                null 
                :
                <p>Welcome {username}</p>
        }
            
        </div>
    )
    
}
