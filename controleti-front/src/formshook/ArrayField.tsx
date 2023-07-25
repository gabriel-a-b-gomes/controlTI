import { ReactElement } from "react";
import { useFieldArray } from "react-hook-form";

import { AiOutlineMinus } from 'react-icons/ai';

import './styles/FormArrayStyles.css';

function ArrayField<T>(props: ArrayFieldProps<T>) {
    const { fields, prepend, remove } = useFieldArray({ name: props.field })

    return (
        <div className="array-field-container">
            <ul className="array-field">
                {fields.map((field, index) => (
                    <li key={field.id} className="array-item">
                        {props.children(index)}
                        <button type="button" onClick={() => remove(index)} title="Remover" className="array-item-remove">&times;</button>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => prepend(props.default)} title="Adicionar item" className="array-include-item">
                Adicionar
            </button>
        </div>
    );
}

interface ArrayFieldProps<T> {
    field: string;
    default: T;
    children: (index: number) => ReactElement;
}

export default ArrayField;