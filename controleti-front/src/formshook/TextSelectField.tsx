import { useState, ReactElement } from 'react';
import OptionsModal from '../modals/OptionsModal';
import TextField from './TextField';

import './styles/FormTextBox.css';

function TextSelectField(props: TextSelectFieldProps) { 
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <div className='text-button-container'>
                <TextField type='text' field={props.field} displayName={props.displayName} css={props.css} placeholder={props.placeholder} />
                <button type='button' onClick={() => setShow(true)}>Pesquisar</button>
            </div>
            <OptionsModal title={props.modalTitle} show={show} onHide={() => setShow(false)}>
                {props.children}
            </OptionsModal>
        </>
    );
}

interface TextSelectFieldProps {
    modalTitle: string;
    field: string;
    displayName: string;
    css: string;
    placeholder: string;
    children: ReactElement;
    setSelectedOption?: (option: any) => void;
}

export default TextSelectField;