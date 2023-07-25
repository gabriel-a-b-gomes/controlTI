import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';

import FilterFillSwitch from "./FilterFillSwitch";
import { SwitchFilterDTO } from "../models/switch.model";

import '../styles/FilterSwitchStyles.css';

function FilterSwitch(props: FilterSwitchProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "fromQtdePorts" | "toQtdePorts" | "fromUsedPorts" | "toUsedPorts" | "fromAcquisitionDate" | "toAcquisitionDate"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: SwitchFilterDTO) {
        data.toQtdePorts = handleFieldEmpty("toQtdePorts");
        data.fromQtdePorts = handleFieldEmpty("fromQtdePorts");
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");
        data.toUsedPorts = handleFieldEmpty("toUsedPorts");
        data.fromUsedPorts = handleFieldEmpty("fromUsedPorts");

        props.onSubmit(data);
    }

    return (
        <FilterFillSwitch>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container switch'>
                            <div className='filter-fields'>
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <TextField field='switchIp' displayName='IP do Switch' placeholder='000.000.000.000' css='s-small' />
                                <TextField field='switchUser' displayName='Usuário' placeholder='Filtrar Usuário...' css='s-small' />
                                <TextField field='switchPassword' displayName='Senha' placeholder='Filtrar Senha...' css='s-small' />
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromQtdePorts' displayName='Qtde. de Portas' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toQtdePorts' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromUsedPorts' displayName='Portas Usadas' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toUsedPorts' displayName='' placeholder='Até...' css='s-small' />
                                </div>
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
        </FilterFillSwitch>
    );
}

interface FilterSwitchProps {
    base: SwitchFilterDTO;
    model: SwitchFilterDTO;
    onSubmit(extra: SwitchFilterDTO, hasToClear?: boolean): void;
}

export default FilterSwitch;