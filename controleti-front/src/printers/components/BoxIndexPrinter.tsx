import { ReactElement, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { PrinterType, Status } from '../../utils/enums/Enums';
import { handleDateIndex } from '../../utils/functions/Handles';
import { PrinterDTO } from '../models/printer.model';

import '../styles/BoxIndexPrinterStyles.css';
import CopyToClipBoard from '../../components/CopyToClipBoard';

function BoxIndexPrinter(props: BoxIndexPrinterProps) {
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

    function handlePrinterType(type: number | undefined) {
        if (type === undefined) return "";
        
        return PrinterType[type];
    }

    function getTitle(status: number): string {
        if (status === Status.Desativo) {
            return 'Impressora Desativada';
        }

        return 'Impressora Ativa';
    }

    return (
        <div className={`box-container printer ${props.printer.status === Status.Desativo && 'disable'}`} title={getTitle(props.printer.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.printer.code}
                        <div className='box-indicator'>
                            {Indicator(props.printer.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>
                            Marca: {props.printer.brand}
                        </span>
                        <span>Local: {props.printer.location}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Modelo: {props.printer.model}</label>
                            <span>Tipo: {handlePrinterType(props.printer.type)}</span>
                        </div>
                        <div className='box-info'>
                            <label>IP da Impressora</label>
                            {props.printer.printerIP ? <span><a href={'http://' + props.printer.printerIP} >{props.printer.printerIP}</a></span> : <span>_</span>}
                        </div>
                        <div className='box-info'>
                            <label>Suprimento</label>
                            <span>{props.printer.supplies}</span>
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
                        <label>Usuário:</label>
                        <CopyToClipBoard valueToCopy={props.printer.printerUser} />
                    </div>
                    <div className='box-topic'>
                        <label>Senha:</label>
                        <CopyToClipBoard valueToCopy={props.printer.printerPassword} />
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.printer.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Série:</label>
                        <span>{props.printer.serialNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.printer.acquisitionDate)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexPrinterProps {
    printer: PrinterDTO;
    buttons: ReactElement;
}

export default BoxIndexPrinter;