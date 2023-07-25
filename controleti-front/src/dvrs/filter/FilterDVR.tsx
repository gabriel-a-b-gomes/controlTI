import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';

import { DVRFilterDTO } from "../models/dvr.model";
import FilterFillDVR from "./FilterFillDVR";

import '../styles/FilterDVRStyles.css';

function FilterDVR(props: FilterDVRProps) {
    const methods = useForm({
        defaultValues: props.model
    });

    function clear() {
        methods.reset(props.base);
        props.onSubmit(methods.getValues(), true);
    }

    function handleFieldEmpty(field: "fromActiveCams" | "toActiveCams" | "fromAcquisitionDate" | "toAcquisitionDate" | "fromLastPreventive" | "toLastPreventive"): any {
        let value = null;

        value = methods.getValues(field);
        if (value === "") {
            methods.setValue(field, undefined);
        }

        return methods.getValues(field);
    }

    function onSubmit(data: DVRFilterDTO) {
        data.toActiveCams = handleFieldEmpty("toActiveCams");
        data.fromActiveCams = handleFieldEmpty("fromActiveCams");
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");
        data.toLastPreventive = handleFieldEmpty("toLastPreventive");
        data.fromLastPreventive = handleFieldEmpty("fromLastPreventive");

        props.onSubmit(data);
    }

    return (
        <FilterFillDVR>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container dvr'>
                            <div className='filter-fields'>
                                <SelectField field='hasBalun' displayName='Classificação' options={fill.hasBalun} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <SelectField field='toHdSize' displayName='HDs até...' options={fill.hdSizes} />
                                <SelectField field='toChannels' displayName='Canais até...' options={fill.channels} />
                                <div className='field-from-to'>
                                    <TextField type='number' field='fromActiveCams' displayName='Câmeras' placeholder='De...' css='s-small' />
                                    <span> até </span>
                                    <TextField type='number' field='toActiveCams' displayName='' placeholder='Até...' css='s-small' />
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
        </FilterFillDVR>
    );
}

interface FilterDVRProps {
    base: DVRFilterDTO;
    model: DVRFilterDTO;
    onSubmit(extra: DVRFilterDTO, hasToClear?: boolean): void;
}

export default FilterDVR;