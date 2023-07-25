import Index from "../../components/items/Index";
import { Employees } from "../../shared/devices/Devices";
import { IDevice } from "../../shared/devices/devices.model";
import { SearchModel } from "../../shared/search-input/search.model";
import { EmployeeDTO, EmployeeFilterDTO } from "../models/employee.model";
import FilterEmployee from "../filters/FilterEmployee";
import BoxIndexEmployee from "./components/BoxIndexEmployee";

function IndexEmployees(props: { toggleRefresh: () => void }) {
    const employeesTab: IDevice = Employees[0]; // Posição 0 - Colaboradores

    const employeeFilterModel: EmployeeFilterDTO = {
        statusFilter: 2,
        employeeEmail: '',
        employeeEmailPassword: '',
        alternativeEmail: '',
        employeeUser: '',
        fromIngressDate: undefined,
        toIngressDate: undefined,

    }

    const options: SearchModel[] = [
        { display: 'Nome', value: 'displayname', placeholder: 'Digite o nome do colaborador que procura...' },
        { display: 'Departamento', value: 'department', placeholder: 'Digite o departamento do colaborador que procura...' },
        { display: 'Empresa', value: 'enterprise', placeholder: 'Digite a empresa do colaborador que procura...' }
    ];

    return (
        <Index<EmployeeDTO, EmployeeFilterDTO>
            tab={employeesTab}
            baseExtra={employeeFilterModel}
            options={options}
            toggleRefresh={props.toggleRefresh}
            extraFilterElement={(extra, setExtra) => <FilterEmployee base={employeeFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(employees, buttons) => (
                <ul className="list-index">
                    {employees?.map(employee =>
                        <li key={employee.name}>
                            <BoxIndexEmployee employee={employee}
                                buttons={buttons(`/employees/${employee.id}/edit`, employee.id, `Tem certeza que deseja deletar o Colaborador: ${employee.name}?`, 'Excluir Colaborador')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexEmployees;