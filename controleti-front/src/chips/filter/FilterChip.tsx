import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';
import { ChipFilterDTO } from "../models/chip.model";
import FilterFillChip from './FilterFillChip';

import '../styles/FilterChipStyles.css';

function FilterChip(props: FilterChipProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "toCellphoneMemorySize" | "toCellphoneStorageSize" | "fromAcquisitionDate" | "toAcquisitionDate"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: ChipFilterDTO) {
        data.toCellphoneMemorySize = handleFieldEmpty("toCellphoneMemorySize");
        data.toCellphoneStorageSize = handleFieldEmpty("toCellphoneStorageSize");
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");

        props.onSubmit(data);
    }

    return (
        <FilterFillChip>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container chip'>
                            <div className='filter-fields'>
                                <SelectField field='typeFilter' displayName='Classificação' options={fill.types} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <div className='field-from-to'>
                                    <DateField field='fromAcquisitionDate' displayName='Data de Aquisição' />
                                    <span> até </span>
                                    <DateField field='toAcquisitionDate' displayName='' />
                                </div>
                                <TextField field='deepFilterCellphone' displayName='Celular' placeholder='Buscar por modelo, processador ou SO...' css='s-small' />
                                <SelectField field='toCellphoneMemorySize' displayName='Memória até...' options={fill.cellphoneMemorySizes} />
                                <SelectField field='toCellphoneStorageSize' displayName='Armazenamento até...' options={fill.cellphoneStorageSizes} />
                            </div>
                            <div className='filter-buttons'>
                                <button type='submit' className='filter'>Filtrar</button>
                                <button type='button' className='clear' onClick={clear} title="Limpar Filtro"><AiOutlineClear /></button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            )}
        </FilterFillChip>
    );
}

interface FilterChipProps {
    base: ChipFilterDTO;
    model: ChipFilterDTO;
    onSubmit(extra: ChipFilterDTO, hasToClear?: boolean): void;
}

export default FilterChip;