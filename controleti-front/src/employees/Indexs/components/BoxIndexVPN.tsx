import { ReactElement } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { Status } from '../../../utils/enums/Enums';
import { VpnDTO } from '../../models/vpn.model';

import '../styles/BoxIndexVPNStyles.css';
import CopyToClipBoard from '../../../components/CopyToClipBoard';

function BoxIndexVPN(props: BoxIndexVPNProps) {
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
            return 'Usuário VPN Desligado';
        }

        return 'Usuário VPN Ativo';
    }

    return (
        <div className={`box-container vpn ${props.vpn.employee.status === Status.Desativo && 'disable'}`} title={getTitle(props.vpn.employee.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.vpn.employee.displayName}
                        <div className='box-indicator'>
                            {Indicator(props.vpn.employee.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.vpn.employee.department ? props.vpn.employee.department.description : ''}</span>
                        <span>
                            {props.vpn.employee.department ? props.vpn.employee.department.enterprise : ''}
                        </span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Usuário da VPN</label>
                            <CopyToClipBoard valueToCopy={props.vpn.vpnUser} />
                        </div>
                        <div className='box-info'>
                            <label>Senha</label>
                            <CopyToClipBoard valueToCopy={props.vpn.vpnPassword} />
                        </div>
                    </div>
                </div>
                <div className='box-buttons'>
                    {props.buttons}
                </div>
            </div>
        </div>
    );
}

interface BoxIndexVPNProps {
    vpn: VpnDTO;
    buttons: ReactElement;
}

export default BoxIndexVPN;