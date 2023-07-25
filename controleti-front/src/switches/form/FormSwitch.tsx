import { ReactElement, useEffect } from 'react';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { SwitchCreationDTO } from '../models/switch.model';
import { selectOptions } from '../../formshook/models/form.model';
import FormArea from '../../formshook/boxes/FormArea';
import TextField from '../../formshook/TextField';
import FormBox from '../../formshook/boxes/FormBox';
import SelectField from '../../formshook/SelectField';
import DateField from '../../formshook/DateField';
import TextAreaField from '../../formshook/TextAreaField';

import '../styles/SwitchStyles.css';
import DisplayErrors from '../../utils/alerts/DisplayErros';

const switchSchema = Yup.object({
    code: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    location: Yup.string().required("Obrigatório").max(200, "Máx. 200 caracteres"),
    brand: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    switchIP: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    switchMAC: Yup.string().max(100, "Máx. 100 caracteres"),
    qtdePorts: Yup.number().min(0, "Deve ser positivo").integer().typeError("Digite um número"),
    switchUser: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    switchPassword: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, "Máx. 100 caracteres"),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string()
});

function FormSwitch(props: FormSwitchProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(switchSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    const statusAvaiable: selectOptions[] = [
        { display: "Ativo", value: 1 },
        { display: "Desativado", value: 0 }
    ];

    function onSubmit(data: SwitchCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='form-switches'>
                <FormArea>
                    <div className='form-header'>
                        <h1>{props.title}</h1>
                        {props.formHeaderOptions}
                    </div>
                    <div className='form-switch-header-fields'>
                        <TextField displayName='Código do Switch *' field='code' placeholder='Insira o código do Switch...' css='code' />
                        <TextField displayName='Localização *' field='location' placeholder='Insira a localização do Switch...' css='location' />
                    </div>
                    <FormBox boxTitle='Informações Gerais' className='side-side'>
                        <div className='form-switch-fields three'>
                            <TextField displayName='Marca *' field='brand' placeholder='Insira a marca do switch...' css='auto' />
                            <TextField displayName='IP do Switch *' field='switchIP' placeholder='Insira o IP do switch...' css='auto' />
                            <TextField type='number' displayName='Qtde. Portas *' field='qtdePorts' placeholder='Insira a quantidade de portas...' css='small' />
                        </div>
                        <div className='form-switch-fields two'>
                            <TextField displayName='Usuário *' field='switchUser' placeholder='Insira o usuário do switch...' css='auto' />
                            <TextField displayName='Senha *' field='switchPassword' placeholder='Insira a senha do switch...' css='auto' /> 
                        </div>
                    </FormBox>
                    <FormBox boxTitle='Detalhes' className='details'>
                        <div className='form-switch-fields-sideside'>
                            <div className='form-switch-fields three'>
                                <TextField displayName='Número do Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                <TextField displayName='MAC Address' field='switchMAC' placeholder='Insira o MAC do switch...' css='asset' />
                                <SelectField displayName='Status' field='status' options={statusAvaiable} />
                            </div>
                            <div className='form-switch-fields one'>
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

interface FormSwitchProps {
    title: string;
    model: SwitchCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<SwitchCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: SwitchCreationDTO, actions: UseFormReturn<SwitchCreationDTO>): void;
}

export default FormSwitch;