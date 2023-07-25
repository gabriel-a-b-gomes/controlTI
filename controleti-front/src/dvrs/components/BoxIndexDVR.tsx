import { useState, ReactElement } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Status } from '../../utils/enums/Enums';
import { handleDateIndex } from '../../utils/functions/Handles';

import { DVRDTO } from "../models/dvr.model";

import '../styles/BoxIndexDVRStyles.css';
import CopyToClipBoard from '../../components/CopyToClipBoard';

function BoxIndexDVR(props: BoxIndexDVRProps) {
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
            return 'DVR Desativado';
        }

        return 'DVR Ativo';
    }

    return (
        <div className={`box-container dvr ${props.dvr.status === Status.Desativo && 'disable'}`} title={getTitle(props.dvr.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.dvr.code}
                        <div className='box-indicator'>
                            {Indicator(props.dvr.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>Marca: {props.dvr.brand}</span>
                        <span>Local: {props.dvr.location}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Canais Físicos: {props.dvr.qtdeChannels}</label>
                            <span>Cameras Ativas: {props.dvr.activeCams}</span>
                        </div>
                        <div className='box-info'>
                            <label>IP: {props.dvr.dvrIP}</label>
                            <span>Porta: {props.dvr.dvrPort}</span>
                        </div>
                        <div className='box-info'>
                            <label>Usuário: {props.dvr.dvrUser}</label>
                            <span className='clip-with-label'>Senha: <CopyToClipBoard valueToCopy={props.dvr.dvrPassword} /></span>
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
                        <label>Modelo:</label>
                        <span>{props.dvr.model.length > 0 ? props.dvr.model : 'N.A.'} ({props.dvr.hasBalun ? 'C/ Balun' : 'S/ Balun'})</span>
                    </div>
                    <div className='box-topic'>
                        <label>Tamanho do HD:</label>
                        <span>{props.dvr.hdSize} TB</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.dvr.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.dvr.acquisitionDate)}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Preventiva:</label>
                        <span>{handleDateIndex(props.dvr.lastPreventive)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexDVRProps {
    dvr: DVRDTO;
    buttons: ReactElement;
}

export default BoxIndexDVR;