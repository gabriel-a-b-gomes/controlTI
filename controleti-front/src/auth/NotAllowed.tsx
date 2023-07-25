import { MdDesktopAccessDisabled } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './styles/AuthStyles.css';

function NotAllowed() {
    const navigate = useNavigate()
    function handleBackOnNavigation() {
        navigate(-1);
    }   

    document.title = "Sem Permissão";

    return (
        <>
        <div className='auth-container n-allowed'>
            <div className='not-allowed-area'>
                <div className='status-not-allowed'>
                    <span>405<MdDesktopAccessDisabled size={50} color="#000" /></span>
                </div>
                <h1>Você não tem permissão para ver está página</h1>
                <p>
                    Verifique com o administrador do sistema, para habilitar seu acesso a esta página.
                    Agradeçemos a compreensão.
                </p>
                <div className='back-page-button'>
                    <button onClick={handleBackOnNavigation}>Voltar</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default NotAllowed;