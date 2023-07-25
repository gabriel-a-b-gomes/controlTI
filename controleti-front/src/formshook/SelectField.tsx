import { useFormContext, Controller } from 'react-hook-form';
import { selectOptions } from './models/form.model';

import './styles/FormControls.css';

function SelectField(props: SelectFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={props.field}
            control={control}
            render={({ field, fieldState: { error }, formState: { isValidating } }) => (
                <div className='select-container'>
                    <label htmlFor={props.field}>
                        {props.displayName}
                        {error &&
                            <div className='text-danger'>{error.message}</div>
                        }
                    </label>
                    <select {...field} className='select' id={props.field}>
                        {props.options.map((option, key) =>
                            <option key={option.display + key} value={option.value}>{option.display}</option>    
                        )}
                    </select>
                </div>
            )}
        />
        
    );
}

interface SelectFieldProps {
    field: string;
    displayName: string;
    options: selectOptions[];
}

export default SelectField;