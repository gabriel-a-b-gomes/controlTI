import { ReactElement, useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormReturn, FormProvider } from "react-hook-form";
import * as Yup from 'yup';

import { ChipCreationDTO } from "../models/chip.model";
import TextField from "../../formshook/TextField";
import SelectField from "../../formshook/SelectField";
import FormArea from "../../formshook/boxes/FormArea";
import FormBox from "../../formshook/boxes/FormBox";
import TextSelectField from "../../formshook/TextSelectField";
import DateField from "../../formshook/DateField";
import TextAreaField from "../../formshook/TextAreaField";
import CellphoneList from "../components/CellphoneList";
import DisplayErrors from "../../utils/alerts/DisplayErros";

import '../styles/ChipStyles.css';
import { CellPhoneCreationDTO } from "../models/cellphone.model";
import FormFillChip from "./FormFillChip";

const chipSchema = Yup.object({
    number: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    status: Yup.number(),
    account: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    type: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    acctualICCID: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    assetNumber: Yup.string().max(100, "Máx. 100 caracteres"),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string(),
    departmentId: Yup.number().nullable(true),
    employeeId: Yup.number().nullable(true),

    cellPhone: Yup.object({
        model: Yup.string().max(100, "Máx. 100 caracteres"),
        memorySize: Yup.number().notRequired().transform((value) => (isNaN(value) || value === null) ? undefined : value).nullable(true).typeError("Memória Inválida"),
        storageSize: Yup.number().notRequired().transform((value) => (isNaN(value) || value === null) ? undefined : value).nullable(true).typeError("Armaz. Inválido"),
        processingUnit: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
        operationalSystem: Yup.string().max(100, "Máx. 100 caracteres").nullable(true)
    })
})

function FormChip(props: FormChipProps) {
    const [cellphone, setCellphone] = useState<CellPhoneCreationDTO | undefined>(undefined);

    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(chipSchema)
    });

    useEffect(() => {
        methods.reset(props.model);

        if (props.model.cellPhone)
            setCellphone(props.model.cellPhone)
    }, [props.model]);

    useEffect(() => {
        if (cellphone) {
            methods.setValue('cellPhone.model', cellphone.model);
            methods.setValue('cellPhone.memorySize', cellphone.memorySize);
            methods.setValue('cellPhone.storageSize', cellphone.storageSize);
            methods.setValue('cellPhone.operationalSystem', cellphone.operationalSystem);
            methods.setValue('cellPhone.processingUnit', cellphone.processingUnit);
        }
    }, [cellphone]);

    function onSubmit(data: ChipCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormFillChip>
            {(fill) => (
                <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="form-chip">
                    <FormArea>
                        <div className="form-header">
                            <h1>{props.title}</h1>
                            {props.formHeaderOptions}
                        </div>
                        <div className="form-chip-header-fields">
                            <TextField displayName="Número do Chip *" field="number" placeholder="Insira o número do chip..." css="code-name" mask={["(99) 99999-9999", "(99) 9999-9999"]} />
                            <SelectField displayName="Departmento" field="departmentId" options={fill.departments} />
                            <SelectField displayName="Colaborador" field="employeeId" options={fill.employees} />
                        </div>
                        <div className="form-chip-boxes">
                            <FormBox boxTitle="Informações do Chip" className="big-half">
                                <TextField displayName="Conta *" field="account" placeholder="Insira a conta referente ao chip..." css="auto" />
                                <TextField displayName="Tipo *" field="type" placeholder="Insira o tipo do chip..." css="auto" />
                                <TextField displayName="ICCID Atual *" field="acctualICCID" placeholder="Insira o ICCID atual do chip..." css="auto" />
                            </FormBox>
                            <FormBox boxTitle="Informações do Aparelho" className="big-half">
                                <TextSelectField displayName="Modelo" field="cellPhone.model" modalTitle="Celulares" placeholder="Insira o modelo do aparelho..." css="auto" >
                                    <CellphoneList cellphones={fill.cellphones} selectedCellPhone={cellphone} onChangeCellphone={(newPhone) => setCellphone(newPhone)} />
                                </TextSelectField>
                                <div className="form-chip-fields two">
                                    <TextField displayName="Memória RAM" field="cellPhone.memorySize" placeholder="Insira a memória RAM do celular..." css="auto" />
                                    <TextField displayName="Armazenamento" field="cellPhone.storageSize" placeholder="Insira a quantidade de armaz. em GB..." css="auto" />
                                </div>
                                <div className="form-chip-fields two">
                                    <TextField displayName="Processador" field="cellPhone.processingUnit" placeholder="Insira o modelo do processador..." css="auto" />
                                    <TextField displayName="Sistema Operacional" field="cellPhone.operationalSystem" placeholder="Insira o modelo e versão do SO..." css="auto" />
                                </div>
                            </FormBox>
                        </div>
                        <FormBox boxTitle="Detalhes" className="details">
                            <div className="form-chip-fields-sideside">
                                <div className="form-chip-fields two">
                                    <TextField displayName="Número do Ativo" field="assetNumber" placeholder="Insira o número do ativo..." css="asset" />
                                    <SelectField displayName="Status" field="status" options={fill.status} />
                                </div>
                                <div className="form-chip-fields one">
                                    <DateField displayName="Data de Aquisição" field="acquisitionDate" />
                                </div>
                            </div>
                            <TextAreaField displayName="Observações" field="notes" placeholder="Insira as observações do chip..." />
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
        </FormFillChip>
    );
}

interface FormChipProps {
    title: string;
    model: ChipCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<ChipCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: ChipCreationDTO, actions: UseFormReturn<ChipCreationDTO>): void;
}

export default FormChip;