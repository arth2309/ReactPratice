import React from 'react';
import './Header.css'
import logo from '../../../assests/img/logo@2x.png'

const Header = () => {

    return (
        <header>
           <img src={logo} alt='logo' className='logo' />
        </header>
    )

}

export default Header