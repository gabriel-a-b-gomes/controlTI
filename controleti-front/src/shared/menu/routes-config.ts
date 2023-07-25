import CreateNobreak from "../../nobreaks/CreateNobreak";
import EditNobreak from "../../nobreaks/EditNobreak";
import IndexNobreak from "../../nobreaks/IndexNobreak";

import CreateChip from "../../chips/CreateChip";
import EditChip from "../../chips/EditChip";
import IndexChips from "../../chips/IndexChips";

import IndexDVRs from "../../dvrs/IndexDVRs";
import CreateDVR from "../../dvrs/CreateDVR";
import EditDVR from "../../dvrs/EditDVR";

import IndexRamais from "../../ramais/IndexRamais";
import CreateRamal from "../../ramais/CreateRamal";
import EditRamal from "../../ramais/EditRamal";

import IndexPrinters from "../../printers/IndexPrinters";
import CreatePrinter from "../../printers/CreatePrinter";
import EditPrinter from "../../printers/EditPrinter";

import LandingEmployees from "../../employees/LandingEmployees";
import CreateEmployee from "../../employees/CreateEmployee";
import EditEmployee from "../../employees/EditEmployee";

import CreateComputer from "../../computers/CreateComputer";
import EditComputer from "../../computers/EditComputer";
import IndexComputers from "../../computers/IndexComputers";

import IndexServers from "../../servers/IndexServers";

import IndexNetworkDevices from "../../network-devices/IndexNetworkDevices";

import CreateRouter from "../../routers/CreateRouter";
import EditRouter from "../../routers/EditRouter";

import CreateSwitch from "../../switches/CreateSwitch";
import EditSwitch from "../../switches/EditSwitch";

import CreateNetworkNode from "../../nodes/CreateNetworkNode";
import EditNetworkNode from "../../nodes/EditNetworkNode";

import Ping from "../../ping/Ping";

import Settings from "../../settings/Settings";
import IndexDepartments from "../../settings/departments/IndexDepartments";
import IndexProfiles from "../../settings/profiles/IndexProfiles";

import Preventives from "../../preventives/Preventives";

import Home from "../../home/Home";

import RedirectToLandingPage from "./RedirectToLandingPage";
import NetworkCreatingHome from "../../home/creating/NetworkCreatingHome";
import DeviceCreatingHome from "../../home/creating/DeviceCreatingHome";

import IndexUsers from "../../settings/users/IndexUsers";

import SignIn from "../../auth/SignIn";
import NotAuthenticated from "../../auth/NotAuthenticated";
import RedirectToSignIn from "../../auth/RedirectToSignIn";

import { ClaimEnum } from "../../settings/users/models/ClaimEnum";
import ServerCreatingHome from "../../home/creating/ServerCreatingHome";
import IndexFunctionalities from "../../settings/functionalities/IndexFunctionalities";
import CreateServerHost from "../../servers/CreateServerHost";
import EditServerHost from "../../servers/EditServerHost";
import CreateServerVM from "../../servers/CreateServerVM";
import EditServerVM from "../../servers/EditServerVM";

const ADM = ClaimEnum.ADMINISTRADOR;
const DEVICES = ClaimEnum["Gerenciar Ativos (Listagem, Inclusão, Alteração e Remoção)"];
const PREVENTIVES = ClaimEnum["Gerenciamento de Preventivas e Estado de Conexão"];

export const routes = [
    {path: '/devices/create', component: DeviceCreatingHome, roles: [DEVICES, ADM]},

    {path: '/computers', component: IndexComputers, exact: true, roles: [PREVENTIVES, DEVICES, ADM]},
    {path: '/computers/create/:duplicateId?', component: CreateComputer, roles: [DEVICES, ADM]},
    {path: '/computers/:itemId/edit', component: EditComputer, roles: [DEVICES, ADM]},

    {path: '/servers', component: IndexServers, exact: true, roles: [PREVENTIVES, DEVICES, ADM]},
    {path: '/servers/create', component: ServerCreatingHome, roles: [DEVICES, ADM]},

    {path: '/servers/hosts/create/:duplicateId?', component: CreateServerHost, roles: [DEVICES, ADM]},
    {path: '/servers/hosts/:itemId/edit', component: EditServerHost, roles: [DEVICES, ADM]},

    {path: '/servers/vms/create/:duplicateId?', component: CreateServerVM, roles: [DEVICES, ADM]},
    {path: '/servers/vms/:itemId/edit', component: EditServerVM, roles: [DEVICES, ADM]},

    {path: '/chips', component: IndexChips, exact: true, roles: [DEVICES, ADM]},
    {path: '/chips/create/:duplicateId?', component: CreateChip, roles: [DEVICES, ADM]},
    {path: '/chips/:itemId/edit', component: EditChip, roles: [DEVICES, ADM]},

    {path: '/nobreaks', component: IndexNobreak, exact: true, roles: [PREVENTIVES, DEVICES, ADM]},
    {path: '/nobreaks/create/:duplicateId?', component: CreateNobreak, roles: [DEVICES, ADM]},
    {path: '/nobreaks/:itemId/edit', component: EditNobreak, roles: [DEVICES, ADM]},

    {path: '/dvrs', component: IndexDVRs, exact: true, roles: [PREVENTIVES, DEVICES, ADM]},
    {path: '/dvrs/create/:duplicateId?', component: CreateDVR, roles: [DEVICES, ADM]},
    {path: '/dvrs/:itemId/edit', component: EditDVR, roles: [DEVICES, ADM]},

    {path: '/ramais', component: IndexRamais, exact: true, roles: [DEVICES, ADM]},
    {path: '/ramais/create/:duplicateId?', component: CreateRamal, roles: [DEVICES, ADM]},
    {path: '/ramais/:itemId/edit', component: EditRamal, roles: [DEVICES, ADM]},

    {path: '/printers', component: IndexPrinters, exact: true, roles: [DEVICES, ADM]},
    {path: '/printers/create/:duplicateId?', component: CreatePrinter, roles: [DEVICES, ADM]},
    {path: '/printers/:itemId/edit', component: EditPrinter, roles: [DEVICES, ADM]},

    {path: '/employees', component: LandingEmployees, exact: true, roles: [DEVICES, ADM]},
    {path: '/employees/create/:duplicateId?', component: CreateEmployee, roles: [DEVICES, ADM]},
    {path: '/employees/:itemId/edit', component: EditEmployee, roles: [DEVICES, ADM]},

    {path: '/network/ping', component: Ping, exact: true, roles: [PREVENTIVES, DEVICES, ADM]},

    {path: '/network/devices/:index?', component: IndexNetworkDevices, exact: true, roles: [DEVICES, ADM]},
    {path: '/network/devices/create', component: NetworkCreatingHome, roles: [DEVICES, ADM]},

    {path: '/network/devices/routers/create/:duplicateId?', component: CreateRouter, roles: [DEVICES, ADM]},
    {path: '/network/devices/routers/:itemId/edit', component: EditRouter, roles: [DEVICES, ADM]},

    {path: '/network/devices/switches/create/:duplicateId?', component: CreateSwitch, roles: [DEVICES, ADM]},
    {path: '/network/devices/switches/:itemId/edit', component: EditSwitch, roles: [DEVICES, ADM]},

    {path: '/network/devices/nodes/create/:duplicateId?', component: CreateNetworkNode, roles: [DEVICES, ADM]},
    {path: '/network/devices/nodes/:itemId/edit', component: EditNetworkNode, roles: [DEVICES, ADM]},

    {path: '/settings', component: Settings, exact: true, roles: [ADM]},
    {path: '/settings/departments', component: IndexDepartments, roles: [ADM]},
    {path: '/settings/profiles', component: IndexProfiles, roles: [ADM]},
    {path: '/settings/users', component: IndexUsers, roles: [ADM]},
    {path: '/settings/functionalities', component: IndexFunctionalities, roles: [ADM]},

    {path: '/preventives', component: Preventives, exact: true, roles: [PREVENTIVES, DEVICES, ADM]},

    {path: '/', component: Home, exact: true, roles: []},
    {path: '*', component: RedirectToLandingPage, roles: []}
];

export const authRoutes = [
    {path: '/', component: SignIn},
    {path: '*', component: RedirectToSignIn},
    {path: '/notauthenticated', component: NotAuthenticated}
];