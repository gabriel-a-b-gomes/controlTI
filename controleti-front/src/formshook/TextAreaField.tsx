import { useFormContext, Controller } from 'react-hook-form';

import './styles/FormTextBox.css';

function TextAreaField(props: TextAreaFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={props.field}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className='textarea-container'>
                    <label htmlFor={props.field}>
                        <span>{props.displayName}</span>
                        {error &&
                            <div className='text-danger'>{error.message}</div>
                        }
                    </label>
                    <textarea {...field} placeholder={props.placeholder} id={props.field} className="textarea" />
                </div>
            )}
        />
        
    );  
}

interface TextAreaFieldProps {
    displayName: string;
    field: string;
    placeholder: string;
}

export default TextAreaField;