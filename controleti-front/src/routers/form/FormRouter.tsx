import { ReactElement, useEffect } from 'react';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { RouterCreationDTO } from '../models/router.model';
import FormArea from '../../formshook/boxes/FormArea';
import TextField from '../../formshook/TextField';
import FormBox from '../../formshook/boxes/FormBox';
import SelectField from '../../formshook/SelectField';
import { selectOptions } from '../../formshook/models/form.model';
import DateField from '../../formshook/DateField';
import TextAreaField from '../../formshook/TextAreaField';

import '../styles/RouterStyle.css'; 
import DisplayErrors from '../../utils/alerts/DisplayErros';

const routerSchema = Yup.object({
    code: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    location: Yup.string().required("Obrigatório").max(200, "Máx. 200 caracteres"),
    brand: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    routerIP: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    routerMAC: Yup.string().max(100, "Máx. 100 caracteres"),
    routerSSID: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    routerUser: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    routerPassword: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, "Máx. 100 caracteres"),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string()
});

function FormRouter(props: FormRouterProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(routerSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    const statusAvaiable: selectOptions[] = [
        { display: "Ativo", value: 1 },
        { display: "Desativado", value: 0 }
    ];

    function onSubmit(data: RouterCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='form-router'>
                <FormArea>
                    <div className='form-header'>
                        <h1>{props.title}</h1>
                        {props.formHeaderOptions}
                    </div>

                    <div className='form-router-header-fields'>
                        <TextField displayName='Código do Roteador *' field='code' placeholder='Insira o codigo do roteador...' css='code' />
                        <TextField displayName='Localização *' field='location' placeholder='Insira a localização do roteador...' css='location' />
                    </div>
                    <FormBox boxTitle='Informações Gerais' className='side-side'>
                        <div className='form-router-fields three'>
                            <TextField displayName='Marca *' field='brand' placeholder='Insira a marca...' css='auto' />
                            <TextField displayName='IP do Roteador *' field='routerIP' placeholder='Insira o IP do roteador...' css='auto' />
                            <TextField displayName='SSID *' field='routerSSID' placeholder='Insira o SSID...' css='small' />
                        </div>
                        <div className='form-router-fields two'>
                            <TextField displayName='Usuário *' field='routerUser' placeholder='Insira o usuário...' css='auto' />
                            <TextField displayName='Senha *' field='routerPassword' placeholder='Insira a senha...' css='auto' />
                        </div>
                    </FormBox>
                    <FormBox boxTitle='Detalhes' className='details'>
                        <div className='form-router-fields-sideside'>
                            <div className='form-router-fields three'>
                                <TextField displayName='Número do Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                <TextField displayName='MAC Address' field='routerMAC' placeholder='Insira o MAC do roteador...' css='asset' />
                                <SelectField displayName='Status' field='status' options={statusAvaiable} />
                            </div>
                            <div className='form-router-fields one'>
                                <DateField displayName='Data de Aquisição' field='acquisitionDate' />
                            </div>
                        </div>
                        <TextAreaField displayName='Observações' field='notes' placeholder='Insira as observações do switch...' />
                    </FormBox>
                </FormArea>
                <DisplayErrors error={props.error} />
                <div className="form-control-actions">
                    <div className="side-area-action">{props.children}</div>
                    <div className="form-control-buttons d-flex flex-row justify-content-flex-start align-items-flex-end">
                        {props.buttons(methods)}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

interface FormRouterProps {
    title: string;
    model: RouterCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<RouterCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: RouterCreationDTO, actions: UseFormReturn<RouterCreationDTO>): void;
}

export default FormRouter;