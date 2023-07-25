import { ReactElement, useEffect } from "react";

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { NetworkNodeCreationDTO } from "../models/networknodes.model";
import FormArea from "../../formshook/boxes/FormArea";
import TextField from "../../formshook/TextField";
import SelectField from "../../formshook/SelectField";
import FormBox from "../../formshook/boxes/FormBox";
import TextAreaField from "../../formshook/TextAreaField";

import '../styles/NodesStyles.css';
import DisplayErrors from "../../utils/alerts/DisplayErros";
import FillNodeForm from "./FillNodeForm";

const nodeSchema = Yup.object({
    code: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    location: Yup.string().required("Obrigatório").max(200, "Máx. 200 caracteres"),
    patchPanelLocation: Yup.string().max(200, "Máx. 200 caracteres").nullable(true),
    patchPanelNodeId: Yup.string().max(75, "Máx. 75 caracteres").nullable(true),
    patchPanelPort: Yup.number().integer("Deve ser inteiro").transform((value) => (isNaN(value) || value === null) ? undefined : value).nullable(true),
    switchPort: Yup.number().positive("Deve ser positivo").integer("Deve ser inteiro").typeError("Número inválido"),
    switchId: Yup.number().min(1, "Selecione um switch"),
    employeeId: Yup.number(),
    notes: Yup.string()
})

function FormNetworkNode(props: FormNetworkNodeProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(nodeSchema)
    });

    useEffect(() => {
        methods.reset(props.model)
    }, [props.model]);

    function onSubmit(data: NetworkNodeCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FillNodeForm>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="form-node">
                        <FormArea>
                            <div className="form-header">
                                <h1>{props.title}</h1>
                                {props.formHeaderOptions}
                            </div>
                            <div className="form-n-fields-header">
                                <TextField displayName="Identificação *" field="code" placeholder="Insira o identificador do ponto..." css="auto" />
                                <TextField displayName="Localização *" field="location" placeholder="Insira a localização do ponto..." css="auto" />
                                <SelectField displayName="Colaborador" field="employeeId" options={fill.employees} />
                            </div>
                            <div className="form-n-fields-row">
                                <FormBox boxTitle="No Patch Panel" className="half">
                                    <div className="form-n-fields">
                                        <TextField displayName="Etiqueta" field="patchPanelNodeId" placeholder="Insira a etiqueta do ponto..." css="patch" />
                                        <TextField displayName="Local" field="patchPanelLocation" placeholder="Insira o local do patch panel..." css="patch" />
                                        <TextField type="number" displayName="Porta" field="patchPanelPort" placeholder="Insira a porta do ponto no patch..." css="small" />
                                    </div>
                                </FormBox>
                                <FormBox boxTitle="No Switch" className="half">
                                    <div className="form-n-fields-bt">
                                        <SelectField displayName="Switch *" field="switchId" options={fill.switches} />
                                        <div><TextField type="number" displayName="Porta do Switch *" field="switchPort" placeholder="Insira a porta do ponto no switch..." css="switch" /></div>
                                    </div>
                                </FormBox>
                            </div>
                            <FormBox boxTitle="Detalhes" className="details">
                                <TextAreaField displayName='Observações' field='notes' placeholder='Insira as observações do ponto de rede...' />
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
        </FillNodeForm>
    );
}

interface FormNetworkNodeProps {
    title: string;
    model: NetworkNodeCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<NetworkNodeCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: NetworkNodeCreationDTO, actions: UseFormReturn<NetworkNodeCreationDTO>): void;
}

export default FormNetworkNode;