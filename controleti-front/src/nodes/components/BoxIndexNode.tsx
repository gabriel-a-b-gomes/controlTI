import { ReactElement, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Status } from '../../utils/enums/Enums';
import { NetworkNodeDTO } from '../models/networknodes.model';

import '../styles/BoxIndexNodeStyles.css';

function BoxIndexNode(props: BoxIndexNodeProps) {
    const [toggleDetails, setToggleDetails] = useState<boolean>(false);

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
            return 'Switch do Ponto de Rede Desativado';
        }

        return 'Ponto de Rede Ativo';
    }

    function hasPatchPanelInfo(node: NetworkNodeDTO):boolean {
        if (node.patchPanelPort) return true;
        if (node.patchPanelNodeId && node.patchPanelNodeId.length > 0) return true;
        if (node.patchPanelLocation && node.patchPanelLocation.length > 0) return true;

        return false;
    }

    return (
        <div className={`box-container node ${props.node.switchOfNode.status === Status.Desativo && 'disable'}`} title={getTitle(props.node.switchOfNode.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.node.code}
                        <div className='box-indicator'>
                            {Indicator(props.node.switchOfNode.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>
                            Switch: {props.node.switchOfNode.code}
                        </span>
                        <span>Local do Switch: {props.node.switchOfNode.location}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Porta do Switch</label>
                            <span>{props.node.switchPort}</span>
                        </div>
                        <div className='box-info'>
                            {/* Melhorar isso */}
                            <label>{props.node.employeeNetworkNode ? props.node.employeeNetworkNode.displayName : 'Sem'}</label>
                            <span>
                                {props.node.employeeNetworkNode ? 
                                        props.node.employeeNetworkNode.department ? 
                                            `${props.node.employeeNetworkNode.department.description} ${props.node.employeeNetworkNode.department.enterprise}` 
                                            : 'Colaborador' 
                                        : 'Colaborador'}
                            </span>
                        </div>
                        <div className='box-info'>
                            <label>Localização do Ponto</label>
                            <span>{props.node.location}</span>
                        </div>
                    </div>
                    {hasPatchPanelInfo(props.node) && 
                        <button className={`expand ${toggleDetails ? 'up' : 'down'}`} onClick={() => setToggleDetails(!toggleDetails)}><MdOutlineExpandMore /></button>
                    }
                </div>
                <div className='box-buttons'>
                    {props.buttons}
                </div>
            </div>
            {hasPatchPanelInfo(props.node) && toggleDetails &&
                <div className="box-details">
                    <div className='box-topic'>
                        <label>Local do Patch Panel:</label>
                        <span>{props.node.patchPanelLocation}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Porta no Patch Panel:</label>
                        <span>{props.node.patchPanelPort}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Patch Panel Id:</label>
                        <span>{props.node.patchPanelNodeId}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexNodeProps {
    node: NetworkNodeDTO;
    buttons: ReactElement;
}

export default BoxIndexNode;