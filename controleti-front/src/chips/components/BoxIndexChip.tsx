import { ReactElement, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { MdMoreHoriz, MdOutlineExpandMore } from "react-icons/md";
import { Status } from "../../utils/enums/Enums";
import { handleDateIndex } from "../../utils/functions/Handles";
import { ChipDTO } from "../models/chip.model";

import '../styles/BoxIndexChipStyles.css';
import InfoAlert from "../../utils/alerts/InfoAlert";
import { CellphoneDTO } from "../models/cellphone.model";

function BoxIndexChip(props: BoxIndexChipProps) {
    const [toggleDetails, setToggleDetails] = useState<boolean>(false);

    function Indicator(status: number):ReactElement {
        function getIndicator(status: number):ReactElement {
            if (status === Status.Desativo) 
                return <div className={`indicator disable`}><IoCloseCircle /></div>;

            return <div className={`indicator enable`}><HiCheckCircle /></div>;
        }
 
        return (getIndicator(status));
    }

    function getTitle(status: number): string {
        if (status === Status.Desativo) {
            return 'Chip Desativado';
        }

        return 'Chip Ativo';
    }

    function handleDetailedCellphone(cellphone: CellphoneDTO): string {
        let detailed = '';

        detailed += '<table class=\'table alert\'>'
        detailed += '<tbody>'
        detailed += '<tr><td>Modelo</td><td>' + cellphone.model + '</td></tr>'
        detailed += '<tr><td>Sistema Operacional</td><td>' + cellphone.operationalSystem + '</td></tr>'
        detailed += '<tr><td>Processador</td><td>' + cellphone.processingUnit + '</td></tr>'
        detailed += '<tr><td>Armazenamento</td><td>' + cellphone.storageSize + ' GB</td></tr>'
        detailed += '<tr><td>Memória RAM</td><td>' + cellphone.memorySize + ' GB</td></tr>'
        detailed += '</tbody>'
        detailed += '</table>'

        return detailed;
    }

    return (
        <div className={`box-container chip ${props.chip.status === Status.Desativo && 'disable'}`} title={getTitle(props.chip.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.chip.number}
                        <div className='box-indicator'>
                            {Indicator(props.chip.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.chip.employee ? props.chip.employee.displayName : ''}</span>
                        <span>
                            {props.chip.department ? 
                                `${props.chip.department.description} - ${props.chip.department.enterprise}` : ''}
                        </span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Conta</label>
                            <span>{props.chip.account}</span>
                        </div>
                        <div className='box-info'>
                            <label>Aparelho</label>
                            <span>
                                {props.chip.cellPhone ? 
                                    <button
                                        title="Clique para obter detalhes do celular" 
                                        onClick={() => InfoAlert(`Detalhes do Celular`, handleDetailedCellphone(props.chip.cellPhone), 'Certo', '#8948de')}
                                    >
                                        {props.chip.cellPhone.model}{' '}<MdMoreHoriz />
                                    </button>  
                                : 
                                    ''
                                }
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
                <div className="box-details">
                    <div className='box-topic'>
                        <label>ICCID:</label>
                        <span>{props.chip.acctualICCID}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Tipo:</label>
                        <span>{props.chip.type}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.chip.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.chip.acquisitionDate)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexChipProps {
    chip: ChipDTO;
    buttons: ReactElement;
}

export default BoxIndexChip;