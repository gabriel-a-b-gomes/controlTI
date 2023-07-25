import { ReactElement, useEffect, useState } from "react";
import { FiList } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Devices, NetworkDevices } from "../../shared/devices/Devices";
import { PingDTO } from "../models/ping.model";

import '../styles/BoxPingStyles.css';
import { Servers } from "../../shared/devices/Devices";

enum DeviceCategory {
    computer = 0,
    ramal = 1,
    dvr = 2,
    printer = 3,
    router = 4,
    switches = 5,
    host = 6,
    vm = 7
}


enum IPAdress {
    "Bad Destination" = 11018,
    "Bad Header" = 11042,
    "Bad Option" = 11007,
    "Bad Route" = 11012,
    "Problema no endereco de destino" = 11003,
    "Problema na rede de destino" = 11002,
    "Problema na porta de destino" = 11005,
    "Destino Proíbido" = 11004,
    "Problema no escopo de destino" = 11045,
    "Problema no destino" = 11040,
    "Erro de Hardware" = 11008,
    "Erro no ICMP" = 11044,
    "Sem Recursos" = 11006,
    "Pacote muito grande" = 11009,
    "Problema no parâmetro" = 11015,
    "Pacote Discartado" = 11016,
    "Sucesso" = 0,
    "TimedOut" = 11010,
    "Tempo Excedido" = 11041,
    "TTL Expirou" = 11013,
    "Fragmentos dos pacotes não foram recebidos" = 11014,
    "Desconhecido" = -1,
    "Next Header Desconhecido" = 11043
}

function PingBoxIndex(props: PingBoxIndexProps) {
    const navigate = useNavigate();

    const [icon, setIcon] = useState<ReactElement>();
    const [link, setLink] = useState<string>();
    const [title, setTitle] = useState<string>('');
    const [edit, setEdit] = useState<string>();
    const [color, setColor] = useState<string>();

    useEffect(() => {
        function getDeviceInfo() {
            if (props.devicePinged.deviceCategory === DeviceCategory.computer) {
                setIcon(Devices[0].icon);
                setColor(Devices[0].color);
                setLink('/computers');
                setEdit(`/computers/${props.devicePinged.deviceId}/edit`);
                setTitle('Computador');

                return ;
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.ramal) {
                setIcon(Devices[1].icon);
                setColor(Devices[1].color);
                setLink('/ramais');
                setEdit(`/ramais/${props.devicePinged.deviceId}/edit`);
                setTitle('Ramal');

                return ;
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.dvr) {
                setIcon(Devices[3].icon);
                setColor(Devices[3].color);
                setLink('/dvrs');
                setEdit(`/dvrs/${props.devicePinged.deviceId}/edit`);
                setTitle('DVR');

                return ;
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.printer) {
                setIcon(Devices[4].icon);
                setColor(Devices[4].color);
                setLink('/printers');
                setEdit(`/printers/${props.devicePinged.deviceId}/edit`);
                setTitle('Impressora');

                return ;
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.router) {
                setIcon(NetworkDevices[0].icon);
                setColor(NetworkDevices[0].color);
                setLink('/network/devices');
                setEdit(`/network/devices/routers/${props.devicePinged.deviceId}/edit`);
                setTitle('Roteador');

                return ;
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.switches) {
                setIcon(NetworkDevices[1].icon);
                setColor(NetworkDevices[1].color);
                setLink('/network/devices/switches');
                setEdit(`/network/devices/switches/${props.devicePinged.deviceId}/edit`);
                setTitle('Switch');

                return ;
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.host) {
                setIcon(Servers[0].icon);
                setColor(Servers[0].color);
                setLink('/servers');
                setEdit(`/servers/hosts/${props.devicePinged.deviceId}/edit`);
                setTitle('Servidor Host');
            }

            if (props.devicePinged.deviceCategory === DeviceCategory.vm) {
                setIcon(Servers[1].icon);
                setColor(Servers[1].color);
                setLink('/servers');
                setEdit(`/servers/vms/${props.devicePinged.deviceId}/edit`);
                setTitle('Máquina Virtual');
            }
        }

        getDeviceInfo();
    }, [props.devicePinged.deviceCategory, props.devicePinged.deviceId]);

    function getClassStatus() {
        return props.devicePinged.status === 0 ? 'active' : 'disable';
    }
    
    function handleIpStatus(ipStatus: number): string {
        return IPAdress[ipStatus];
    }

    function handleNavigate(to: string) {
        navigate(to);
    }

    function buttons(): ReactElement {
        return (
            <div className="buttons-ping">
                <button onClick={() => handleNavigate(edit!)} title="Detalhes" ><MdOutlineOpenInNew /></button>
                <button onClick={() => handleNavigate(link!)} title="Listar Equipamentos" ><FiList /></button>
            </div>
        );
    }

    return (
        <div className="box-ping-container" title={title}>
            <div className="box-ping-title">
                {icon}
                <span style={{ borderColor: color }}>{props.devicePinged.code}</span>
                <div className={"status " + getClassStatus()}><div className="indicator-ip-status" />{handleIpStatus(props.devicePinged.status)}</div>
                {props.devicePinged.employee && props.devicePinged.employee.length > 0 && 
                    <div className="ping-obs">
                        <span className="title-obs">Colaborador: </span>
                        <span>{props.devicePinged.employee}</span>
                    </div>
                }
                {props.devicePinged.department && props.devicePinged.enterprise &&
                    props.devicePinged.department.length > 0 &&
                    props.devicePinged.enterprise.length > 0 &&
                    <div className="ping-obs">
                        <span className="title-obs">Departamento: </span>
                        <span>{props.devicePinged.department} {props.devicePinged.enterprise}</span>
                    </div>
                }
            </div>
            <div className="box-ping-content">
                <span><strong>Endereço:</strong> {props.devicePinged.address}</span>
                <span>{props.devicePinged.roundTripTime} ms</span>
                {buttons()}
            </div>
        </div>
    );
}

interface PingBoxIndexProps {
    devicePinged: PingDTO;
}




export default PingBoxIndex;