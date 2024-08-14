import {useContext} from 'react';
import logo from '../../../assests/img/logo@2x.png';
import AuthContext from '../../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../ToastComponent/Toastcomponent';
import {styled} from 'styled-components';
import { ROUTES } from '../../../constants/routes';
import {TOAST} from '../../../constants/toast'



const Container = styled.header`
    display: flex;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    padding: 15px;`

const Logo = styled.img`
 height: 60px;`


const Header = () => {

    const authctx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = async() => {

        await authctx.logout();
        await navigate(ROUTES.LOGIN);
        showToast(TOAST.LOGGED_OUT.title,TOAST.LOGGED_OUT.description,TOAST.LOGGED_OUT.type);
    }

    return (
        <>
        <Container>
           <Logo src={logo} alt='logo'  />
           <button onClick={logoutHandler}>Logout</button>
        </Container>
        
         </>
    )

}

export default Header