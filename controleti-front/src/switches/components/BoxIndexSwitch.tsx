import { ReactElement, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Status } from '../../utils/enums/Enums';
import { handleDateIndex } from '../../utils/functions/Handles';
import { SwitchDTO } from '../models/switch.model';

import '../styles/BoxIndexSwitchStyles.css';
import CopyToClipBoard from '../../components/CopyToClipBoard';

function BoxIndexSwitch(props: BoxIndexSwitchProps) {
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
            return 'Switch Desativado';
        }

        return 'Switch Ativo';
    }

    return (
        <div className={`box-container switch ${props.switch.status === Status.Desativo && 'disable'}`} title={getTitle(props.switch.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.switch.code}
                        <div className='box-indicator'>
                            {Indicator(props.switch.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>
                            Marca: {props.switch.brand}
                        </span>
                        <span>Local: {props.switch.location}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Qtde. de Portas: {props.switch.qtdePorts}</label>
                            <span>Portas Usadas: {props.switch.networkNodes.length}</span>
                        </div>
                        <div className='box-info'>
                            <label>IP do Switch</label>
                            <span><a href={'http://' + props.switch.switchIP} >{props.switch.switchIP}</a></span>
                        </div>
                        <div className='box-info'>
                            <label>Usuário: {props.switch.switchUser}</label>
                            <span className='clip-with-label'>Senha: <CopyToClipBoard valueToCopy={props.switch.switchPassword} /></span>
                        </div>
                    </div>
                    <button className={`expand ${toggleDetails ? 'up' : 'down'}`} onClick={() => setToggleDetails(!toggleDetails)}><MdOutlineExpandMore /></button>
                </div>
                <div className='box-buttons'>
                    {props.buttons}
                </div>
            </div>
            {toggleDetails &&
                <div className="box-details">
                    <div className='box-topic'>
                        <label>MAC Address:</label>
                        <span>{props.switch.switchMAC}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.switch.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.switch.acquisitionDate)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexSwitchProps {
    switch: SwitchDTO;
    buttons: ReactElement;
}

export default BoxIndexSwitch;