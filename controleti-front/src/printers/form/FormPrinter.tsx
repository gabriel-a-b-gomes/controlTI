import { ReactElement, useEffect } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

import { selectOptions } from "../../formshook/models/form.model";

import DateField from "../../formshook/DateField";
import FormArea from "../../formshook/boxes/FormArea";
import FormBox from "../../formshook/boxes/FormBox";
import SelectField from "../../formshook/SelectField";
import TextAreaField from "../../formshook/TextAreaField";
import TextField from "../../formshook/TextField";

import { PrinterCreationDTO } from "../models/printer.model";

import '../styles/PrinterStyles.css';
import DisplayErrors from "../../utils/alerts/DisplayErros";

const printerSchema = Yup.object({
    code: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    location: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    brand: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    model: Yup.string().required('Obrigatório').max(100, 'Máx. 100 caracteres'),
    type: Yup.number(),
    printerIP: Yup.string().max(100, 'Máx. 100 caracteres'),
    printerUser: Yup.string().max(100, 'Máx. 100 caracteres'),
    printerPassword: Yup.string().max(100, 'Máx. 100 caracteres'),
    supplies: Yup.string().max(100, 'Máx. 100 caracteres'),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, 'Aceita somente 100 caracteres'),
    serialNumber: Yup.string().max(100, 'Máx. 100 caracteres'),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    notes: Yup.string()
})

function FormPrinter(props: FormPrinterProps) {

    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(printerSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model])

    const typeOpts: selectOptions[] = [
        { display: "Padrão", value: 1 },
        { display: "Multifuncional", value: 2 },
        { display: "Etiqueta", value: 3 },
        { display: "Colorida", value: 4 }
    ];

    const statusAvaiable: selectOptions[] = [
        { display: "Ativo", value: 1 },
        { display: "Desativado", value: 0 }
    ];

    function onSubmit(data: PrinterCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormArea>
                    <div className="form-header">
                        <h1>{props.title}</h1>
                        {props.formHeaderOptions}
                    </div>
                    <div className="form-header-fields">
                        <TextField displayName="Código da Impressora *" placeholder="Insira o código da Impressora..." field="code" css="code" />
                        <TextField displayName="Localização *" placeholder="Insira a localização da Impressora..." field="location" css="location" />
                    </div>
                    <div className="form-middle-boxes">
                        <FormBox boxTitle="Informações Gerais" className="half">
                            <div className="form-fields two">
                                <TextField displayName="Marca *" field="brand" placeholder="Insira a marca..." css="small" />
                                <TextField displayName="Modelo *" field="model" placeholder="Insira o modelo..." css="small" />
                            </div>
                            <SelectField field="type" displayName="Tipo *" options={typeOpts} />
                        </FormBox>
                        <FormBox boxTitle="Configurações" className="half">
                            <div className="form-fields three">
                                <TextField displayName="IP da Impressora" field="printerIP" placeholder="Insira o IP..." css="small" />
                                <TextField displayName="Usuário" field="printerUser" placeholder="Insira o usuário..." css="small" />
                                <TextField displayName="Senha" field="printerPassword" placeholder="Insira a senha..." css="small" />
                            </div>
                            <TextField displayName="Suprimento" field="supplies" placeholder="Insira o suprimento..." css="small" />
                        </FormBox>
                    </div>
                    <FormBox boxTitle="Detalhes" className="details">
                        <div className="form-fields-sideside">
                            <div className="form-fields three">
                                <TextField displayName="Número do Ativo" field="assetNumber" placeholder="Insira o número do ativo..." css="asset" />
                                <TextField displayName="Número de Série" field="serialNumber" placeholder="Insira o número de série..." css="asset" />
                                <SelectField displayName="Status" field="status" options={statusAvaiable} />
                            </div>
                            <div className="date-field-area">
                                <DateField displayName="Data de Aquisição" field="acquisitionDate" />
                            </div>
                        </div>
                        <TextAreaField field='notes' displayName='Observações' placeholder='Insira as observações da Impressora...' />
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

interface FormPrinterProps {
    title: string;
    model: PrinterCreationDTO;
    error: string;
    formHeaderOptions?: ReactElement;
    buttons: (actions: UseFormReturn<PrinterCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: PrinterCreationDTO, actions: UseFormReturn<PrinterCreationDTO>): void;
}

export default FormPrinter;