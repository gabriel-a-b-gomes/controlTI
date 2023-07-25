import Index from "../../components/items/Index";
import { Employees } from "../../shared/devices/Devices";
import { IDevice } from "../../shared/devices/devices.model";
import { SearchModel } from "../../shared/search-input/search.model";
import { AccountFilterDTO } from "../models/employee.model";
import FilterAccount from "../filters/FilterAccount";
import BoxIndexSkype from "./components/BoxIndexSkype";
import { SkypeDTO } from "../models/skype.model";

function IndexSkypes(props: { toggleRefresh: () => void }) {
    const skypesTab: IDevice = Employees[2]; // Posição 2 - Skype

    const skypeFilterModel: AccountFilterDTO = {
        statusFilter: 2,
        employeeName: '',
        employeeUser: '',
        employeeDepartment: '',
        employeeEnterprise: ''
    };

    const options: SearchModel[] = [
        { display: 'Usuário do Skype', value: 'skypeuser', placeholder: 'Digite o usuário do skype que procura...' },
        { display: 'Senha do Skype', value: 'skypepassword', placeholder: 'Digite a senha do usuário do skype que procura...' }
    ];

    return (
        <Index<SkypeDTO, AccountFilterDTO>
            tab={skypesTab}
            baseExtra={skypeFilterModel}
            options={options}
            toggleRefresh={props.toggleRefresh}
            extraFilterElement={(extra, setExtra) => <FilterAccount class="skype" base={skypeFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(skypes, buttons) => (
                <ul className="list-index">
                    {skypes?.map(skype => 
                        <li key={skype.skypeUser + skype.skypePassword}>
                            <BoxIndexSkype skype={skype} 
                                buttons={buttons(`/employees/${skype.employee.id}/edit`, skype.id, `Tem certeza que deseja deletar a Conta de Skype do usuário: ${skype.employee.name}?`, 'Excluir Skype de Colaborador')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexSkypes;