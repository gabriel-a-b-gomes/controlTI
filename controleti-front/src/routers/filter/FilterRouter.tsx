import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import DateField from '../../formshook/DateField';
import SelectField from '../../formshook/SelectField';
import TextField from '../../formshook/TextField';
import FilterFillRouter from './FilterFillRouter';
import { RouterFilterDTO } from "../models/router.model";

import '../styles/FilterRouterStyles.css';

function FilterRouter(props: FilterRouterProps) {
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

    function onSubmit(data: RouterFilterDTO) {
        data.toAcquisitionDate = handleFieldEmpty("toAcquisitionDate");
        data.fromAcquisitionDate = handleFieldEmpty("fromAcquisitionDate");

        props.onSubmit(data);
    }

    return (
        <FilterFillRouter>
            {(fill) => (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='filter-form'>
                        <div className='filter-extra-container router'>
                            <div className='filter-fields'>
                                <SelectField field='routerSSID' displayName='SSID' options={fill.routerSSIDs} />
                                <SelectField field='statusFilter' displayName='Status' options={fill.status} />
                                <TextField field='routerIp' displayName='IP do Ramal' placeholder='000.000.000.000' css='s-small' />
                                <TextField field='routerUser' displayName='Usuário' placeholder='Procure pelo usuário...' css='s-small' />
                                <TextField field='routerPassword' displayName='Senha' placeholder='Procure pela senha...' css='s-small' />
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
        </FilterFillRouter>
    );
}

interface FilterRouterProps {
    base: RouterFilterDTO;
    model: RouterFilterDTO;
    onSubmit(extra: RouterFilterDTO, hasToClear?: boolean): void;
}

export default FilterRouter;