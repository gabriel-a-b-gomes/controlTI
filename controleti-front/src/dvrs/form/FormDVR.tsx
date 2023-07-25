import { useEffect, ReactElement } from 'react';

import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { DVRCreationDTO } from "../models/dvr.model";
import FormArea from '../../formshook/boxes/FormArea';
import TextField from '../../formshook/TextField';
import FormBox from '../../formshook/boxes/FormBox';
import CheckBoxField from '../../formshook/CheckBoxField';
import SelectField from '../../formshook/SelectField';

import { selectOptions } from '../../formshook/models/form.model';
import DateField from '../../formshook/DateField';
import TextAreaField from '../../formshook/TextAreaField';

import '../styles/DVRStyles.css';
import DisplayErrors from '../../utils/alerts/DisplayErros';

const dvrSchema = Yup.object({
    code: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    location: Yup.string().required('Obrigatório').max(200, 'Máx. 100 caracteres'),
    brand: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    model: Yup.string().max(100, 'Máx. 100 caracteres'),
    qtdeChannels: Yup.number().min(0, "Deve ser positivo").integer().typeError("Digite um número"),
    hdSize: Yup.number().min(0, "Deve ser positivo").typeError("Digite um número"),
    activeCams: Yup.number().min(0, "Deve ser positivo").integer().typeError("Digite um número"),
    hasBalun: Yup.boolean(),
    dvrIP: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    dvrPort: Yup.string().required('Obrigatório').max(50, 'Máx. 100 caracteres'),
    dvrUser: Yup.string().required('Obrigatório').max(75, 'Máx. 100 caracteres'),
    dvrPassword: Yup.string().required('Obrigatório').max(50, 'Máx. 100 caracteres'),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, 'Máx. 100 caracteres'),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    lastPreventive: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    ticketId: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
    notes: Yup.string()
});

function FormDVR(props: FormDVRProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(dvrSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    const statusAvaiable: selectOptions[] = [
        { display: "Ativo", value: 1 },
        { display: "Desativado", value: 0 }
    ];

    function onSubmit(data: DVRCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormArea>
                    <div className='form-header'>
                        <h1>{props.title}</h1>
                        {props.formHeaderOptions}
                    </div>
                    <div className='form-dvr-header-fields'>
                        <TextField displayName='Código do DVR *' field='code' placeholder='Insira o código do DVR...' css='code' />
                        <TextField displayName='Localização do DVR *' placeholder='Insira a localização do DVR...' field='location' css='location' />
                    </div>
                    <div className='form-dvr-middle-fields'>
                        <FormBox boxTitle='Informações Gerais' className='big-half'>
                            <div className='form-drv-fields two-sl'>
                                <TextField displayName='Marca *' field='brand' placeholder='Insira a marca do DVR...' css='small' />
                                <TextField displayName='Modelo' field='model' placeholder='Insira o modelo do DVR'  css='auto' />
                            </div>
                            <div className='form-drv-fields two'>
                                <TextField displayName='Quantidade de Canais *' field='qtdeChannels' placeholder='Insira a quantidade de canais...' type='number' css='auto' />
                                <TextField displayName='Tamanho do HD (TB) *' field='hdSize' placeholder='Insira o tamanho do HD...' css='auto' />
                            </div>
                            <div className='form-drv-fields two-srck'>
                                <TextField displayName='Câmeras Ativas *' field='activeCams' placeholder='Insira a quantidade de câmeras ativas...' type='number' css='auto' />
                                <CheckBoxField displayName='Power Balun Acoplado' field='hasBalun' />
                            </div>
                        </FormBox>
                        <FormBox boxTitle='Configurações' className='big-half'>
                            <div className='form-drv-fields two-sr'>
                                <TextField displayName='IP do DVR *' field='dvrIP' placeholder='Insira o IP do DVR...' css='auto' />
                                <TextField displayName='Porta *' field='dvrPort' placeholder='Insira a porta...' css='small' />
                            </div>
                            <div className='form-drv-fields one'>
                                <TextField displayName='Usuário *' field='dvrUser' placeholder='Insira o usuário do DVR...' css='auto' />
                            </div>
                            <div className='form-drv-fields one'>
                                <TextField displayName='Senha *' field='dvrPassword' placeholder='Insira a senha do DVR...' css='auto' />
                            </div>
                        </FormBox>
                    </div>
                    <FormBox boxTitle='Detalhes' className='details'>
                        <div className='form-dvr-fields-sideside'>
                            <div className='form-drv-fields two-details'>
                                <TextField displayName='Número do Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                <SelectField displayName='Status' field='status' options={statusAvaiable} /> 
                            </div>
                            <div className='form-drv-fields three-details'>
                                <DateField displayName="Data de Aquisição" field="acquisitionDate" />
                                <DateField displayName="Última Preventiva" field="lastPreventive" />
                                <TextField displayName='Ticket da Preventiva' field='ticketId' placeholder='Insira o id do ticket...' css='small' />
                            </div>
                        </div>
                        <TextAreaField field='notes' displayName='Observações' placeholder='Insira as observações do DVR...' />
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

interface FormDVRProps {
    title: string;
    model: DVRCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<DVRCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: DVRCreationDTO, actions: UseFormReturn<DVRCreationDTO>): void;
}

export default FormDVR;