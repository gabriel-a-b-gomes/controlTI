import { ReactElement } from 'react';
import { ServerVMDTO } from "../models/vm.model";
import { Status } from '../../utils/enums/Enums';
import { IoCloseCircle } from 'react-icons/io5';
import { HiCheckCircle } from 'react-icons/hi';
import { handleDateIndex } from '../../utils/functions/Handles';
import { MdMoreHoriz } from 'react-icons/md';
import InfoAlert from '../../utils/alerts/InfoAlert';

import '../styles/BoxServerStyles.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';

function BoxIndexVM(props: BoxIndexVMProps) {
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
            return 'Máquina Virtual Desativada';
        }

        return 'Máquina Virtual Ativa';
    }

    function handleListFuncs(): string {
        let funcsList = '';

        funcsList += '<table class=\'table memories\'>'
        funcsList += '<thead><tr><th>Descrição</th></tr></thead>'
        funcsList += '<tbody>'
        props.virtualMachine.functionalities.forEach(ff => {
            funcsList += '<tr><td>' + ff.functionality.description + '</td></tr>';
        });
        funcsList += '</tbody>'
        funcsList += '</table>'

        return funcsList;
    }

    return (
        <div className={`box-container vm ${props.virtualMachine.status === Status.Desativo && 'disable'}`} title={getTitle(props.virtualMachine.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.virtualMachine.code}
                        <div className='box-indicator'>
                            {Indicator(props.virtualMachine.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.virtualMachine.operationalSystem}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Funcionalidades</label>
                            <span>
                                {props.virtualMachine.functionalities && props.virtualMachine.functionalities.length > 0 ?
                                    <>
                                    {props.virtualMachine.functionalities[0].functionality.description} : 
                                    <button title={'Ver todas as funcionalidades de ' + props.virtualMachine.code} onClick={() => InfoAlert(`Funcionalidades: ${props.virtualMachine.code}`, handleListFuncs())}>
                                        Detalhes{"  "}<MdMoreHoriz />
                                    </button>
                                    </>
                                    :
                                    "Sem Funcionalidades Atribuídas"
                                }
                            </span>
                        </div>
                        <div className='box-info'>
                            <label>Armazenamento</label>
                            <span>{props.virtualMachine.storageSize} GB</span>
                        </div>
                        <div className='box-info'>
                            <label>Memória</label>
                            <span>{props.virtualMachine.memorySize} GB</span>
                        </div>
                    </div>
                    {props.virtualMachine.setupDate && 
                        <div className='expand' title={` Última Formatação: ${handleDateIndex(props.virtualMachine.setupDate)}`}>
                            <IoMdInformationCircleOutline />
                        </div>
                    }
                </div>
                <div className='box-buttons'>
                    {props.buttons}
                </div>
            </div>
        </div>
    );
}

interface BoxIndexVMProps {
    virtualMachine: ServerVMDTO;
    buttons: ReactElement;
}

export default BoxIndexVM;