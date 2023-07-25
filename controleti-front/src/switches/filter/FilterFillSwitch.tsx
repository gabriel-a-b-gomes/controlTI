import { ReactElement } from 'react';
import { selectOptions } from "../../formshook/models/form.model";
import { StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";

function FilterFillSwitch(props: FilterFillSwitchProps) {    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    return (
        <>
            {status.length > 1 ? 
                props.children({
                    status: status, 
                }) 
            : 
                <LoadingFilter />
            }
        </>
    );
}

interface FilterFillSwitchProps {
    children: (fill: FilterFillSwitchDTO) => ReactElement;
}

interface FilterFillSwitchDTO {
    status: selectOptions[];
}

export default FilterFillSwitch;