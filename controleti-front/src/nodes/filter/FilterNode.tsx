import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';

import FilterFillNode from "./FilterFillNode";
import { NetworkNodeFilterDTO } from "../models/networknodes.model";

import '../styles/FilterNodeStyles.css';

function FilterNode(props: FilterNodeProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "patchPanel" | "fromPorts" | "toPorts" | "fromPatchPort" | "toPatchPort"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === '') {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: NetworkNodeFilterDTO) {
        data.toPorts = handleFieldEmpty("toPorts");
        data.fromPorts = handleFieldEmpty("fromPorts");
        data.toPatchPort = handleFieldEmpty("toPatchPort");
        data.fromPatchPort = handleFieldEmpty("fromPatchPort");

        props.onSubmit(data);
    }

    return (
        <FilterFillNode>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container node'>
                            <div className='filter-fields'>
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <SelectField field='switchId' displayName='Switch' options={fill.switches} />
                                <SelectField field='patchPanel' displayName='PatchPanel' options={fill.patchpanels} />
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromPorts' displayName='Porta do Switch' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toPorts' displayName='' placeholder='Até...' css='s-small' />
                                </div>
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromPatchPort' displayName='Porta do Patch Panel' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toPatchPort' displayName='' placeholder='Até...' css='s-small' />
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
        </FilterFillNode>
    );
}

interface FilterNodeProps {
    base: NetworkNodeFilterDTO;
    model: NetworkNodeFilterDTO;
    onSubmit(extra: NetworkNodeFilterDTO, hasToClear?: boolean): void;
}

export default FilterNode;