import { ReactElement, useEffect } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import TextField from '../../formshook/TextField';
import FormBox from '../../formshook/boxes/FormBox';
import FormArea from '../../formshook/boxes/FormArea';
import CheckBoxField from '../../formshook/CheckBoxField';
import RadioField from '../../formshook/RadioField';
import SelectField from '../../formshook/SelectField';
import DateField from '../../formshook/DateField';
import TextAreaField from '../../formshook/TextAreaField';

import { NobreakCreationDTO } from '../models/nobreak.model';
import { rdbOptions, selectOptions } from '../../formshook/models/form.model';

import '../styles/NobreakStyles.css';
import DisplayErrors from '../../utils/alerts/DisplayErros';

const nobreakSchema = Yup.object({
    code: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    location: Yup.string().required('Obrigatório'),
    brand: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    model: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    qtdeVA: Yup.number().min(0, "Deve ser positivo").integer().typeError("Número Inválido."),
    isSenoidal: Yup.boolean(),
    typeOfUse: Yup.number(),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, 'Aceita somente 100 caracteres'),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    lastPreventive: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    ticketId: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
    notes: Yup.string()
});

function FormNobreak(props: FormNobreakProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(nobreakSchema)
    })

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    const types: rdbOptions[] = [
        { display: 'Impressora', value: 1}, 
        { display: 'Servidor', value: 2 },
        { display: 'Rede', value: 3}
    ];

    const statusAvaiable: selectOptions[] = [
        { display: "Ativo", value: 1 },
        { display: "Desativado", value: 0 }
    ];

    function onSubmit(data: NobreakCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormArea>
                    <div className='form-header'>
                        <h1>{props.title}</h1>
                        {props.formHeaderOption}
                    </div>
                    <div className='form-header-area'>
                        <TextField displayName='Código do Nobreak *' field='code' placeholder='Insira o código do Nobreak...' css='code' />
                        <TextField displayName='Localização *' field='location' placeholder='Insira a localização do Nobreak...' css='location' />
                    </div>
                    <FormBox boxTitle='Informações Gerais' className='side-side'>
                        <div className='form-multifields-area three'>
                            <TextField displayName='Marca *' field='brand' placeholder='Insira a marca do Nobreak...' css='medium' />
                            <TextField displayName='Modelo *' field='model' placeholder='Insira o modelo do Nobreak...' css='medium' />
                            <TextField type='number' displayName='Qtde. VA *' field='qtdeVA' placeholder='Qtde de VA...' css='small' />
                        </div>
                        <div className='form-controls'>
                            <CheckBoxField displayName='É nobreak Senoidal?' field='isSenoidal' />
                            <RadioField displayName='Principal Uso' field='typeOfUse' rdbOptions={types} />
                        </div>
                    </FormBox>
                    <FormBox boxTitle='Detalhes' className='details'>
                        <div className='form-fields-sideside'>
                            <div className='form-multifields-area'>
                                <TextField displayName='Número do Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                <SelectField displayName='Status' field='status' options={statusAvaiable} />
                            </div>
                            <div className='form-multifields-area three'>
                                <DateField displayName='Data de Aquisição' field='acquisitionDate' />
                                <DateField displayName='Última Preventiva' field='lastPreventive' />
                                <TextField displayName='Ticket da Preventiva' field='ticketId' placeholder='Insira o id do ticket...' css='small' />
                            </div>
                        </div>
                        <TextAreaField field='notes' displayName='Observações' placeholder='Insira as observações do Nobreak...' />
                    </FormBox>
                </FormArea>
                <DisplayErrors error={props.error} />
                <div className='form-control-actions'>
                    <div className='side-area-action'>{props.children}</div>
                    <div className='form-control-buttons d-flex flex-row justify-content-flex-start align-items-flex-end'>
                        {props.buttons(methods)}
                    </div> 
                </div>
            </form>
        </FormProvider>
    );
}

interface FormNobreakProps {
    title: string;
    model: NobreakCreationDTO;
    error: string;
    formHeaderOption?: ReactElement;
    buttons: (actions: UseFormReturn<NobreakCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: NobreakCreationDTO, actions: UseFormReturn<NobreakCreationDTO, any>): void;
}

export default FormNobreak;