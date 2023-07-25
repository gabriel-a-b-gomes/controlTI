import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { PreventiveCreationDTO } from "../models/preventive.model";

import * as Yup from 'yup';
import DateField from '../../formshook/DateField';
import TextField from '../../formshook/TextField';

import '../styles/FormPreventivesStyles.css';

const preventiveSchema = Yup.object({
    lastPreventiveDate: Yup.date().required("Obrigatório").typeError("Data inválida"),
    ticketId: Yup.string().required("Obrigatório")
});

function FormPreventive(props: FormPreventiveProps) {
    const methods = useForm({
        defaultValues: props.modelPreventive,
        resolver: yupResolver(preventiveSchema)
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(props.onSubmit)} className="form-preventives">
                <DateField field='lastPreventiveDate' displayName='' />
                <TextField field='ticketId' displayName='' placeholder='Insira o ticket da preventiva...' css='auto' />
                <button type='submit'>Salvar</button>
            </form>
        </FormProvider>
    )
}

interface FormPreventiveProps {
    modelPreventive: PreventiveCreationDTO;
    onSubmit(preventive: PreventiveCreationDTO): void;
}

export default FormPreventive;