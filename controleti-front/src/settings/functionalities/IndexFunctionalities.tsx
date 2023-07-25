import { useState } from 'react';
import { urlFunctionalities } from "../../apis/endpoints";
import IndexSettings from "../components/IndexSettings";
import { FunctionalityDTO } from './models/functionalities.model';
import { NavLink } from 'react-router-dom';
import SettingsCRUD from '../components/SettingsCRUD';
import CreateFunctionality from './components/CreateFunctionality';
import EditFunctionality from './components/EditFunctionality';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

function IndexFunctionalities() {
    const [funcsToggle, setFuncsToggle] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(true);
    const [itemId, setItemId] = useState<number | undefined>();

    function handleCreate() {
        setIsCreating(true);
        setIsOpen(true);
        setItemId(undefined);
    }

    function handleEdit(profileId: number) {
        setIsCreating(false);
        setIsOpen(true);
        setItemId(profileId);
    }

    return (
        <div className="container-settings">
            <IndexSettings<FunctionalityDTO>
                title="Funcionalidades"
                url={urlFunctionalities}
                toggle={funcsToggle}
                create={handleCreate}
                options={[ { display: 'Descrição', placeholder: 'Pesquise pela descrição da funcionalidade', value: 'funcname' } ]}
                defaultOptionSelected={1}
            >
                {(funcs, buttons) => (
                    <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Descrição</th>
                            <th>Qtde. de Hosts</th>
                            <th>Qtde. de VMs</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcs?.map(func => (
                            <tr key={func.description}>
                                <td>{func.id}</td>
                                <td>{func.description}</td>
                                <td>{func.hosts.length}</td>
                                <td>{func.virtualMachines.length}</td>
                                <td>{buttons(() => handleEdit(func.id), func.id, `Tem certeza que deseja deletar a Funcionalidade: ${func.description}?`, 'Excluir Funcionalidade')}</td>
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
                        <NavLink to='/settings/departments'><button>Departamentos</button></NavLink>
                        <NavLink to='/settings/functionalities'><button className='active'>Funcionalidades</button></NavLink>
                    </div>
                </nav>
                <SettingsCRUD 
                    area="Funcionalidade"
                    icon={<AiOutlineAppstoreAdd />}
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    isCreating={isCreating} 
                    create={
                        <CreateFunctionality 
                            dupId={itemId} 
                            close={() => setIsOpen(false)}
                            onSuccess={() => setFuncsToggle(prev => !prev)}
                        />
                    }
                    edit={
                        <EditFunctionality 
                            itemId={itemId ? itemId : 0} 
                            onSuccess={() => setFuncsToggle(prev => !prev)}
                            close={() => setIsOpen(false)}
                            duplicate={(dupId) => {
                                setIsCreating(true);
                                setItemId(dupId);
                            }} 
                            deleteCallBack={() => {
                                setIsCreating(true);
                                setItemId(undefined);
                                setFuncsToggle(prev => !prev);
                                setIsOpen(false);
                            }}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default IndexFunctionalities;