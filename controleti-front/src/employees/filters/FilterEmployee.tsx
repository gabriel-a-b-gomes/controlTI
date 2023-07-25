import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';

import DateField from "../../formshook/DateField";
import SelectField from "../../formshook/SelectField";
import TextField from "../../formshook/TextField";
import { EmployeeFilterDTO } from "../models/employee.model";
import FilterFill from './FilterFill';

import '../styles/FilterStyles.css';

function FilterEmployee(props: FilterEmployeeProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "fromIngressDate" | "toIngressDate"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: EmployeeFilterDTO) {
        data.toIngressDate = handleFieldEmpty("toIngressDate");
        data.fromIngressDate = handleFieldEmpty("fromIngressDate");

        props.onSubmit(data);
    }

    return (
        <FilterFill>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container employee'>
                            <div className='filter-fields'>
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <TextField field='employeeUser' displayName='Usuário' placeholder='Procurar por usuário...' css='s-small' />
                                <TextField field='employeeEmail' displayName='Email' placeholder='Procurar por email...' css='s-small' />
                                <TextField field='employeeEmailPassword' displayName='Senha' placeholder='Procurar por senha de email...' css='s-small' />
                                <TextField field='alternativeEmail' displayName='Email alternativo' placeholder='Procurar por email alternativo...' css='s-small' />
                                <div className='field-from-to'>
                                    <DateField field='fromIngressDate' displayName='Data de Ingresso' />
                                    <span> até </span>
                                    <DateField field='toIngressDate' displayName='' />
                                </div>
                            </div>
                            <div className='filter-buttons'>
                                <button type='submit' className='filter'>Filtrar</button>
                                <button type='button' className='clear' onClick={clear} title="Limpar Filtro"><AiOutlineClear /></button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            )}
        </FilterFill>
    );
}

interface FilterEmployeeProps {
    base: EmployeeFilterDTO;
    model: EmployeeFilterDTO;
    onSubmit(extra: EmployeeFilterDTO, hasToClear?: boolean): void;
}

export default FilterEmployee;