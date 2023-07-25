import Index from "../components/items/Index";
import { NobreakDTO, NobreakFilterDTO } from "./models/nobreak.model";
import { IDevice } from "../shared/devices/devices.model";
import { Devices } from "../shared/devices/Devices";
import BoxIndexNobreak from "./components/BoxIndexNobreak";
import FilterNobreak from "./filter/FilterNobreak";
import { SearchModel } from "../shared/search-input/search.model";

function IndexNobreak() {   
    const nobreakTab: IDevice = Devices[5]; // Posição 5 - Nobreak

    const nobreakFilterModel: NobreakFilterDTO = {
        filterSenoidal: 0,
        typeOfUse: 0,
        statusFilter: 2,
        fromQtdeVA: undefined,
        toQtdeVA: undefined,
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined,
        fromLastPreventive: undefined,
        toLastPreventive: undefined
    }

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código que procura...' },
        { display: 'Marca', value: 'brand', placeholder: 'Digite a marca do nobreak que procura...' },
        { display: 'Localização', value: 'location', placeholder: 'Digite a localização que procura...' },
        { display: 'Modelo', value: 'model', placeholder: 'Digite o modelo do nobreak que procura...' },
        { display: 'Ativo', value: 'assetNumber', placeholder: 'Digite o ativo que procura...' }
    ];

    return (
        <div>
            <Index<NobreakDTO, NobreakFilterDTO> 
                tab={nobreakTab}
                baseExtra={nobreakFilterModel}
                options={options}
                extraFilterElement={(extra, setExtra) => <FilterNobreak base={nobreakFilterModel} model={extra} onSubmit={setExtra} />}
            >
                {(nobreaks, buttons) => (
                    <ul className="list-index">
                        {nobreaks?.map(nobreak => 
                            <li key={nobreak.code}>
                                <BoxIndexNobreak nobreak={nobreak} 
                                    buttons={buttons(`/nobreaks/${nobreak.id}/edit`, nobreak.id, `Tem certeza que deseja deletar o Nobreak: ${nobreak.code} ?`, `Excluir Nobreak`)}
                                />
                            </li>       
                        )}
                    </ul>   
                )}
            </Index>
        </div>
    );
}

export default IndexNobreak;
