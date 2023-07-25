import { ReactElement, useEffect } from "react";

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { EmployeeCreationDTO } from "../models/employee.model";
import FormArea from "../../formshook/boxes/FormArea";
import TextField from "../../formshook/TextField";
import SelectField from "../../formshook/SelectField";
import FormBox from "../../formshook/boxes/FormBox";
import DateField from "../../formshook/DateField";
import TextAreaField from "../../formshook/TextAreaField";

import '../styles/EmployeesStyles.css';
import DisplayErrors from "../../utils/alerts/DisplayErros";
import FormFillEmployee from "./FormFillEmployee";

const employeeSchema = Yup.object({
    name: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    displayName: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    email: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    emailPassword: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    alternativeEmail: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
    alternativeEmailPassword: Yup.string().max(50, "Máx. 50 caracteres").nullable(true),
    status: Yup.number(),
    ingressDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string().nullable(true),

    departmentId: Yup.number().min(1, "Por favor selecione um departamento"),

    skype: Yup.object({
        skypeUser: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
        skypePassword: Yup.string().max(50, "Máx. 50 caracteres").nullable(true)
    }),

    vpn: Yup.object({
        vpnUser: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
        vpnPassword: Yup.string().max(50, "Máx. 50 caracteres").nullable(true)
    })
});

function FormEmployee(props: FormEmployeeProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(employeeSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: EmployeeCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormFillEmployee>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="form-employees">
                        <FormArea>
                            <div className="form-header">
                                <h1>{props.title}</h1>
                            </div>
                            <div className="form-e-header-fields">
                                <TextField displayName="Nome de Exibição *" field="displayName" placeholder="Insira o nome do colaborador..." css="code-name" />
                                <TextField displayName="Usuário *" field="name" placeholder="Insira o usuário do colaborador..." css="code-name"  />
                                <SelectField displayName="Departamento *" field="departmentId" options={fill.optDepartments} />
                            </div>
                            <FormBox boxTitle="Email(s) do Colaborador" className="side-side">
                                <div className="form-e-fields main two">
                                    <TextField displayName="Email *" field="email" placeholder="Insira o email do colaborador..." css="email" />
                                    <TextField displayName="Senha *" field="emailPassword" placeholder="Insira a senha do email do colaborador..." css="password" />
                                </div>
                                <div className="form-e-fields two">
                                    <TextField displayName="Email Alternativo" field="alternativeEmail" placeholder="Insira o email alternativo..." css="email-alt" />
                                    <TextField displayName="Senha" field="alternativeEmailPassword" placeholder="Insira a senha do email alternativo..." css="password" />
                                </div>
                            </FormBox>
                            <div className="form-e-boxes-row">
                                <FormBox boxTitle="Acesso ao Skype" className="half-fillin">
                                    <div className="form-e-fields fill two">
                                        <TextField displayName="Usuário" field="skype.skypeUser" placeholder="Insira o usuário do skype..." css="user" />
                                        <TextField displayName="Senha" field="skype.skypePassword" placeholder="Insira a senha do acesso do skype..." css="password" />
                                    </div>
                                </FormBox>
                                <FormBox boxTitle="Acesso à VPN" className="half-fillin">
                                    <div className="form-e-fields fill two">
                                        <TextField displayName="Usuário" field="vpn.vpnUser" placeholder="Insira o usuário da VPN..." css="user" />
                                        <TextField displayName="Senha" field="vpn.vpnPassword" placeholder="Insira a senha do acesso da VPN..." css="password" />
                                    </div>
                                </FormBox>
                            </div>
                            <FormBox boxTitle="Detalhes" className="details">
                                <div className="form-e-fields-sideside">
                                    <SelectField displayName="Status" field="status" options={fill.status} />
                                    <div><DateField displayName="Data de Ingresso" field="ingressDate" /></div>
                                </div>
                                <TextAreaField displayName="Observações" field="notes" placeholder="Insira as observações do colaborador..." />
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
            )}
        </FormFillEmployee>
    );
}

interface FormEmployeeProps {
    title: string;
    model: EmployeeCreationDTO;
    error: string;
    buttons: (actions: UseFormReturn<EmployeeCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: EmployeeCreationDTO, actions: UseFormReturn<EmployeeCreationDTO>): void;
}

export default FormEmployee;