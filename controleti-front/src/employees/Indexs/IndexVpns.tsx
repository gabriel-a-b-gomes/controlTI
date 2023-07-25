import Index from "../../components/items/Index";
import { Employees } from "../../shared/devices/Devices";
import { IDevice } from "../../shared/devices/devices.model";
import { SearchModel } from "../../shared/search-input/search.model";
import { AccountFilterDTO } from "../models/employee.model";
import FilterAccount from "../filters/FilterAccount";
import BoxIndexVPN from "./components/BoxIndexVPN";
import { VpnDTO } from "../models/vpn.model";

function IndexVpns(props: { toggleRefresh: () => void }) {
    const vpnsTab: IDevice = Employees[1]; // Posição 1 - VPN

    const vpnFilterModel: AccountFilterDTO = {
        statusFilter: 2,
        employeeName: '',
        employeeUser: '',
        employeeDepartment: '',
        employeeEnterprise: ''
    }

    const options: SearchModel[] = [
        { display: 'Usuário do VPN', value: 'vpnuser', placeholder: 'Digite o usuário do vpn que procura...' },
        { display: 'Senha do VPN', value: 'vpnpassword', placeholder: 'Digite a senha do usuário do vpn que procura...' }
    ];

    return (
        <Index<VpnDTO, AccountFilterDTO>
            tab={vpnsTab}
            baseExtra={vpnFilterModel}
            options={options}
            toggleRefresh={props.toggleRefresh}
            extraFilterElement={(extra, setExtra) => <FilterAccount class="vpnpn" base={vpnFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(vpns, buttons) => (
                <ul className="list-index">
                    {vpns?.map(vpn => 
                        <li key={vpn.vpnUser + vpn.vpnPassword}>
                            <BoxIndexVPN vpn={vpn} 
                                buttons={buttons(`/employees/${vpn.employee.id}/edit`, vpn.id, `Tem certeza que deseja deletar a Conta de vpn do usuário: ${vpn.employee.name}?`, 'Excluir VPN de Colaborador')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexVpns;