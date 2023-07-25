import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';
import FilterFillPrinter from "./FilterFillPrinter";
import { PrinterFilterDTO } from "../models/printer.model";

import '../styles/FilterPrinterStyles.css';

function FilterPrinter(props: FilterPrinterProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "fromAcquisitionDate" | "toAcquisitionDate"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: PrinterFilterDTO) {
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");

        props.onSubmit(data);
    }

    return (
        <FilterFillPrinter>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container printer'>
                            <div className='filter-fields'>
                                <SelectField field='type' displayName='Tipo' options={fill.types} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <TextField field='printerIp' displayName='IP da Impressora' placeholder='000.000.000.000' css='s-small' />
                                <TextField field='printerUser' displayName='Usuário' placeholder='Procure pelo usuário...' css='s-small' />
                                <TextField field='printerPassword' displayName='Senha' placeholder='Procure pela senha...' css='s-small' />
                                <div className='field-from-to'>
                                    <DateField field='fromAcquisitionDate' displayName='Aquisição' />
                                    <span> até </span>
                                    <DateField field='toAcquisitionDate' displayName='' />
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
        </FilterFillPrinter>
    );
}

interface FilterPrinterProps {
    base: PrinterFilterDTO;
    model: PrinterFilterDTO;
    onSubmit(extra: PrinterFilterDTO, hasToClear?: boolean): void;
}

export default FilterPrinter;