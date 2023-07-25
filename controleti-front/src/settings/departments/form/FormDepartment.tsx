import { ReactElement, useEffect } from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { DepartmentCreationDTO } from "../models/department.model";
import TextField from '../../../formshook/TextField';

import '../styles/DepartmentStyles.css';

const departmentSchema = Yup.object({
    description: Yup.string().required("Obrigatório").max(100, 'Máx. 100 caracteres.'),
    enterprise: Yup.string().required("Obrigatório").max(75, 'Máx. 75 caracteres')
});

function FormDepartment(props: FormDepartmentProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(departmentSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: DepartmentCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='form-department'>
                <div className='fields-area'>
                    <TextField displayName='Descrição *' field='description' placeholder='Insira a descrição do departamento...' css='auto' />
                    <TextField displayName='Empresa *' field='enterprise' placeholder='Insira a empresa...' css='auto' />
                </div>
                <div className='action-settings-area'>
                    <div>{props.children}</div>
                    {props.buttons}
                </div>
            </form> 
        </FormProvider>
    );
}

interface FormDepartmentProps {
    model: DepartmentCreationDTO
    buttons: ReactElement;
    children: ReactElement;
    onSubmit(values: DepartmentCreationDTO, actions: UseFormReturn<DepartmentCreationDTO>): void
}

export default FormDepartment;