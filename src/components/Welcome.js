import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'

import  UserProfile from './UserProfile.js'

export default function Welcome() {
   
    const {getName} = UserProfile;
    const name = getName();
    return (
        
        <div className = "nav-links a ">
            <h4>welcome ${name}</h4>
        </div>
    )
    
}
