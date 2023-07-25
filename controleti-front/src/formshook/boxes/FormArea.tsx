import { ReactNode } from 'react';

import '../styles/FormBoxes.css';

function FormArea(props: FormTemplateProps) {
    return (
        <div className="form-container">
            {props.children}
        </div>
    );
}

interface FormTemplateProps {
    children: ReactNode;
}

export default FormArea;