import Index from "../components/items/Index";
import { NetworkDevices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import BoxIndexSwitch from "./components/BoxIndexSwitch";
import FilterSwitch from "./filter/FilterSwitch";
import { SwitchDTO, SwitchFilterDTO } from "./models/switch.model";

function IndexSwitch(props: { toggleRefresh: () => void }) {
    const switchTab: IDevice = NetworkDevices[1]; // Posição 1 - Switch

    const switchFilterModel: SwitchFilterDTO = {
        statusFilter: 2,
        switchIp: "",
        switchUser: "",
        switchPassword: "",
        fromQtdePorts: undefined,
        toQtdePorts: undefined,
        fromUsedPorts: undefined,
        toUsedPorts: undefined,
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined
    }

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código que procura...' },
        { display: 'Localização', value: 'location', placeholder: 'Digite o local da impressora que procura...' },
        { display: 'Marca', value: 'brand', placeholder: 'Digite a marca que procura...' },
        { display: 'MAC', value: 'switchmac', placeholder: 'Digite o MAC do switch que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo que procura...' }
    ];
    
    return (
        <Index<SwitchDTO, SwitchFilterDTO>
            tab={switchTab}
            baseExtra={switchFilterModel}
            options={options}
            toggleRefresh={props.toggleRefresh}
            extraFilterElement={(extra, setExtra) => <FilterSwitch base={switchFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(switches, buttons) => (
                <ul className="list-index">
                    {switches?.map(mSwitch => 
                        <li key={mSwitch.code}>
                            <BoxIndexSwitch switch={mSwitch} 
                                buttons={buttons(`/network/devices/switches/${mSwitch.id}/edit`, mSwitch.id, `Tem certeza que deseja deletar o Switch: ${mSwitch.code}?`, 'Excluir Switch')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexSwitch;