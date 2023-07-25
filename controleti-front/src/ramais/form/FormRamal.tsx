import { ReactElement, useEffect } from 'react';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { RamalCreationDTO } from "../models/ramal.model";
import FormArea from '../../formshook/boxes/FormArea';
import TextField from '../../formshook/TextField';
import SelectField from '../../formshook/SelectField';
import FormBox from '../../formshook/boxes/FormBox';
import CheckBoxField from '../../formshook/CheckBoxField';
import DateField from '../../formshook/DateField';
import TextAreaField from '../../formshook/TextAreaField';
import DisplayErrors from '../../utils/alerts/DisplayErros';

import '../styles/RamalStyles.css';
import FormFillRamal from './FormFillRamal';

const ramalSchema = Yup.object({
    number: Yup.string().required('Obrigatório').max(75, 'Máx. 75 caracteres'),
    model: Yup.string().max(200, 'Máx. 200 caracteres'),
    exitNumber: Yup.string().required('Obrigatório').max(75, 'Máx. 75 caracteres'),
    isDepartment: Yup.boolean(),
    deviceIP: Yup.string().required('Obrigatório').max(75, 'Máx. 75 caracteres'),
    deviceConfig: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    deviceUser: Yup.string().required('Obrigatório').max(75, 'Máx. 75 caracteres'),
    devicePassword: Yup.string().required('Obrigatório').max(75, 'Máx. 75 caracteres'),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, 'Máx. 100 caracteres'),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string(),

    departmentId: Yup.number().min(1, "Selecione um Departamento"),
    employeeId: Yup.number()
})

function FormRamal(props: FormRamalProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(ramalSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: RamalCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormFillRamal>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="form-ramal">
                        <FormArea>
                            <div className='form-header'>
                                <h1>{props.title}</h1>
                                {props.formHeaderOptions}
                            </div>
    
                            <div className='form-ramal-header-fields'>
                                <TextField displayName='Número do Ramal *' field='number' placeholder='Insira o número do ramal...' css='code-name' />
                                <SelectField displayName='Departamento *' field='departmentId' options={fill.departments} />
                                <SelectField displayName='Colaborador' field='employeeId' options={fill.employees} />
                            </div>
                            <FormBox boxTitle='Informações Gerais' className='side-side'>
                                <div className='form-ramal-fields info-main two'>
                                    <TextField displayName='Modelo do Aparelho' field='model' placeholder='Insira o modelo do aparelho...' css='big' />
                                    <TextField displayName='Tronco de Saída *' field='exitNumber' placeholder='Insira o tronco de saida do ramal...' css='auto' />
                                </div>
                                <div className='form-ramal-fields one'>
                                    <CheckBoxField displayName='Ramal de Departamento' field='isDepartment' />
                                </div>
                            </FormBox>
                            <FormBox boxTitle='Configurações' className='side-side config'>
                                <div className='form-ramal-fields config-main two'>
                                    <TextField displayName='IP do Aparelho *' field='deviceIP' placeholder='Insira o IP do aparelho...' css='device' />
                                    <TextField displayName='Gateway *' field='deviceConfig' placeholder='Insira o gateway do aparelho...' css='device' />
                                </div>
                                <div className='form-ramal-fields two'>
                                    <TextField displayName='Usuário *' field='deviceUser' placeholder='Insira o usuário do ramal...' css='auto' />
                                    <TextField displayName='Password *' field='devicePassword' placeholder='Insira a senha do ramal...' css='auto' />
                                </div>
                            </FormBox>
                            <FormBox boxTitle='Detalhes' className='details'>
                                <div className='form-ramal-fields-sideside'>
                                    <div className='form-ramal-fields two'>
                                        <TextField displayName='Número do Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                        <SelectField displayName='Status' field='status' options={fill.status} />
                                    </div>
                                    <div className='form-ramal-fields one'>
                                        <DateField displayName='Data de Aquisição' field='acquisitionDate' />
                                    </div>
                                </div>
                                <TextAreaField displayName='Observações' field='notes' placeholder='Insira as observações do ramal...' />
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
            )}
        </FormFillRamal>
    );
}

interface FormRamalProps {
    title: string;
    model: RamalCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<RamalCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: RamalCreationDTO, actions: UseFormReturn<RamalCreationDTO>): void;
}

export default FormRamal;