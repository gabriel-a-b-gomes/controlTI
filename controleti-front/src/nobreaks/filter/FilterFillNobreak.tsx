import { ReactElement } from 'react';

import { selectOptions } from "../../formshook/models/form.model";
import { NobreakFilterTypeOfUses, SenoidalFilter, StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";

function FilterFillNobreak(props: FilterFillNobreakProps) {
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const typesOfUse: selectOptions[] = [
        { display: 'Todos', value: NobreakFilterTypeOfUses.nofilter },
        { display: 'Impressora', value: NobreakFilterTypeOfUses.printer },
        { display: 'Servidor', value: NobreakFilterTypeOfUses.server },
        { display: 'Rede', value: NobreakFilterTypeOfUses.network },
        { display: 'Sem tipo', value: NobreakFilterTypeOfUses.notype }
    ];

    const senoidalOptions: selectOptions[] = [
        { display: 'Todos', value: SenoidalFilter.nofilter },
        { display: 'Somente Senoidal', value: SenoidalFilter.onlySenoidal },
        { display: 'Somente Não-Senoidal', value: SenoidalFilter.onlyNotSenoidal }
    ];

    return (
        <>
            {status.length > 1 && typesOfUse.length > 1 && senoidalOptions.length > 1 ? 
                props.children({
                    status: status, 
                    senoidalOptions: senoidalOptions,
                    typesOfUse: typesOfUse
                }) 
            : 
                <LoadingFilter />
            }
        </>
    );
}

interface FilterFillNobreakProps {
    children: (fill: FilterFillNobreakDTO) => ReactElement;
}

interface FilterFillNobreakDTO {
    status: selectOptions[];
    typesOfUse: selectOptions[];
    senoidalOptions: selectOptions[];
}

export default FilterFillNobreak;