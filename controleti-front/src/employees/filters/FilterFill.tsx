import { ReactElement } from "react";
import { selectOptions } from "../../formshook/models/form.model";
import { StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";

function FilterFill(props: FilterFillProps) {
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desligado', value: StatusFilter.Desativo }
    ];

    return (
        <>
            {status.length > 1 ? 
                props.children({
                    status: status
                }) 
            : 
                <LoadingFilter />
            }
        </>
    );
}

interface FilterFillProps {
    children: (fill: FilterFillDTO) => ReactElement;
}

interface FilterFillDTO {
    status: selectOptions[];
}

export default FilterFill;