import Index from "../components/items/Index";
import { Devices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import { PrinterFilterType, StatusFilter } from "../utils/enums/Enums";
import BoxIndexPrinter from "./components/BoxIndexPrinter";
import FilterPrinter from "./filter/FilterPrinter";
import { PrinterDTO, PrinterFilterDTO } from "./models/printer.model";

function IndexPrinters() {
    const printerTab: IDevice = Devices[4]; // Posição 4 - Impressora

    const printerFilterModel: PrinterFilterDTO = {
        type: PrinterFilterType.noFilter,
        statusFilter: StatusFilter.Todos,
        printerIp: '',
        printerUser: '',
        printerPassword: '',
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined
    };

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código que procura...' },
        { display: 'Localização', value: 'location', placeholder: 'Digite o local da impressora que procura...' },
        { display: 'Marca', value: 'brand', placeholder: 'Digite a marca que procura...' },
        { display: 'Modelo', value: 'model', placeholder: 'Digite o modelo que procura...' },
        { display: 'Suprimentos', value: 'supplies', placeholder: 'Digite os suprimentos que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo que procura...' },
        { display: 'N° Série', value: 'serialnumber', placeholder: 'Digite o número de série que procura...' }
    ];

    return (
        <Index<PrinterDTO, PrinterFilterDTO>
            tab={printerTab}
            baseExtra={printerFilterModel}
            options={options}
            extraFilterElement={(extra, setExtra) => <FilterPrinter base={printerFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(printers, buttons) => (
                <ul className="list-index">
                    {printers?.map(printer => 
                        <li key={printer.code}>
                            <BoxIndexPrinter printer={printer} 
                                buttons={buttons(`/printers/${printer.id}/edit`, printer.id, `Tem certeza que deseja deletar a Impressora: ${printer.code}?`, 'Excluir Impressora')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexPrinters;