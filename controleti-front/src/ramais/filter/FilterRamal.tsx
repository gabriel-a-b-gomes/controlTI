import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from "react-icons/ai";
import DateField from "../../formshook/DateField";
import SelectField from "../../formshook/SelectField";
import TextField from "../../formshook/TextField";
import FilterFillRamal from "./FilterFillRamal";
import { RamalFilterDTO } from "../models/ramal.model";

import '../styles/FilterRamalStyles.css';

function FilterRamal(props: FilterRamalProps) {
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

    function onSubmit(data: RamalFilterDTO) {
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");

        props.onSubmit(data);
    }

    return (
        <FilterFillRamal>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container ramal'>
                            <div className='filter-fields'>
                                <SelectField field='classifyRamal' displayName='Classificação' options={fill.isDepartment} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <SelectField field='configExitNumber' displayName='Tronco de Saída' options={fill.exitNumbers} />
                                <SelectField field='configGateway' displayName='Gateway' options={fill.gateways} />
                                <TextField field='configIp' displayName='IP do Ramal' placeholder='000.000.000.000' css='s-small' />
                                <div className='field-from-to'>
                                    <DateField field='fromAcquisitionDate' displayName='Data de Aquisição' />
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
        </FilterFillRamal>
    );
}

interface FilterRamalProps {
    base: RamalFilterDTO;
    model: RamalFilterDTO;
    onSubmit(extra: RamalFilterDTO, hasToClear?: boolean): void;
}

export default FilterRamal;