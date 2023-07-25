import { ReactElement, useEffect, useState } from 'react';

import { MdError, MdMoreHoriz, MdOutlineExpandMore } from 'react-icons/md';
import { HiCheckCircle } from 'react-icons/hi';

import { handleDateIndex } from '../../utils/functions/Handles';
import { ComputerDTO } from "../models/computer.model";

import { RankProcessing, RankSO } from '../../utils/enums/Enums';
import WarningAlert from '../../utils/alerts/WarningAlert';
import InfoAlert from '../../utils/alerts/InfoAlert';

import '../styles/BoxComputerStyles.css';
import { IoCloseCircle } from 'react-icons/io5';

function BoxIndexComputer(props: BoxIndexComputerProps) {
    const [status, setStatus] = useState<string>('');
    const [toggleExpand, setToggleExpand] = useState<boolean>(false);

    useEffect(() => {
        setStatus(getStatus());
    }, []);

    function getStatus():string {
        let status = '';

        if (props.computer.status === 0) status = 'disable';
        if (!props.computer.isGood) return status + ' not-good';

        return status + ' good';
    }

    function getTitle(status: string):string {
        if (status.startsWith('disable')) return 'Computador Desativado';
        if (status.includes('not-good')) return 'Computador Fora do Recomendável';

        return 'Computador Dentro do Recomendável';
    }

    function Indicator(status: string):ReactElement {
        function handleTextNotGood(): string {
            let text = '';

            text += '<table class=\'table not-good\'>'
            text += '<tbody>'
            if (props.computer.memorySize < props.computer.profile.memoryMinSize) 
                text += '<tr><td>Aumentar memória RAM de ' + props.computer.memorySize + ' GB para <strong>' + props.computer.profile.memoryMinSize + ' GB</strong></td></tr>'; 
            if (props.computer.processingUnit.rankProcessingUnit < props.computer.profile.rankOfProcessingUnit)
                text += '<tr><td>Processador instalado é ' + RankProcessing[props.computer.processingUnit.rankProcessingUnit] 
                        + ', mas é preciso de um processador <strong>' + RankProcessing[props.computer.profile.rankOfProcessingUnit] + '</strong></td></tr>';
            if (props.computer.rankOperationalSystem < props.computer.profile.rankOfOperationSystem)
                text += '<tr><td>Sistema instalado não é o suficiente, formate e instale um sistema <strong>' + RankSO[props.computer.profile.rankOfOperationSystem] + '</strong></td></tr>';
            if (props.computer.profile.storageType === 'SSD' && props.computer.storage.type === 'HD')
                text += '<tr><td>Necessário a instalação de um <strong>SSD</strong></td></tr>';
            if (props.computer.storage.storageSize < props.computer.profile.storageMinSize) 
                text += '<tr><td>Pouco armazenamento disponível, é preciso de pelo menos <strong>' + props.computer.profile.storageMinSize + ' GB</strong> de armazenamento</td></tr>';
            text += '</tbody>'
            text += '</table>'
            

            return text;
        }

        function getIndicator(status: string):ReactElement {
            if (status.startsWith('disable')) 
                return <div className={`indicator disable`}><IoCloseCircle /></div>;
            if (status.includes('not-good')) 
                return <button className={`indicator not-good`} title='Clique Para Ver as Melhorias' onClick={() => WarningAlert('Pontos de Melhoria', handleTextNotGood())}><MdError /></button>;

            return <div className={`indicator good`}><HiCheckCircle /></div>;
        }

        return (
            <>
                {status.length > 0 &&
                    getIndicator(status)
                }
            </>
        );
    }

    function handleListMemories(): string {
        let memoriesList = '';

        memoriesList += '<table class=\'table memories\'>'
        memoriesList += '<thead><tr><th>Quantidade</th><th>Modelo (Tamanho do Pent.)</th></tr></thead>'
        memoriesList += '<tbody>'
        props.computer.memories.forEach(mm => {
            memoriesList += '<tr><td>' + mm.qtde + 'x</td><td>' + mm.memory.model + ' (' + mm.memory.memoryPentSize + ' GB)</td></tr>';
        });
        memoriesList += '</tbody>'
        memoriesList += '</table>'

        return memoriesList;
    }

    return (
        <div className={`box-container computer ${status}`} title={getTitle(status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.computer.code}
                        <div className='box-indicator'>
                            {Indicator(status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.computer.employee ? props.computer.employee.displayName : ''}</span>
                        <span>
                            {props.computer.department ? 
                                `${props.computer.department.description} - ${props.computer.department.enterprise}` : ''}
                        </span>
                    </div>
                    
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Processador</label>
                            <span>{props.computer.processingUnit.model} {props.computer.processingUnit.generation} {props.computer.processingUnit.frequency}</span>
                        </div>
                        <div className='box-info'>
                            <label>Memória</label>
                            <span>{props.computer.memorySize} GB : 
                                <button title={'Ver todas as memória de ' + props.computer.code} onClick={() => InfoAlert(`Memórias: ${props.computer.code}`, handleListMemories())}>
                                    {props.computer.memories[0].memory.model}{"  "}<MdMoreHoriz />
                                </button>
                            </span>
                        </div>
                        <div className='box-info'>
                            <label>Armazenamento</label>
                            <span>{props.computer.storage.storageSize} GB ({props.computer.storage.type})</span>
                        </div>
                    </div>
                    <button className={`expand ${toggleExpand ? 'up' : 'down'}`} onClick={() => setToggleExpand(!toggleExpand)}><MdOutlineExpandMore /></button>
                </div>
                <div className='box-buttons'>
                    {props.buttons}
                </div>
            </div>
            {toggleExpand &&
                <div className={`box-details ${status}`}>
                    <div className='box-topic'>
                        <label>Tipo:</label>
                        <span>{props.computer.computerType === 0 ? 'Desktop' : 'Notebook'}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Sistema Op.:</label>
                        <span>{props.computer.operationalSystem}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.computer.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Preventiva:</label>
                        <span>{handleDateIndex(props.computer.lastPreventiveDate)}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Perfil de Uso:</label>
                        <span>{props.computer.profile.name}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexComputerProps {
    computer: ComputerDTO;
    buttons: ReactElement;
}

export default BoxIndexComputer;