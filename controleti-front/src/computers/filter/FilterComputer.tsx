import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';

import { ComputerFilterDTO } from "../models/computer.model";
import FillFilterComputer from './FillFilterComputer';

import '../styles/FilterComputerStyles.css';

function FilterComputer(props: FilterComputerProps) {
    const methods = useForm({
        defaultValues: props.extra
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "classification" | "statusFilter" | "computerTypeFilter" | "profileFilter" | "storageTypeFilter" | "fromStorageSize" | "toStorageSize" | "fromMemorySize" | "toMemorySize" | "fromLastPreventive" | "toLastPreventive"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: ComputerFilterDTO) {
        data.toMemorySize = handleFieldEmpty("toMemorySize");
        data.fromMemorySize = handleFieldEmpty("fromMemorySize");
        data.toStorageSize = handleFieldEmpty("toStorageSize");
        data.fromStorageSize = handleFieldEmpty("fromStorageSize");
        data.toLastPreventive = handleFieldEmpty("toLastPreventive");
        data.fromLastPreventive = handleFieldEmpty("fromLastPreventive");

        props.onSubmit(data);
    }

    return (
        <FillFilterComputer>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container computer'>
                            <div className='filter-fields'>
                                <SelectField field='classification' displayName='Classificação' options={fill.computerClassification} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <SelectField field='computerTypeFilter' displayName='Tipo' options={fill.computerTypes} />
                                <SelectField field='profileFilter' displayName='Perfil de Uso' options={fill.profiles} />
                                <SelectField field='storageTypeFilter' displayName='Tipo de Armazenamento' options={fill.storageTypes} />
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromStorageSize' displayName='Armazenamento (GB)' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toStorageSize' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromMemorySize' displayName='Memória (GB)' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toMemorySize' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <DateField field='fromLastPreventive' displayName='Data da Última Preventiva' />
                                    <span> até </span>
                                    <DateField field='toLastPreventive' displayName='' />
                                </div>
                            </div>
                            <div className='filter-buttons'>
                                <button type='submit' className='filter'>Filtrar</button>
                                <button type='button' className='clear' onClick={clear} title="Limpar Filtro"><AiOutlineClear /></button>
                            </div>
                        </div>

                        
                    </form>
                </FormProvider>
            )}
        </FillFilterComputer>
    );
}

interface FilterComputerProps {
    base: ComputerFilterDTO;
    extra: ComputerFilterDTO;
    onSubmit(values: ComputerFilterDTO, hasToClear?: boolean): void;
}

export default FilterComputer;