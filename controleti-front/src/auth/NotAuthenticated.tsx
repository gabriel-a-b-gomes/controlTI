import { IoMdDesktop } from 'react-icons/io';
import { RiLockFill } from 'react-icons/ri';
import './styles/AuthStyles.css';
import { useMsal } from '@azure/msal-react';

function NotAuthenticated() {
    const { instance } = useMsal();

    function handleBackOnNavigation() {
        instance.logout();
    }   

    document.title = "Sem Acesso";

    return (
        <div className='auth-container'>
            <div className='not-authenticated-area'>
                <div className='status-not-authenticated'>
                    <span>401<RiLockFill size={50} color="#000" /></span>
                    <h3><IoMdDesktop />Controle TI</h3>
                </div>
                <h1>Acesso Negado</h1>
                <p>
                    Seu usuário não está cadastrado em nossa base. 
                    Ou então, você precisa relogar no Azure AD para que seu acesso seja efetivo.
                </p>
                <div className='back-page-button'>
                    <button onClick={handleBackOnNavigation}>Fazer o logout desta conta</button>
                </div>
            </div>
        </div>
    );
}

export default NotAuthenticated;