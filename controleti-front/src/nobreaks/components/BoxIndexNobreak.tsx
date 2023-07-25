import { useState, ReactElement } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { NobreakType, Status } from '../../utils/enums/Enums';
import { handleDateIndex } from '../../utils/functions/Handles';
import { NobreakDTO } from '../models/nobreak.model';

import '../styles/BoxIndexNobreakStyles.css';

function BoxIndexNobreak(props: BoxIndexNobreakProps) {
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

    function handleTypeOfUse(type: number | undefined) {
        if (type === undefined) return "";
        
        return NobreakType[type];
    }

    function getTitle(status: number): string {
        if (status === Status.Desativo) {
            return 'Nobreak Desativado';
        }

        return 'Nobreak Ativo';
    }

    return (
        <div className={`box-container nobreak ${props.nobreak.status === Status.Desativo && 'disable'}`} title={getTitle(props.nobreak.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.nobreak.code}
                        <div className='box-indicator'>
                            {Indicator(props.nobreak.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>
                            Marca: {props.nobreak.brand}
                        </span>
                        <span>Local: {props.nobreak.location}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Modelo</label>
                            <span>{props.nobreak.model}</span>
                        </div>
                        <div className='box-info'>
                            <label>Quantidade de VA</label>
                            <span>{props.nobreak.qtdeVA} VA</span>
                        </div>
                        <div className='box-info'>
                            <label>Tipo de Uso</label>
                            <span>{handleTypeOfUse(props.nobreak.typeOfUse)}</span>
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
                        <label>É Senoidal:</label>
                        <span>{props.nobreak.isSenoidal ? 'SIM' : 'NÃO'}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.nobreak.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.nobreak.acquisitionDate)}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Preventiva:</label>
                        <span>{handleDateIndex(props.nobreak.lastPreventive)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexNobreakProps {
    nobreak: NobreakDTO;
    buttons: ReactElement;
}

export default BoxIndexNobreak;