import { IoMdDesktop } from 'react-icons/io';
import './styles/AuthStyles.css';

import logo from '../assets/logo.jpg';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

function SignIn() {
    const { instance } = useMsal();

    function handleLogin() {
        instance.loginRedirect({
            ...loginRequest
        });
    }

    document.title = "Entrar";

    return (
        <div className='auth-container'>
            <div className='sign-in-area'>
                <div className='control-brand'>
                    <IoMdDesktop />
                    <span>Controle TI</span>
                </div>
                <button onClick={handleLogin}>Entrar</button>
            </div>
            <div className='enterprise'>
                © Innara - Todos os direitos reservados
                <img alt='Logotipo INNARA' src={logo} />
            </div>
        </div>
    );
}

export default SignIn;