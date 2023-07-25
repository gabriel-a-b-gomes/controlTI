import { ReactElement, useEffect } from 'react';

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { ComputerCreationDTO } from "../models/computer.model";

import * as Yup from 'yup';

import FormArea from '../../formshook/boxes/FormArea';
import TextField from '../../formshook/TextField';
import SelectField from '../../formshook/SelectField';
import FormBox from '../../formshook/boxes/FormBox';
import ArrayField from '../../formshook/ArrayField';
import TextAreaField from '../../formshook/TextAreaField';
import DateField from '../../formshook/DateField';
import DisplayErrors from '../../utils/alerts/DisplayErros';

import '../styles/ComputerStyles.css';
import { MemoryCreationDTO } from '../models/computer.components.model';
import FillComputer from './FillComputer';

const computerSchema = Yup.object({
    code: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    computerType: Yup.number(),
    operationalSystem: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    rankOperationalSystem: Yup.number(),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, "Máx. 100 caracteres"),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    lastPreventiveDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    ticketId: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
    notes: Yup.string(),

    departmentId: Yup.number().notRequired().nullable(true),
    employeeId: Yup.number().notRequired().nullable(true),
    profileId: Yup.number().min(1, "Obrigatório"),

    processingUnit: Yup.object({
        model: Yup.string().required("Obrigatório").max(150, "Máx. 150 caracteres"),
        generation: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
        frequency: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
        rankProcessingUnit: Yup.number()
    }),

    storage: Yup.object({
        type: Yup.string(),
        brand: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
        storageSize: Yup.number().positive("Deve ser positivo").typeError("Número Inválido")
    }),
    
    memories: Yup.array().of(
        Yup.object({
            model: Yup.string().required("Obrigatório").max(200, "Máx. 200 caracteres"),
            memoryPentSize: Yup.number().positive("Deve ser positivo").typeError("Número Inválido"),
            qtde: Yup.number().positive("Deve ser positivo").typeError("Número Inválido")
        })
    )
});

function FormComputer(props: FormComputerProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(computerSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: ComputerCreationDTO) {
        let totalAmountOfMemory: number = 0;

        let memories: MemoryCreationDTO[] = [];
        let i = 0, j = 0;

        while (i < data.memories.length) {
            let memory: MemoryCreationDTO = data.memories[i];
            memories.push(memory);
            j = i + 1;
            while (j < data.memories.length) {
                let dupMemory: MemoryCreationDTO = data.memories[j];
                if (memory.model === dupMemory.model && memory.memoryPentSize === dupMemory.memoryPentSize) {
                    memory.qtde += dupMemory.qtde;
                    data.memories.splice(j, 1);
                }
                j++;
            }
            i++;
        }

        data.memories = memories;

        data.memories.forEach(memory => 
            totalAmountOfMemory += memory.memoryPentSize * memory.qtde
        );

        data.memorySize = totalAmountOfMemory;

        props.onSubmit(data, methods);
    }

    return (
        <FillComputer>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="form-computer">
                        <FormArea>
                            <div className="form-header">
                                <h1>{props.title}</h1>
                                {props.formHeaderOptions}
                            </div>

                            <div className='form-computer-header-fields'>
                                <TextField displayName='Código do Computador *' field='code' placeholder='Insira o código do computador...' css='code' />
                                <SelectField displayName='Departamento' field='departmentId' options={fill.departments} />
                                <SelectField displayName='Colaborador' field='employeeId' options={fill.employees} /> 
                                <SelectField displayName='Tipo' field='computerType' options={fill.computerTypes} />
                            </div>
                            <div className='form-computer-boxes'>
                                <FormBox boxTitle='Armazenamento' className='half'>
                                    <div className='form-computer-fields three'>
                                        <TextField type='number' displayName='Espaço (GB) *' field='storage.storageSize' placeholder='Espaço (GB) ...' css='small' />
                                        <SelectField displayName='Tipo *' field='storage.type' options={fill.storageTypes} />
                                        <TextField displayName='Marca *' field='storage.brand' placeholder='Insira a marca do dispositivo...' css='auto' />
                                    </div>
                                </FormBox>
                                <FormBox boxTitle='Sistema Operacional' className='half'>
                                    <div className='form-computer-fields two'>
                                        <TextField displayName='Versão *' field='operationalSystem' placeholder='Insira a versão do sist. operacional...' css='auto' />
                                        <SelectField displayName='Classificação' field='rankOperationalSystem' options={fill.soRanks} />
                                    </div>
                                </FormBox>
                            </div>
                            <FormBox boxTitle='Processador' className='side-side'>
                                <div className='form-computer-fields processor three'>
                                    <TextField displayName='Modelo *' field='processingUnit.model' placeholder='Insira o modelo do processador...' css='auto' />
                                    <TextField displayName='Geração *' field='processingUnit.generation' placeholder='Insira a geração...' css='small' />
                                    <TextField displayName='Frequência *' field='processingUnit.frequency' placeholder='Insira a frequêcia do processador...' css='auto' />
                                </div>
                                <div className='form-computer-fields one'>
                                    <SelectField displayName='Classificação' field='processingUnit.rankProcessingUnit' options={fill.processorRanks} />
                                </div>
                            </FormBox>
                            <FormBox boxTitle='Memórias' className='side-side'>
                                <ArrayField<MemoryCreationDTO> field='memories' default={{ model: '', memoryPentSize: 0, qtde: 0 }}>
                                    {(index) => (
                                        <div className='form-computer-fields three'>
                                            <TextField displayName='Modelo *' field={`memories.${index}.model`} placeholder="Insira o modelo da memória..." css='auto' />
                                            <TextField type='number' displayName='Tamanho (GB) *' field={`memories.${index}.memoryPentSize`} placeholder="Tamanho (GB)..." css='auto' />
                                            <TextField type='number' displayName='Qtde *' field={`memories.${index}.qtde`} placeholder="Qtde desse pent..." css='auto' />
                                        </div>
                                    )}
                                </ArrayField>
                            </FormBox>
                            <FormBox boxTitle='Detalhes' className='details'>
                                <div className='form-computer-fields-sideside'>
                                    <div className='form-computer-fields three'>
                                        <TextField displayName='Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                        <SelectField displayName='Perfil de uso *' field='profileId' options={fill.profiles} />
                                        <SelectField displayName='Status' field='status' options={fill.status} />
                                    </div>
                                    <div className='form-computer-fields three'>
                                        <DateField displayName='Data de Aquisição' field='acquisitionDate' />
                                        <DateField displayName='Última Preventiva' field='lastPreventiveDate' />
                                        <TextField displayName='Ticket da Preventiva' field='ticketId' placeholder='Insira o id do ticket...' css='small' />
                                    </div>
                                </div>
                                <TextAreaField displayName="Observações" field="notes" placeholder="Insira as observações do computador..." />
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
        </FillComputer>
    );
}  

interface FormComputerProps {
    title: string;
    model: ComputerCreationDTO;
    error: string;
    formHeaderOptions: ReactElement;
    buttons: (actions: UseFormReturn<ComputerCreationDTO>) => ReactElement;
    children: ReactElement;
    onSubmit(values: ComputerCreationDTO, actions: UseFormReturn<ComputerCreationDTO>): void;
}

export default FormComputer;