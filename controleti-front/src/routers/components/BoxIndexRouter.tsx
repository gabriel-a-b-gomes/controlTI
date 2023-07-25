import { ReactElement, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { Status } from "../../utils/enums/Enums";
import { handleDateIndex } from "../../utils/functions/Handles";
import { RouterDTO } from "../models/router.model";

import '../styles/BoxIndexRouterStyles.css';
import CopyToClipBoard from "../../components/CopyToClipBoard";

function BoxIndexRouter(props: BoxIndexRouterProps) {
    const [toggleDetails, setToggleDetails] = useState<boolean>(false);

    function Indicator(status: number):ReactElement {
        function getIndicator(status: number):ReactElement {
            if (status === Status.Desativo) 
                return <div className='indicator disable'><IoCloseCircle /></div>;

            return <div className='indicator enable'><HiCheckCircle /></div>;
        }
 
        return (
            <>
                {getIndicator(status)}
            </>
        );
    }

    function getTitle(status: number): string {
        if (status === Status.Desativo) {
            return 'Roteador Desativado';
        }

        return 'Roteador Ativo';
    }

    return (
        <div className={`box-container router ${props.router.status === Status.Desativo && 'disable'}`} title={getTitle(props.router.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.router.code}
                        <div className='box-indicator'>
                            {Indicator(props.router.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>
                            Marca: {props.router.brand}
                        </span>
                        <span>Local: {props.router.location}</span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>SSID</label>
                            <span>{props.router.routerSSID}</span>
                        </div>
                        <div className='box-info'>
                            <label>IP do Roteador</label>
                            <span><a href={'http://' + props.router.routerIP} >{props.router.routerIP}</a></span>
                        </div>
                        <div className='box-info'>
                            <label>Usuário: {props.router.routerUser}</label>
                            <span className='clip-with-label'>Senha: <CopyToClipBoard valueToCopy={props.router.routerPassword} /></span>
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
                        <span>{props.router.routerMAC}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ativo:</label>
                        <span>{props.router.assetNumber}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Aquisição:</label>
                        <span>{handleDateIndex(props.router.acquisitionDate)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexRouterProps {
    router: RouterDTO;
    buttons: ReactElement;
}

export default BoxIndexRouter;