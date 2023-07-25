import { AiOutlineClear } from 'react-icons/ai';

import { useNavigate } from "react-router-dom";

import '../styles/FormActions.css';

function FormActionCreate(props: FormActionCreateProps) {
    const navigate = useNavigate();

    function handleGoBack(): void {
        navigate(-1);
    }

    return (
        <div className="form-actions-buttons-item create">
            <button className="action" type='button' onClick={props.handleClear} title="Limpar"><AiOutlineClear /></button>
            <button type="submit">Gravar</button>
            <button className="back" type='button' onClick={handleGoBack}>Voltar</button>
        </div>
    );
}

interface FormActionCreateProps {
    handleClear: () => void;
}

export default FormActionCreate;