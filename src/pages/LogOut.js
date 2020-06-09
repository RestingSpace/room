import React from 'react'
import Hero from '../components/Hero'
import Auth from '../components/Auth'

const LogOut = () => {
    //localStorage.clear();
    return (
        <>
        <Hero>
            
            <Auth isRegister = {2} />
        </Hero>
        </>
        
    )
}
export default LogOut;


