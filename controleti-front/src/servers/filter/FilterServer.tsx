import { useForm, FormProvider } from 'react-hook-form';
import { ServerFilterDTO } from '../models/host.model';
import FillFilterServer from './FillFilterServer';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';
import DateField from '../../formshook/DateField';
import { AiOutlineClear } from 'react-icons/ai';

import '../styles/FilterServerStyles.css';

function FilterServer(props: FilterServerProps) {
    const methods = useForm({
        defaultValues: props.extra
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "fromMemorySize" | "toMemorySize" | "fromStorageSize" | "toStorageSize" | "fromAcquisionDate" | "toAcquisitionDate" | "fromLastPreventive" | "toLastPreventive"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: ServerFilterDTO) {
        data.toMemorySize = handleFieldEmpty("toMemorySize");
        data.fromMemorySize = handleFieldEmpty("fromMemorySize");
        data.toStorageSize = handleFieldEmpty("toStorageSize");
        data.fromStorageSize = handleFieldEmpty("fromStorageSize");
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisionDate = handleFieldEmpty("fromAcquisionDate");
        data.toLastPreventive = handleFieldEmpty("toLastPreventive");
        data.fromLastPreventive = handleFieldEmpty("fromLastPreventive");

        props.onSubmit(data);
    }

    return (
        <FillFilterServer>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container server'>
                            <div className='filter-fields'>
                                <SelectField field='hostFunctionality' displayName='Funcionalidade (Host)' options={fill.functionalities} />
                                <SelectField field='vmFunctionality' displayName='Funcionalidade (VM)' options={fill.functionalities} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromStorageSize' displayName='Armazenamento' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toStorageSize' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromMemorySize' displayName='Memória (GB)' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toMemorySize' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <DateField field='fromAcquisitionDate' displayName='Data de Aquisição' />
                                    <span> até </span>
                                    <DateField field='toAcquisitionDate' displayName='' />
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
        </FillFilterServer>
    );
}

interface FilterServerProps {
    base: ServerFilterDTO;
    extra: ServerFilterDTO;
    onSubmit(values: ServerFilterDTO, hasToClear?: boolean): void;
}

export default FilterServer;