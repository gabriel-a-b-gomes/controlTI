import { AiOutlineFileDone } from 'react-icons/ai';

import { NavLink } from 'react-router-dom';

import '../styles/FormBoxes.css';

function FormNotify(props: FormNotifyProps) {

    return (
        <>
        {props.success &&
            <div className='form-notify-area'>
                <NavLink to={props.listingLink}><button>Listar</button></NavLink>
                <div className="success">
                    <AiOutlineFileDone size={16} />
                    <span>{props.text}</span>
                </div>
            </div>
        }
        </>    
    );
}

interface FormNotifyProps {
    success: boolean | undefined;
    text: string;

    listingLink: string;
}

export default FormNotify;