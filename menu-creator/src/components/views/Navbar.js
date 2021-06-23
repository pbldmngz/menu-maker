import React from 'react'
import Logotipo from '../../images/logotipo.png'
import Logo from '../../images/logo.png'

export default function Navbar() {
    return (
        <div className="navbar">
            <img src={Logo} alt="Logo" className="logo"/>
            <h1 className="logo-tipo">La Casa de la Paella</h1>
        </div>
    )
}
