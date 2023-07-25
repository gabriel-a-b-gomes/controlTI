import { Controller, useFormContext } from 'react-hook-form';
 
import './styles/FormTextBox.css';

function TextField(props: TextFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={props.field}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={`text-box-container ${props.css}`}>
                    <label htmlFor={props.field} className={`${props.css}`}>
                        {props.displayName}
                        {error &&
                            <div className='text-danger'>{error.message}</div>
                        }
                    </label>
                    <input type={props.type} {...field} placeholder={props.placeholder} id={props.field} className='text-box' /> 
                </div>
            )}
        />
    );
}

interface TextFieldProps {
    field: string;
    displayName: string;
    placeholder: string;
    mask?: string | string[];
    css: string;
    type?: 'text' | 'password' | 'number' | 'tel';
}

TextField.defaultValues = {
    type: 'text'
}

export default TextField;