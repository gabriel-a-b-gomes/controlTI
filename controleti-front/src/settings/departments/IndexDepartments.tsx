import { useState } from 'react';
import { MdSource } from 'react-icons/md';
import { urlDepartments } from "../../apis/endpoints";
import IndexSettings from "../components/IndexSettings";
import { DepartmentDTO } from "./models/department.model";


import '../styles/SettingsStyles.css';

import SettingsCRUD from '../components/SettingsCRUD';
import CreateDepartment from "./components/CreateDepartment";
import EditDepartment from "./components/EditDepartment";
import { NavLink } from "react-router-dom";

function IndexDepartments() {
    const [deptToggle, setDeptToggle] = useState(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(true);
    const [itemId, setItemId] = useState<number | undefined>();

    function handleCreate() {
        setIsCreating(true);
        setIsOpen(true);
        setItemId(undefined);
    }

    function handleEdit(deptId: number) {
        setIsCreating(false);
        setIsOpen(true);
        setItemId(deptId);
    }

    return (
        <div className="container-settings">
            <IndexSettings<DepartmentDTO>
                title="Departamentos"
                url={urlDepartments}
                toggle={deptToggle}
                create={handleCreate}
                options={[ 
                    { display: 'Descrição', placeholder: 'Pesquise pela descrição do departamento...', value: 'description' },
                    { display: 'Empresa', placeholder: 'Pesquise pela empresa do departamento...', value: 'enterprise' }
                ]}
            >
                {(departments, buttons) => (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Descrição</th>
                                <th>Empresa</th>
                                <th>Colaboradores</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments?.map(department => (
                                <tr key={department.description + department.enterprise}>
                                    <td>{department.id}</td>
                                    <td>{department.description}</td>
                                    <td>{department.enterprise}</td>
                                    <td>{department.employees.length}</td>
                                    <td>{buttons(() => handleEdit(department.id), department.id, `Tem certeza que deseja deletar o Departamento: ${department.description} - ${department.enterprise}?`, 'Excluir Departamento')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}
            </IndexSettings>
            <div className='nav-settings'>
                    <nav>
                        <div className='tabs-settings'>
                            <NavLink to='/settings/users'><button>Usuários</button></NavLink>
                            <NavLink to='/settings/profiles'><button>Perfis de Uso</button></NavLink>
                            <NavLink to='/settings/departments'><button className='active'>Departamentos</button></NavLink>
                            <NavLink to='/settings/functionalities'><button>Funcionalidades</button></NavLink>
                        </div>
                    </nav>
                </div>
                <SettingsCRUD 
                    area="Departamento"
                    icon={<MdSource />}
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    isCreating={isCreating} 
                    create={
                        <CreateDepartment 
                            dupId={itemId} 
                            close={() => setIsOpen(false)}
                            onSuccess={() => setDeptToggle(prev => !prev)}
                        />
                    }
                    edit={
                        <EditDepartment 
                            itemId={itemId ? itemId : 0} 
                            onSuccess={() => setDeptToggle(prev => !prev)}
                            close={() => setIsOpen(false)}
                            duplicate={(dupId) => {
                                setIsCreating(true);
                                setItemId(dupId);
                            }} 
                            deleteCallBack={() => {
                                setIsCreating(true);
                                setItemId(undefined);
                                setDeptToggle(prev => !prev);
                                setIsOpen(false);
                            }}
                        />
                    }
                />
        </div>
    );
}

export default IndexDepartments;