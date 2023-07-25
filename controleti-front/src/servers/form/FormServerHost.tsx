import { ReactElement, useEffect } from 'react';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

import FormArea from '../../formshook/boxes/FormArea';
import { ServerHostCreationDTO } from '../models/host.model';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../formshook/TextField';
import FormBox from '../../formshook/boxes/FormBox';
import ArrayField from '../../formshook/ArrayField';
import { MemoryCreationDTO, StorageCreationDTO } from '../../computers/models/computer.components.model';
import SelectField from '../../formshook/SelectField';
import DateField from '../../formshook/DateField';
import TextAreaField from '../../formshook/TextAreaField';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import MultiSelect from '../../formshook/MultiSelect';
import FillFormServerHost from './FillFormServerHost';
import { selectOptions } from '../../formshook/models/form.model';

import '../styles/FormServerHostStyles.css';

const hostSchema = Yup.object({
    code: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    machineBrand: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    machineModel: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    processorModelDescription: Yup.string().required("Obrigatório").max(200, "Máx. 200 caracteres"),
    processorFrequency: Yup.string().required("Obrigatório").max(50, "Máx. 50 caracteres"),
    operationalSystemDescription: Yup.string().required("Obrigatório").max(150, "Máx. 150 caracteres"),
    status: Yup.number(),
    assetNumber: Yup.string().max(100, "Máx. 100 caracteres"),
    acquisitionDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    lastPreventiveDate: Yup.date().transform((curr, orig) => orig === '' || curr === '' ? undefined : curr).typeError('Data Inválida'),
    ticketId: Yup.string().max(100, "Máx. 100 caracteres").nullable(true),
    notes: Yup.string(),

    memories: Yup.array().of(
        Yup.object({
            model: Yup.string().required("Obrigatório").max(200, "Máx. 200 caracteres"),
            memoryPentSize: Yup.number().positive("> 0").typeError("Número Inválido"),
            qtde: Yup.number().positive("> 0").typeError("Número Inválido")
        })
    ),

    storages: Yup.array().of(
        Yup.object({
            type: Yup.string(),
            brand: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
            storageSize: Yup.number().positive("> 0").typeError("Número Inválido"),
            qtde: Yup.number().positive("> 0").typeError("Número Inválido")
        })
    )
});

function FormServerHost(props: FormServerHostProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(hostSchema)
    });

    useEffect(() => {
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: ServerHostCreationDTO) {
        // Funcionalidades -----------------

        let funcs: selectOptions[] = data.functionalitySelected;
        let funcsIds: number[] = [];

        funcs.forEach(func => {
            funcsIds.push(func.value);
        });

        data.funcsIds = funcsIds;

        // Memorias -----------------

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

        // Storages -----------------

        let totalAmountOfStorages: number = 0;

        let storages: StorageCreationDTO[] = [];
        i = 0;
        j = 0;

        while (i < data.storages.length) {
            let storage: StorageCreationDTO = data.storages[i];
            storages.push(storage);

            if (!storage.qtde) storage.qtde = 1;

            j = i + 1;
            while (j < data.storages.length) {
                let dupstorage: StorageCreationDTO = data.storages[j];

                if (!dupstorage.qtde) dupstorage.qtde = 1;

                if (storage.brand === dupstorage.brand && storage.storageSize === dupstorage.storageSize && storage.type === dupstorage.type) {
                    storage.qtde += dupstorage.qtde;
                    data.storages.splice(j, 1);
                }
                j++;
            }
            i++;
        }

        data.storages = storages;

        data.storages.forEach(storage => 
            totalAmountOfStorages += storage.storageSize * storage.qtde!
        );

        data.storageSize = totalAmountOfStorages;

        // Save data

        props.onSubmit(data, methods);
    }

    return (
        <FillFormServerHost>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='form-srv-host'>
                        <FormArea>
                            <div className="form-header">
                                <h1>{props.title}</h1>
                                {props.formHeaderOptions}
                            </div>

                            <div className='form-host-header-fields'>
                                <TextField displayName='Código *' field='code' placeholder='Insira o código do servidor host...' css='code' />
                                <TextField displayName='Marca do Servidor *' field='machineBrand' placeholder='Insira a marca do servidor host...' css='auto' />
                                <TextField displayName='Modelo do Servidor *' field='machineModel' placeholder='Insira o modelo do servidor host...' css='auto' />
                            </div>
                            <FormBox boxTitle='Informações Gerais' className='side-side'>
                                <div className='form-host-fields three'>
                                    <TextField displayName='Processador *' field='processorModelDescription' placeholder='Insira o modelo e geração do processador...' css='big' />
                                    <TextField displayName='Frequência do Processador *' field='processorFrequency' placeholder='Insira a frequência do processador...' css='small' />
                                    <TextField displayName='Sistema Operacional *' field='operationalSystemDescription' placeholder='Insira o sistema operacional do servidor...' css='auto' />
                                </div>
                                <div className='form-host-fields funcs'>
                                    <MultiSelect displayName='Funcionalidades' 
                                        placeholder='Selecione as funcionalidades do servidor' 
                                        selected={props.model.functionalitySelected} 
                                        setSelectedPool={(selectedOptions) => methods.setValue('functionalitySelected', selectedOptions)}
                                        options={fill.functionalities}
                                    />
                                </div>
                            </FormBox>
                            <div className='form-host-boxes'>
                                <FormBox boxTitle='Armazenamento' className='half'>
                                    <ArrayField<StorageCreationDTO> field='storages' default={{ brand: '', storageSize: 0, type: 'HD', qtde: 0 }}>
                                        {(index) => (
                                            <div className='form-host-fields four storage'>
                                                <TextField type='number' displayName='Espaço (TB) *' field={`storages.${index}.storageSize`} placeholder="Espaço (TB)..." css='small' />
                                                <TextField displayName='Marca *' field={`storages.${index}.brand`} placeholder='Insira a marca deste armazenamento...' css='auto' />
                                                <SelectField displayName='Tipo *' field={`storages.${index}.type`} options={fill.storageTypes} />
                                                <TextField type='number' displayName='Qtde *' field={`storages.${index}.qtde`} placeholder="Qtde deste armazenamento..." css='small' />
                                            </div>
                                        )}
                                    </ArrayField>
                                </FormBox>
                                <FormBox boxTitle='Memórias' className='half'>
                                    <ArrayField<MemoryCreationDTO> field='memories' default={{ model: '', memoryPentSize: 0, qtde: 0 }}>
                                        {(index) => (
                                            <div className='form-host-fields three memos'>
                                                <TextField displayName='Modelo *' field={`memories.${index}.model`} placeholder='Insira o modelo da memória...' css='auto' />
                                                <TextField type='number' displayName='Tamanho (GB) *' field={`memories.${index}.memoryPentSize`} placeholder="Tamanho (GB)..." css='small' />
                                                <TextField type='number' displayName='Qtde *' field={`memories.${index}.qtde`} placeholder="Qtde desse pent..." css='small' />
                                            </div>
                                        )}
                                    </ArrayField>
                                </FormBox>
                            </div>
                            <FormBox boxTitle='Detalhes' className='details'>
                                <div className='form-host-fields-sideside'>
                                    <div className='form-host-fields two'>
                                        <TextField displayName='Ativo' field='assetNumber' placeholder='Insira o número do ativo...' css='asset' />
                                        <SelectField displayName='Status' field='status' options={fill.status} />
                                    </div>
                                    <div className='form-host-fields three'>
                                        <DateField displayName='Data de Aquisição' field='acquisitionDate' />
                                        <DateField displayName='Última Preventiva' field='lastPreventiveDate' />
                                        <TextField displayName='Ticket da Preventiva' field='ticketId' placeholder='Insira o id do ticket...' css='small' />
                                    </div>
                                </div>
                                <TextAreaField displayName="Observações" field="notes" placeholder="Insira as observações do servidor host..." />
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
        </FillFormServerHost>
    );
}

interface FormServerHostProps {
    title: string;
    model: ServerHostCreationDTO;
    formHeaderOptions?: ReactElement;
    error: string;
    children: ReactElement;
    buttons: (actions: UseFormReturn<ServerHostCreationDTO>) => ReactElement;
    onSubmit(values: ServerHostCreationDTO, actions: UseFormReturn<ServerHostCreationDTO>): void;
}

export default FormServerHost;