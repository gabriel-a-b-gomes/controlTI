import { ReactNode } from 'react';

import '../styles/FormBoxes.css';

function FormBox(props: FormBoxProps) {
    return (
        <div className='form-box-area'>
            <h5 className='form-box-title'>{props.boxTitle}</h5>
            <div className={`form-box ${props.className}`}>
                {props.children}
            </div>
        </div>
    );
}

interface FormBoxProps {
    boxTitle: string;
    className?: string;
    children: ReactNode;
}

export default FormBox;