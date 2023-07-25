import Index from "../components/items/Index";
import { NetworkDevices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import BoxIndexNode from "./components/BoxIndexNode";
import FilterNode from "./filter/FilterNode";
import { NetworkNodeDTO, NetworkNodeFilterDTO } from "./models/networknodes.model";

function IndexNetworkNode(props: { toggleRefresh: () => void }) {
    const nodeTab: IDevice = NetworkDevices[2]; // Posição 2 - Ponto de Rede

    const nodeFilterModel: NetworkNodeFilterDTO = { 
        statusFilter: 2,
        switchId: -1,
        patchPanel: 'all',
        fromPorts: undefined,
        toPorts: undefined,
        fromPatchPort: undefined,
        toPatchPort: undefined
    }

    const options: SearchModel[] = [
        { display: 'Identificação', value: 'code', placeholder: 'Digite a identificação do cabo que procura...' },
        { display: 'Localização', value: 'location', placeholder: 'Digite o local da impressora que procura...' },
        { display: 'Colaborador', value: 'employeename', placeholder: 'Digite o nome do colaborador que procura...' },
        { display: 'Departamento', value: 'employeedepartment', placeholder: 'Digite o departamento que procura...' },
        { display: 'Empresa', value: 'employeeenterprise', placeholder: 'Digite a empresa que procura...' },
        { display: 'Identificação Patch', value: 'patchnodeid', placeholder: 'Digite a identificação no patch panel que procura...' }
    ];

    return (
        <Index<NetworkNodeDTO, NetworkNodeFilterDTO>
            tab={nodeTab}
            baseExtra={nodeFilterModel}
            options={options}
            toggleRefresh={props.toggleRefresh}
            extraFilterElement={(extra, setExtra) => <FilterNode base={nodeFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(nodes, buttons) => (
                <ul className="list-index">
                    {nodes?.map(node => 
                        <li key={node.code}>
                            <BoxIndexNode node={node} 
                                buttons={buttons(`/network/devices/nodes/${node.id}/edit`, node.id, `Tem certeza que deseja deletar o Ponto de Rede: ${node.code}?`, 'Excluir Ponto de Rede')}
                            />
                        </li>
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexNetworkNode;