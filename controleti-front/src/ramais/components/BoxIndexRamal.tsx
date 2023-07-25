import { useState, ReactElement } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Status } from '../../utils/enums/Enums';
import { handleDateIndex } from '../../utils/functions/Handles';

import { RamalDTO } from "../models/ramal.model";

import '../styles/BoxIndexRamalStyles.css';
import { IoCloseCircle } from 'react-icons/io5';
import CopyToClipBoard from '../../components/CopyToClipBoard';

function BoxIndexRamal(props: BoxIndexRamalProps) {
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
            return 'Ramal Desativado';
        }

        return 'Ramal Ativo';
    }

    return (
        <div className={`box-container ramal ${props.ramal.status === Status.Desativo && 'disable'}`} title={getTitle(props.ramal.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.ramal.number}
                        <div className='box-indicator'>
                            {Indicator(props.ramal.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.ramal.employee ? props.ramal.employee.displayName : ''}</span>
                        <span>
                            {props.ramal.department ? 
                                `${props.ramal.department.description} - ${props.ramal.department.enterprise}` : ''}
                        </span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Aparelho</label>
                            <span>{props.ramal.model}</span>
                        </div>
                        <div className='box-info'>
                            <label>IP Configurado</label>
                            <span><a href={'https://' + props.ramal.deviceIP} >{props.ramal.deviceIP}</a></span>
                        </div>
                        <div className='box-info'>
                            <label>Usuário: {props.ramal.deviceUser}</label>
                            <span className='clip-with-label'>Senha: <CopyToClipBoard valueToCopy={props.ramal.devicePassword} /></span>
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
                        <label>É de Departamento:</label>
                        <span>{props.ramal.isDepartment ? 'SIM' : 'NÃO'}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Tronco de Saída:</label>
                        <span>{props.ramal.exitNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Gateway:</label>
                        <span>{props.ramal.deviceConfig}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.ramal.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.ramal.acquisitionDate)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexRamalProps {
    ramal: RamalDTO;
    buttons: ReactElement;
}

export default BoxIndexRamal;