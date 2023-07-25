import { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { urlUsers } from "../../apis/endpoints";
import IndexSettings from "../components/IndexSettings";
import SettingsCRUD from "../components/SettingsCRUD";
import { Claims, UserClaimsDTO, UserDTO } from "./models/user.model";

import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import { FiUser } from "react-icons/fi";
import { handleGetClaims } from "./funcs/handleGetClaims";
import InfoAlert from "../../utils/alerts/InfoAlert";

import './styles/UserStyles.css';


function IndexUsers() {
    const [userToggle, setUserToggle] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(true);
    const [itemId, setItemId] = useState<number | undefined>();

    function handleCreate() {
        setIsCreating(true);
        setIsOpen(true);
        setItemId(undefined);
    }

    function handleEdit(userId: number) {
        setIsCreating(false);
        setIsOpen(true);
        setItemId(userId);
    }

    function ListUserClaims(user: UserDTO, userClaims: UserClaimsDTO[]): ReactElement {
        const claims: Claims[] = handleGetClaims(userClaims);

        function handleGetTableClaims(infoClaims: Claims[]): string {
            let tableClaim = '';

            tableClaim += '<table class=\'table memories\'>'
            tableClaim += '<thead><tr><th>Perfis de Acesso</th></tr></thead>'
            tableClaim += '<tbody>'
            infoClaims.forEach(claim => {
                tableClaim += '<tr><td>' + claim.display + '</td></tr>';
            });
            tableClaim += '</tbody>'
            tableClaim += '</table>'

            return tableClaim;
        }

        return (
            <>
            {claims && claims.length > 0 ?
                    <button className="click-info-claim" onClick={() => InfoAlert(`${user.displayname}`, handleGetTableClaims(claims))}>Clique para ver os perfis de acesso ...</button>
                :
                    <span>Não tem perfil de acesso</span>
            }
            </>
        )
    }
    
    return (
        <div className="container-settings">
            <IndexSettings<UserDTO>
                title="Usuários"
                url={urlUsers}
                toggle={userToggle}
                create={handleCreate}
                options={[ 
                    { display: 'Usuário', placeholder: 'Digite o usuário que procura...', value: 'username' },
                    { display: 'Email', placeholder: 'Digite o email que procura...', value: 'email' },        
                ]}
            >
                {(users, buttons) => (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Usuário</th>
                                <th>Email</th>
                                <th>Perfil de Acessos</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map(user => (
                                <tr key={user.email} title={user.userIsActive ? 'Usuário Ativo' : 'Usuário Desativado'} className={!user.userIsActive ? 'user-disable' : 'user-able'}>
                                    <td>{user.id}</td>
                                    <td>{user.displayname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{ListUserClaims(user, user.userClaims)}</td>
                                    <td>{buttons(() => handleEdit(user.id), user.id, `Tem certeza que deseja deletar o Usuário: ${user.email}?`, 'Excluir Usuário')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}
            </IndexSettings>
            <div className='nav-settings'>
                <nav>
                    <div className='tabs-settings'>
                        <NavLink to='/settings/users'><button className='active'>Usuários</button></NavLink>
                        <NavLink to='/settings/profiles'><button>Perfis de Uso</button></NavLink>
                        <NavLink to='/settings/departments'><button>Departamentos</button></NavLink>
                        <NavLink to='/settings/functionalities'><button>Funcionalidades</button></NavLink>
                    </div>
                </nav>
            </div>
            <SettingsCRUD 
                area="Usuário"
                icon={<FiUser />}
                open={isOpen}
                close={() => setIsOpen(false)}
                isCreating={isCreating} 
                create={
                    <CreateUser 
                        dupId={itemId}
                        close={() => setIsOpen(false)}
                        onSuccess={() => setUserToggle(!userToggle)}
                    />
                }
                edit={
                    <EditUser 
                        itemId={itemId ? itemId : 0} 
                        onSuccess={() => setUserToggle(!userToggle)}
                        close={() => setIsOpen(false)}
                        duplicate={(dupId) => {
                            setIsCreating(true);
                            setItemId(dupId);
                        }} 
                        deleteCallBack={() => {
                            setIsCreating(true);
                            setItemId(undefined);
                            setUserToggle(!userToggle);
                            setIsOpen(false);
                        }}
                    />
                }
            />
        </div>
    );
}


export default IndexUsers;