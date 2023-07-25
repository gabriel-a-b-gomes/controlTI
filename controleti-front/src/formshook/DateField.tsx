import { useFormContext, Controller } from 'react-hook-form';

import './styles/FormControls.css';

function DateField(props: DateFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller 
            name={props.field}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className='date-field-container'>
                    <label htmlFor={props.field}>
                        {props.displayName}
                        {error &&
                            <div className='text-danger'>{error.message}</div>
                        }
                    </label>
                    <div>
                        <input type="date" id={props.field}
                            {...field}
                        />
                    </div>
                </div>
            )}
        />
    );
}

interface DateFieldProps {
    field: string;
    displayName: string;
}

export default DateField;