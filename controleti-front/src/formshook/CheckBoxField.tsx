import { useFormContext, Controller } from 'react-hook-form';

import './styles/FormControls.css';

function CheckBoxField(props: CheckBoxFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={props.field}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className='checkbox-container'>
                    <div className='form-check'>
                        <input type="checkbox" {...field} id={props.field} className='form-check-input' checked={field.value} />
                        <label htmlFor={props.field} className="form-check-label">{props.displayName}</label>
                    </div>
                    {error &&
                        <div className='text-danger'>{error.message}</div>
                    }
                </div>
            )}
        />
    );
}

interface CheckBoxFieldProps {
    field: string;
    displayName: string;
}

export default CheckBoxField;