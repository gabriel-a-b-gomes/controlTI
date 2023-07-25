import { MdOutlineComputer, MdSettingsPower, MdOutlineSimCard, MdPhoneInTalk } from 'react-icons/md';
import { TbDeviceComputerCamera, TbRouter, TbServer2 } from 'react-icons/tb';
import { BsHddNetwork } from 'react-icons/bs';
import { RiNodeTree } from 'react-icons/ri';
import { TfiPrinter } from 'react-icons/tfi';

import { IDevice } from './devices.model';
import { urlChips, urlComputers, urlDVRs, urlEmployees, urlHosts, urlNetworkNodes, urlNobreaks, urlPrinters, urlRamais, urlRouters, urlSkypes, urlSwitches, urlVMS, urlVPNS } from '../../apis/endpoints';
import { HiOutlineTerminal } from 'react-icons/hi';


export const Devices: IDevice[] = [
    { name: 'Computador', plural: 'Computadores', color: '#BD9E3E', icon: <MdOutlineComputer />, to: '/computers/create', url: urlComputers, css: 'computer' },
    { name: 'Ramal', plural: 'Ramais', color: '#F2921D', icon: <MdPhoneInTalk />, to: '/ramais/create', url: urlRamais, css: 'ramal' },
    { name: 'Chip', plural: 'Chips', color: '#582698', icon: <MdOutlineSimCard />, to: '/chips/create', url: urlChips, css: 'chip' },
    { name: 'DVR', plural: 'DVRs', color: '#2c3e50', icon: <TbDeviceComputerCamera />, to: '/dvrs/create', url: urlDVRs, css: 'dvr' },
    { name: 'Impressora', plural: 'Impressoras', color: '#2980b9', icon: <TfiPrinter />, to: '/printers/create', url: urlPrinters, css: 'printer' },
    { name: 'Nobreak', plural: 'Nobreaks', color: '#ff3f34', icon: <MdSettingsPower />, to: '/nobreaks/create', url: urlNobreaks, css: 'nobreak' }
];

export const NetworkDevices: IDevice[] = [
    { name: 'Roteador', plural: 'Roteadores', color: '#F09B1A', icon: <TbRouter />, to: '/network/devices/routers/create', url: urlRouters, css: 'router' },
    { name: 'Switch', plural: 'Switches', color: '#D71E28', icon: <BsHddNetwork />, to: '/network/devices/switches/create', url: urlSwitches, css: 'switch' },
    { name: 'Ponto de Rede', plural: 'Pontos de Rede', color: '#82CD47', icon: <RiNodeTree />, to: '/network/devices/nodes/create', url: urlNetworkNodes, css: 'node' },
];

export const Servers: IDevice[] = [
    { name: 'Servidor Host', plural: 'Servidores', color: '#7770A1', icon: <TbServer2 />, to: '/servers/hosts/create', url: urlHosts, css: 'srv-host' },
    { name: 'Máquina Virtual', plural: 'Máquinas Virtuais', color: '#918CB0', icon: <HiOutlineTerminal />, to: '/servers/vms/create', url: urlVMS, css: 'srv-vm' }
];

export const Employees: IDevice[] = [
    { name: 'Colaborador', plural: 'Colaboradores', color: '#885AC3', icon: <>Icon</>, to:'/employees/create/', url: urlEmployees, css: 'employee' },
    { name: 'VPN', plural: 'VPNS', color: '#b1250e', icon: <>Icon</>, to:'/employees/create/', url: urlVPNS, css: 'vpn' },
    { name: 'Skype', plural: 'Skypes', color: '#00aff0', icon: <>Icon</>, to:'/employees/create/', url: urlSkypes, css: 'skype' }
];