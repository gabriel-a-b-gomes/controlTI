import { useState } from 'react';

import { urlProfiles } from "../../apis/endpoints";
import IndexSettings from "../components/IndexSettings";
import { RankProcessing, RankSO } from "../../utils/enums/Enums";
import { ProfileDTO } from "./models/profile.model";
import { RiProfileLine } from "react-icons/ri";

import '../styles/SettingsStyles.css';

import SettingsCRUD from "../components/SettingsCRUD";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import { NavLink } from "react-router-dom";

function IndexProfiles() {
    const [profileToggle, setProfilesToggle] = useState<boolean>(false);

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

    function handleRankProcessing(rankProcessing: number | undefined): string {
        if (rankProcessing !== undefined) {
            return RankProcessing[rankProcessing];
        }

        return "";
    }

    function handleRankSO(rankSO: number | undefined): string {
        if (rankSO !== undefined) {
            return RankSO[rankSO];
        }

        return "";
    }

    return (
        <div className="container-settings">
            <IndexSettings<ProfileDTO>
                title="Perfis de Uso"
                url={urlProfiles}
                toggle={profileToggle}
                create={handleCreate}
                options={[ { display: 'Nome do Perfil', placeholder: 'Pesquise pelo nome do perfil', value: 'profileName' } ]}
                defaultOptionSelected={1}
            >
                {(profiles, buttons) => (
                    <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Computadores</th>
                            <th>Mín. Memoria</th>
                            <th>Mín. Armaz.</th>
                            <th>Tipo de Armaz.</th>
                            <th>Classif. Processador</th>
                            <th>Classif. SO</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles?.map(profile => (
                            <tr key={profile.name}>
                                <td>{profile.id}</td>
                                <td>{profile.name}</td>
                                <td>{profile.computers.length}</td>
                                <td>{profile.memoryMinSize} GB</td>
                                <td>{profile.storageMinSize} GB</td>
                                <td>{profile.storageType}</td>
                                <td>{handleRankProcessing(profile.rankOfProcessingUnit)}</td>
                                <td>{handleRankSO(profile.rankOfOperationSystem)}</td>
                                <td>{buttons(() => handleEdit(profile.id), profile.id, `Tem certeza que deseja deletar o Perfil: ${profile.name}?`, 'Excluir Perfil')}</td>
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
                        <NavLink to='/settings/profiles'><button className='active'>Perfis de Uso</button></NavLink>
                        <NavLink to='/settings/departments'><button>Departamentos</button></NavLink>
                        <NavLink to='/settings/functionalities'><button>Funcionalidades</button></NavLink>
                    </div>
                </nav>
            </div>
            <SettingsCRUD 
                area="Perfil de Uso"
                icon={<RiProfileLine />}
                open={isOpen}
                close={() => setIsOpen(false)}
                isCreating={isCreating} 
                create={
                    <CreateProfile 
                        dupId={itemId}
                        close={() => setIsOpen(false)}
                        onSuccess={() => setProfilesToggle(!profileToggle)}
                    />
                }
                edit={
                    <EditProfile 
                        itemId={itemId ? itemId : 0} 
                        onSuccess={() => setProfilesToggle(!profileToggle)}
                        close={() => setIsOpen(false)}
                        duplicate={(dupId) => {
                            setIsCreating(true);
                            setItemId(dupId);
                        }} 
                        deleteCallBack={() => {
                            setIsCreating(true);
                            setItemId(undefined);
                            setProfilesToggle(!profileToggle);
                            setIsOpen(false);
                        }}
                    />
                }
            />
        </div>
    );
}

export default IndexProfiles;