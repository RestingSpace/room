import React from 'react'
import Hero from '../components/Hero'
import Auth from '../components/Auth'

const Login = () => {
    return (
        <>
            <Hero>
                <Auth isRegister={1} />
            </Hero>

        </>

    )
}
export default Login;
