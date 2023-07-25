import { IoMdDesktop } from 'react-icons/io';
import logo from '../assets/logo.jpg';

function LoadingAuth() {
    document.title = "Carregando...";

    return (
        <div className='auth-container'>
            <div className='sign-in-area'>
                <div className='control-brand'>
                    <IoMdDesktop />
                    <span>Controle TI</span>
                </div>
            </div>
            <div className='enterprise'>
                © Innara - Todos os direitos reservados
                <img alt='Logotipo INNARA' src={logo} />
            </div>
        </div>
    );
}

export default LoadingAuth;