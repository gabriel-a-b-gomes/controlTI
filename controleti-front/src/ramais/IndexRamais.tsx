import Index from "../components/items/Index";
import { Devices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import { RamalClassification, StatusFilter } from "../utils/enums/Enums";
import BoxIndexRamal from "./components/BoxIndexRamal";
import FilterRamal from "./filter/FilterRamal";
import { RamalDTO, RamalFilterDTO } from "./models/ramal.model";

function IndexRamais() {
    const ramalTab: IDevice = Devices[1]; // Posição 1 - Ramal

    const ramalFilterModel: RamalFilterDTO = {
        configExitNumber: 'all',
        configGateway: 'all',
        statusFilter: StatusFilter.Todos,
        classifyRamal: RamalClassification.all,
        configIp: '',
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined
    };

    const options: SearchModel[] = [
        { display: 'Número', value: 'number', placeholder: 'Digite o número que procura...' },
        { display: 'Departamento', value: 'department', placeholder: 'Digite o departamento que procura...' },
        { display: 'Empresa', value: 'enterprise', placeholder: 'Digite a empresa que procura...' },
        { display: 'Colaborador', value: 'employee', placeholder: 'Digite o colaborador que procura...' },
        { display: 'Usuário', value: 'deviceuser', placeholder: 'Digite o usuário do aparelho que procura...' },
        { display: 'Senha', value: 'devicepassword', placeholder: 'Digite a senha do aparelho que procura...' },
        { display: 'Modelo', value: 'model', placeholder: 'Digite o modelo do aparelho que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo que procura...' }
    ];

    return (
        <Index<RamalDTO, RamalFilterDTO>
            tab={ramalTab}
            baseExtra={ramalFilterModel}
            options={options}
            extraFilterElement={(extra, setExtra) => <FilterRamal base={ramalFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(ramais, buttons) => (
                <ul className="list-index">
                    {ramais?.map(ramal => (
                        <li key={ramal.number}> 
                            <BoxIndexRamal ramal={ramal} 
                                buttons={buttons(`/ramais/${ramal.id}/edit`, ramal.id, `Tem certeza que deseja deletar o Ramal: ${ramal.number}?`, 'Excluir Ramal')}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </Index>
    );
}

export default IndexRamais;