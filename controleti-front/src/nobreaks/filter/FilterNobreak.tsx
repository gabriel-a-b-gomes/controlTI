import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';

import FilterFillNobreak from "./FilterFillNobreak";
import { NobreakFilterDTO } from "../models/nobreak.model";

import '../styles/FilterNobreakStyles.css';

function FilterNobreak(props: FilterNobreakProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "fromQtdeVA" | "toQtdeVA" | "fromAcquisitionDate" | "toAcquisitionDate" | "fromLastPreventive" | "toLastPreventive"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: NobreakFilterDTO) {
        data.toQtdeVA = handleFieldEmpty("toQtdeVA");
        data.fromQtdeVA = handleFieldEmpty("fromQtdeVA");
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");
        data.toLastPreventive = handleFieldEmpty("toLastPreventive");
        data.fromLastPreventive = handleFieldEmpty("fromLastPreventive");

        props.onSubmit(data);
    }

    return (
        <FilterFillNobreak>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container nobreak'>
                            <div className='filter-fields'>
                                <SelectField field='filterSenoidal' displayName='Class. Senoidal' options={fill.senoidalOptions} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <SelectField field='typeOfUse' displayName='Tipo de Uso' options={fill.typesOfUse} />
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromQtdeVA' displayName='Qtde. de VA' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toQtdeVA' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <DateField field='fromAcquisitionDate' displayName='Aquisição' />
                                    <span> até </span>
                                    <DateField field='toAcquisitionDate' displayName='' />
                                </div>
                                <div className='field-from-to'>
                                    <DateField field='fromLastPreventive' displayName='Última Preventiva' />
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
        </FilterFillNobreak>
    );
}

interface FilterNobreakProps {
    base: NobreakFilterDTO;
    model: NobreakFilterDTO;
    onSubmit(extra: NobreakFilterDTO, hasToClear?: boolean): void;
}

export default FilterNobreak;