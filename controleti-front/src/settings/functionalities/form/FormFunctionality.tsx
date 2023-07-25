import { ReactElement, useEffect } from "react";
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { FunctionalityCreationDTO } from "../models/functionalities.model";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from "../../../formshook/TextField";

import '../styles/FuncsStyles.css';

const funcSchema = Yup.object({
    description: Yup.string().required("Obrigatório").max(150, 'Máx. 150 caracteres.')
});

function FormFunctionality(props: FormFunctionalityProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(funcSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: FunctionalityCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='form-funcs'>
                <div className='fields-area'>
                    <TextField displayName='Descrição *' field='description' placeholder='Insira a descrição da funcionalidade...' css='auto' />
                </div>
                <div className='action-settings-area'>
                    <div>{props.children}</div>
                    {props.buttons}
                </div>
            </form> 
        </FormProvider>
    );
}

interface FormFunctionalityProps {
    model: FunctionalityCreationDTO;
    buttons: ReactElement;
    children: ReactElement;
    onSubmit(values: FunctionalityCreationDTO, actions: UseFormReturn<FunctionalityCreationDTO>): void
}

export default FormFunctionality;