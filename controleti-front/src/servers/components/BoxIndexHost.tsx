import { ReactElement, useState } from "react";
import { ServerHostDTO } from "../models/host.model";
import { Status } from "../../utils/enums/Enums";
import { IoCloseCircle } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import InfoAlert from "../../utils/alerts/InfoAlert";
import { MdMoreHoriz, MdOutlineExpandMore } from "react-icons/md";
import { handleDateIndex } from "../../utils/functions/Handles";
import { Servers } from "../../shared/devices/Devices";
import BoxIndexVM from "./BoxIndexVM";

import '../styles/BoxServerStyles.css';

function BoxIndexHost(props: BoxIndexHostProps) {
    const [toggleDetails, setToggleDetails] = useState<boolean>(false);
    const [toggleVms, setToggleVms] = useState<boolean>(true);
    
    function Indicator(status: number):ReactElement {
        function getIndicator(status: number):ReactElement {
            if (status === Status.Desativo) 
                return <div className={`indicator disable`}><IoCloseCircle /></div>;

            return <div className={`indicator enable`}><HiCheckCircle /></div>;
        }
 
        return (
            <>
                {getIndicator(status)}
            </>
        );
    }

    function getTitle(status: number): string {
        if (status === Status.Desativo) {
            return 'Servidor Host Desativado';
        }

        return 'Servidor Host Ativo';
    }

    function handleListMemories(): string {
        let memoriesList = '';

        memoriesList += '<table class=\'table memories\'>'
        memoriesList += '<thead><tr><th>Quantidade</th><th>Modelo (Tamanho do Pent.)</th></tr></thead>'
        memoriesList += '<tbody>'
        props.host.memories.forEach(mm => {
            memoriesList += '<tr><td>' + mm.qtde + 'x</td><td>' + mm.memory.model + ' (' + mm.memory.memoryPentSize + ' GB)</td></tr>';
        });
        memoriesList += '</tbody>'
        memoriesList += '</table>'

        return memoriesList;
    }

    function handleListStorages(): string {
        let storageList = '';

        storageList += '<table class=\'table memories\'>'
        storageList += '<thead><tr><th>Quantidade</th><th>Tamanho em TB (Tipo: Marca)</th></tr></thead>'
        storageList += '<tbody>'
        props.host.storages.forEach(ss => {
            storageList += '<tr><td>' + ss.qtde + 'x</td><td>' + ss.storage.storageSize + ' TB (' + ss.storage.type + ': ' + ss.storage.brand + ')</td></tr>';
        });
        storageList += '</tbody>'
        storageList += '</table>'

        return storageList;
    }

    function handleListFuncs(): string {
        let funcsList = '';

        funcsList += '<table class=\'table memories\'>'
        funcsList += '<thead><tr><th>Descrição</th></tr></thead>'
        funcsList += '<tbody>'
        props.host.functionalities.forEach(ff => {
            funcsList += '<tr><td>' + ff.functionality.description + '</td></tr>';
        });
        funcsList += '</tbody>'
        funcsList += '</table>'

        return funcsList;
    }

    return (
        <div>
            <div className={`box-container server ${props.host.status === Status.Desativo && 'disable'}`} title={getTitle(props.host.status)}>
                <div className='box-main'>
                    <div className='box-area'>
                        <span className='title'>
                            {props.host.code}
                            <div className='box-indicator'>
                                {Indicator(props.host.status)}
                            </div>
                        </span>
                        <div className='box-column'>
                            <span>
                                {props.host.machineBrand}
                            </span>
                            <span>{props.host.machineModel}</span>
                        </div>
                        
                        <div className='box-all-general-info'>
                            <div className='box-info'>
                                <label>Funcionalidades</label>
                                <span>
                                    {props.host.functionalities && props.host.functionalities.length > 0 ?
                                        <>
                                        {props.host.functionalities[0].functionality.description} : 
                                        <button title={'Ver todas as funcionalidades de ' + props.host.code} onClick={() => InfoAlert(`Funcionalidades: ${props.host.code}`, handleListFuncs())}>
                                            Detalhes{"  "}<MdMoreHoriz />
                                        </button>
                                        </>
                                        :
                                        "Sem Funcionalidades Atribuídas"
                                    }
                                </span>
                            </div>
                            <div className='box-info'>
                                <label>Memória</label>
                                <span>{props.host.memorySize} GB : 
                                    <button title={'Ver todas as memória de ' + props.host.code} onClick={() => InfoAlert(`Memórias: ${props.host.code}`, handleListMemories())}>
                                        {props.host.memories[0].memory.model}{"  "}<MdMoreHoriz />
                                    </button>
                                </span>
                            </div>
                            <div className='box-info'>
                                <label>Armazenamento</label>
                                <span>{props.host.storageSize} TB : 
                                    <button title={'Ver todas os armazenamentos de ' + props.host.code} onClick={() => InfoAlert(`Armazenamento: ${props.host.code}`, handleListStorages())}>
                                        Detalhes{"  "}<MdMoreHoriz />
                                    </button>
                                </span>
                            </div>
                        </div>
                        <button className={`expand ${toggleDetails ? 'up' : 'down'}`} onClick={() => setToggleDetails(!toggleDetails)}><MdOutlineExpandMore /></button>
                    </div>
                    <div className='box-buttons'>
                        {props.buttons}
                    </div>
                </div>
                {toggleDetails &&
                    <div className={`box-details ${props.host.status}`}>
                        <div className='box-topic'>
                            <label>Processador:</label>
                            <span>{props.host.processorModelDescription} {props.host.processorFrequency}</span>
                        </div>
                        <div className='box-topic'>
                            <label>Sistema Op.:</label>
                            <span>{props.host.operationalSystemDescription}</span>
                        </div>
                        <div className='box-topic'>
                            <label>Ativo:</label>
                            <span>{props.host.assetNumber}</span>
                        </div>
                        <div className='box-topic'>
                            <label>Aquisição:</label>
                            <span>{handleDateIndex(props.host.acquisitionDate)}</span>
                        </div>
                        <div className='box-topic'>
                            <label>Preventiva:</label>
                            <span>{handleDateIndex(props.host.lastPreventiveDate)}</span>
                        </div>
                    </div>
                }
            </div>
            {props.host.virtualMachines && props.host.virtualMachines.length > 0 &&
                <div className="vm-list-container"> 
                    <button className="vm-list-toggle" onClick={() => setToggleVms(prev => !prev)}>
                        <span>{Servers[1].icon} Máquinas Virtuais</span>
                        <span>Quantidade: {props.host.virtualMachines.length}</span>
                    </button>
                    {toggleVms &&
                        <ul>
                            {props.host.virtualMachines.map(vm =>
                                <BoxIndexVM key={vm.code} virtualMachine={vm} buttons={props.buttonsVirtualMachines(vm.id, vm.code)} />
                            )}
                        </ul>
                    }
                </div>
            }
        </div>
    );
}

interface BoxIndexHostProps {
    host: ServerHostDTO;
    buttons: ReactElement;
    buttonsVirtualMachines: (vmId: number, vmCode: string) => ReactElement; 
}

export default BoxIndexHost;