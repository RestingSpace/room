import React from 'react'
import Hero from '../components/Hero'
import Auth from '../components/Auth'
import QRCodeDisplay from '../components/QRCodeDisplay'
import PopUpQRCode from '../components/PopUpQRCode'
const Login = () => {
    return (
        <>
            <Hero>
                <Auth isRegister={1} />
            </Hero>
            <QRCodeDisplay></QRCodeDisplay>
            <PopUpQRCode></PopUpQRCode>
        </>

    )
}
export default Login;
