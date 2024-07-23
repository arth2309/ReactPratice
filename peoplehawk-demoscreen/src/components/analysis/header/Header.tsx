import React, {useContext} from 'react';
import './Header.css'
import logo from '../../../assests/img/logo@2x.png';
import AuthContext from '../../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';






const Header = () => {

    const authctx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = async() => {

        await authctx.logout();
        await navigate('/Login');
        toast.success('Successfully logged out',{
            hideProgressBar : true,
            autoClose : 2000,
            position : "bottom-center",
            closeButton : false,
            pauseOnHover : false,
                        
        });
    }

    return (
        <>
        <header>
           <img src={logo} alt='logo' className='logo' />
           <button onClick={logoutHandler}>Logout</button>
        </header>
         <ToastContainer />
         </>
    )

}

export default Header