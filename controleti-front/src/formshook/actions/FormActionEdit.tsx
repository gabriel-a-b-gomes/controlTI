import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoDuplicateSharp } from 'react-icons/io5';

import { NavLink, useNavigate } from "react-router-dom";

import '../styles/FormActions.css';
import ConfirmAlert from '../../utils/alerts/ConfirmAlert';

function FormActionEdit(props: FormActionEditProps) {
    const navigate = useNavigate();

    function handleGoBack(): void {
        navigate(-1);
    }

    return (
        <div className="form-actions-buttons-item edit">
            <button className="action delete" type='button' onClick={() => ConfirmAlert(props.handleDelete)} title="Excluir"><RiDeleteBin5Fill /></button>
            <NavLink to={props.duplicateTo}>
                <button className="action" type='button' title="Duplicar"><IoDuplicateSharp /></button>
            </NavLink>
            <button type="submit">Salvar</button>
            <button className="back" type='button' onClick={handleGoBack}>Voltar</button>
        </div>
    );
}

interface FormActionEditProps {
    duplicateTo: string;
    handleDelete(itemId: number): void;
}

export default FormActionEdit;