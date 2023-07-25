import { ReactElement } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { Status } from '../../../utils/enums/Enums';
import { SkypeDTO } from '../../models/skype.model';

import '../styles/BoxIndexSkypeStyles.css';
import CopyToClipBoard from '../../../components/CopyToClipBoard';

function BoxIndexSkype(props: BoxIndexSkypeProps) {
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
            return 'Usuário Skype Desligado';
        }

        return 'Usuário Skype Ativo';
    }

    return (
        <div className={`box-container skype ${props.skype.employee.status === Status.Desativo && 'disable'}`} title={getTitle(props.skype.employee.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.skype.employee.displayName}
                        <div className='box-indicator'>
                            {Indicator(props.skype.employee.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.skype.employee.department ? props.skype.employee.department.description : ''}</span>
                        <span>
                            {props.skype.employee.department ? props.skype.employee.department.enterprise : ''}
                        </span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Usuário do skype</label>
                            <CopyToClipBoard valueToCopy={props.skype.skypeUser} />
                        </div>
                        <div className='box-info'>
                            <label>Senha</label>
                            <CopyToClipBoard valueToCopy={props.skype.skypePassword} />
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

interface BoxIndexSkypeProps {
    skype: SkypeDTO;
    buttons: ReactElement;
}

export default BoxIndexSkype;