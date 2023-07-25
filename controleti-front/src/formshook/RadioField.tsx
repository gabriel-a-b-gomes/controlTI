import { useFormContext, Controller } from 'react-hook-form';
import { rdbOptions } from './models/form.model';

import './styles/FormControls.css';

function RadioField(props: RadioFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={props.field}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className='radio-container'>
                    <span className='radio-title'>
                        {error &&
                            <div className='text-danger'>{error.message}</div>
                        }
                        <label htmlFor={props.field}>{props.displayName}</label>
                    </span>
                    <div role="group" className='form-radios' id={props.field}>
                        {props.rdbOptions.map(option =>     
                            <div className='form-check' key={option.display}>
                                <label htmlFor={option.display} className='form-check-label'>
                                    <input type="radio" id={option.display}
                                        {...field}
                                        value={option.value}
                                        defaultChecked={field.value === option.value}
                                        className='form-check-input'
                                    />
                                    {option.display}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        />
    );
}

interface RadioFieldProps {
    field: string;
    displayName: string;
    rdbOptions: rdbOptions[];
}

export default RadioField;