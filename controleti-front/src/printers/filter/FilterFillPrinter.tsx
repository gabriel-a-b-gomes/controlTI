import { ReactElement } from 'react';
import { selectOptions } from '../../formshook/models/form.model';
import { PrinterFilterType, StatusFilter } from '../../utils/enums/Enums';
import { LoadingFilter } from "../../utils/Loading";

function FilterFillPrinter(props: FilterFillPrinterProps) {
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const types: selectOptions[] = [
        { display: 'Todos', value: PrinterFilterType.noFilter },
        { display: 'Padrão', value: PrinterFilterType.standart },
        { display: 'Multifuncional', value: PrinterFilterType.multifunction },
        { display: 'Colorida', value: PrinterFilterType.colorful },
        { display: 'Etiqueta', value: PrinterFilterType.productTag }
    ];

    return (
        <>
            {status.length > 1 && types.length > 1 ? 
                props.children({
                    status: status, 
                    types: types
                }) 
            : 
                <LoadingFilter />
            }
        </>
    );
}

interface FilterFillPrinterProps {
    children: (fill: FilterFillPrinterDTO) => ReactElement;
}

interface FilterFillPrinterDTO {
    types: selectOptions[];
    status: selectOptions[];
}

export default FilterFillPrinter;