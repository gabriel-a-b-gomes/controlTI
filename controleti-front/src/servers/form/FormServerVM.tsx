import { ReactElement, useEffect} from "react";
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';

// Interfaces
import { ServerVMCreationDTO } from "../models/vm.model";

import FormArea from "../../formshook/boxes/FormArea";
import TextField from "../../formshook/TextField";
import SelectField from "../../formshook/SelectField";
import FormBox from "../../formshook/boxes/FormBox";
import MultiSelect from "../../formshook/MultiSelect";
import TextAreaField from "../../formshook/TextAreaField";
import DateField from "../../formshook/DateField";
import { selectOptions } from "../../formshook/models/form.model";
import FillFormServerVM from "./FillFormServerVM";
import DisplayErrors from "../../utils/alerts/DisplayErros";

import '../styles/FormServerVMStyles.css';

const virtualMachineSchema = Yup.object({
    code: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    operationalSystem: Yup.string().required("Obrigatório").max(150, "Máx. 150 caracteres"),
    memorySize: Yup.number().required().positive("Deve ser positivo").typeError("Número inválido"),
    storageSize: Yup.number().required().positive("Deve ser positivo").typeError("Número inválido"),
    status: Yup.number(),
    setupDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string(),
    serverHostId: Yup.number().positive("Selecione um host")
});

function FormServerVM(props: FormServerVMProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(virtualMachineSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: ServerVMCreationDTO) {
        // Funcionalidades ------------------

        let funcs: selectOptions[] = data.functionalitySelected;
        let funcsIds: number[] = [];

        funcs.forEach(func => {
            funcsIds.push(func.value);
        });

        data.funcsIds = funcsIds;

        // Save Data

        props.onSubmit(data, methods);
    }

    return (
        <FillFormServerVM>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="form-vm-host">
                        <FormArea>
                            <div className="form-header">
                                <h1>{props.title}</h1>
                                {props.formHeaderOptions}
                            </div>

                            <div className="form-vm-header-fields">
                                <TextField field="code" displayName="Código *" placeholder="Insira o código da VM..." css="code" />
                                <SelectField field="serverHostId" displayName="Servidor Host *" options={fill.hosts} />
                            </div>

                            <div className="form-vm-boxes">
                                <FormBox boxTitle="Informações Gerais" className="side-side">
                                    <div className="form-vm-fields three">
                                        <TextField field="operationalSystem" displayName="Sistema Operacional *" placeholder="Insira o sistema operacional..." css="auto" />
                                        <TextField type="number" field="memorySize" displayName="Qtde. de Memória (GB) *" placeholder="Insira a qtde. de memória..." css="small" />
                                        <TextField type="number" field="storageSize" displayName="Qtde. de Armazenamento (GB) *" placeholder="Insira a qtde. de armazenamento..." css="auto" />
                                    </div>
                                    <div className="form-vm-fields funcs">
                                        <MultiSelect 
                                            placeholder="Selecione as funcionalidades do servidor"
                                            displayName="Funcionalidades"
                                            selected={props.model.functionalitySelected}
                                            setSelectedPool={(newSelected) => methods.setValue("functionalitySelected", newSelected)}
                                            options={fill.functionalities}
                                        />
                                    </div>
                                </FormBox>
                            </div>
                            <FormBox boxTitle="Detalhes" className="details">
                                <div className="form-vm-details-fields">
                                    <div className="form-vm-fields">
                                        <SelectField field="status" displayName="Status" options={fill.status} />
                                    </div>
                                    <div className="form-vm-fields">
                                        <DateField field="setupDate" displayName="Última Formatação" />
                                    </div>
                                </div>
                                <TextAreaField displayName="Observações" field="notes" placeholder="Insira as observações da máquina virtual..." />
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
        </FillFormServerVM>
    );
}

interface FormServerVMProps {
    title: string;
    model: ServerVMCreationDTO;
    formHeaderOptions?: ReactElement;
    error: string;
    children: ReactElement;
    buttons: (actions: UseFormReturn<ServerVMCreationDTO>) => ReactElement;
    onSubmit(values: ServerVMCreationDTO, actions: UseFormReturn<ServerVMCreationDTO>): void;
}

export default FormServerVM;