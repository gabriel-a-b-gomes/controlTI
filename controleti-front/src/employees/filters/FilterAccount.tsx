import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';

import SelectField from "../../formshook/SelectField";
import TextField from "../../formshook/TextField";
import { AccountFilterDTO } from "../models/employee.model";
import FilterFill from './FilterFill';

import '../styles/FilterStyles.css';

function FilterAccount(props: FilterAccountProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function onSubmit(data: AccountFilterDTO) {
        props.onSubmit(data);
    }

    return (
        <FilterFill>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container account'>
                            <div className='filter-fields'>
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <TextField field='employeeName' displayName='Nome' placeholder='Procurar por nome...' css='s-small' />
                                <TextField field='employeeUser' displayName='Usuário' placeholder='Procurar por usuário do domínio...' css='s-small' />
                                <TextField field='employeeDepartment' displayName='Departamento' placeholder='Procurar por departamento...' css='s-small' />
                                <TextField field='employeeEnterprise' displayName='Empresa' placeholder='Procurar por empresa...' css='s-small' />
                            </div>
                            <div className={`filter-buttons ${props.class}`}>
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

interface FilterAccountProps {
    class: string;
    base: AccountFilterDTO;
    model: AccountFilterDTO;
    onSubmit(extra: AccountFilterDTO, hasToClear?: boolean): void;
}

export default FilterAccount;