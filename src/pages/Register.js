import React from 'react'
import Hero from '../components/Hero'
import Auth from '../components/Auth'
const Register = () => {
    return (
        <>
            <Hero>
                <Auth isRegister={0} />
            </Hero>
        </>

    )
}
export default Register;
