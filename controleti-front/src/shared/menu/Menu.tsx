import { NavLink } from "react-router-dom";
import { IoMdDesktop } from 'react-icons/io';
import { IoListSharp } from 'react-icons/io5';
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4, MdSupervisedUserCircle, MdAddBox, MdLogout } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';
import './MenuStyles.css';
import { useAuth } from "../../auth/AuthContext";
import { FiUser } from "react-icons/fi";
import { ClaimEnum } from "../../settings/users/models/ClaimEnum";
import HasAuth from "../../auth/HasAuth";

const ADM = ClaimEnum.ADMINISTRADOR;
const DEVICES = ClaimEnum["Gerenciar Ativos (Listagem, Inclusão, Alteração e Remoção)"];
const MAINTENENCE = ClaimEnum["Gerenciamento de Preventivas e Estado de Conexão"];

function Menu() {

    const { logout, user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><IoMdDesktop /><span>Controle TI</span></NavLink>
                <div className="collapse navbar-collapse"
                  style={{ display: 'flex' }}
                >
                    <HasAuth premissions={[MAINTENENCE, DEVICES, ADM]} 
                        notPermitted={
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        }
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <button className="nav-link-custom " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IoListSharp /><span>Equipamentos</span>
                                    <span className="dropdown-toggle ml-10" />
                                </button>
                                <ul className="dropmenu dropdown-menu devices-menu" aria-labelledby="dropdownMenuButton1">
                                    
                                    <li><NavLink className="dropdown-item" to="/computers">Computadores</NavLink></li>
                                    <HasAuth premissions={[DEVICES, ADM]}>
                                        <li><NavLink className="dropdown-item" to="/ramais">Ramais</NavLink></li>
                                    </HasAuth>
                                    <li><NavLink className="dropdown-item" to="/dvrs">DVRs</NavLink></li>
                                    <HasAuth premissions={[DEVICES, ADM]}>
                                        <li><NavLink className="dropdown-item" to="/chips">Chips</NavLink></li>
                                    </HasAuth>
                                    <li><NavLink className="dropdown-item" to="/nobreaks">Nobreaks</NavLink></li>
                                    <HasAuth premissions={[DEVICES, ADM]}>
                                        <li><NavLink className="dropdown-item" to="/printers">Impressoras</NavLink></li>
                                    </HasAuth>
                                    <li><div className="dropdown-divider"></div></li>
                                    <li><NavLink className="dropdown-item" to="/servers">Servidores</NavLink></li>
                                    <li><div className="dropdown-divider"></div></li>
                                    <li><NavLink className="dropdown-item" to="/preventives">Preventivas</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link-custom " type="button" id="dropdownMenuButtonNet" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MdOutlineSignalWifiStatusbarConnectedNoInternet4 /><span>Rede</span>
                                    <span className="dropdown-toggle ml-10" />
                                </button>
                                <ul className="dropmenu dropdown-menu devices-menu" aria-labelledby="dropdownMenuButtonNet">
                                    <HasAuth premissions={[DEVICES, ADM]}>
                                        <li><NavLink className="dropdown-item" to="/network/devices">Dispositivos</NavLink></li>
                                        <li><div className="dropdown-divider"></div></li>
                                    </HasAuth>
                                    <li><NavLink className="dropdown-item" to="/network/ping">Ping</NavLink></li>
                                </ul>
                            </li>
                            <HasAuth premissions={[DEVICES, ADM]}>
                                <li className="nav-item">
                                    <NavLink className="nav-link-custom" to="/employees">
                                        <MdSupervisedUserCircle /><span>Colaboradores</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="nav-link-custom" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <MdAddBox /><span>Cadastrar</span>
                                        <span className="dropdown-toggle ml-10" />
                                    </button>
                                    <ul className="dropmenu dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                        <li><NavLink className="dropdown-item" to="/devices/create">Equipamento</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/network/devices/create">Rede</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/servers/create">Servidor</NavLink></li>
                                        <li><div className="dropdown-divider"></div></li>
                                        <li><NavLink className="dropdown-item" to="/employees/create">Colaborador</NavLink></li>
                                    </ul>
                                </li>
                                <HasAuth premissions={[ADM]}>
                                    <li className="nav-item">
                                        <NavLink className="nav-link-custom" to="/settings/users">
                                            <RiListSettingsLine /><span>Parâmetros</span>
                                        </NavLink>
                                    </li>
                                </HasAuth>
                            </HasAuth>
                        </ul>
                    </HasAuth>
                    <div className="user-area-nav">
                        <a title="Vá para seu perfil na Microsoft" href={"https://myaccount.microsoft.com/?ref=MeControl&amp;login_hint="+user.userEmail} >
                            <FiUser />
                            <span>{user?.userEmail}</span>
                        </a>
                        <button title="Clique para fazer logout" onClick={logout}><MdLogout /><span>Logout</span></button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;