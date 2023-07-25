import { ReactElement, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Status } from '../../../utils/enums/Enums';
import { handleDateIndex } from '../../../utils/functions/Handles';
import { EmployeeDTO } from '../../models/employee.model';

import '../styles/BoxIndexEmployeeStyles.css';
import CopyToClipBoard from '../../../components/CopyToClipBoard';

function BoxIndexEmployee(props: BoxIndexEmployeeProps) {
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
            return 'Colaborador Desligado';
        }

        return 'Colaborador Ativo';
    }

    return (
        <div className={`box-container employee ${props.employee.status === Status.Desativo && 'disable'}`} title={getTitle(props.employee.status)}>
            <div className='box-main'>
                <div className='box-area'>
                    <span className='title'>
                        {props.employee.displayName}
                        <div className='box-indicator'>
                            {Indicator(props.employee.status)}
                        </div>
                    </span>
                    <div className='box-column'>
                        <span>{props.employee.department ? props.employee.department.description : ''}</span>
                        <span>
                            {props.employee.department ? props.employee.department.enterprise : ''}
                        </span>
                    </div>
                    <div className='box-all-general-info'>
                        <div className='box-info'>
                            <label>Usuário</label>
                            <span>{props.employee.name}</span>
                        </div>
                        <div className='box-info'>
                            <label>Email</label>
                            <CopyToClipBoard valueToCopy={props.employee.email} />
                        </div>
                        <div className='box-info'>
                            <label>Senha</label>
                            <CopyToClipBoard valueToCopy={props.employee.emailPassword} />
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
                        <label>Computadores:</label>
                        <span>{props.employee.computers.length} un.</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ramais:</label>
                        <span>{props.employee.ramals.length} un.</span>
                    </div>
                    <div className='box-topic'>
                        <label>Chips:</label>
                        <span>{props.employee.chips.length} un.</span>
                    </div>
                    <div className='box-topic'>
                        <label>Tem email alternativo:</label>
                        <span>{props.employee.alternativeEmail ? 'SIM' : 'NÃO'}</span>
                    </div>
                    <div className='box-topic'>
                        <label>Ingresso:</label>
                        <span>{handleDateIndex(props.employee.ingressDate)}</span>
                    </div>
                </div>
            }
        </div>
    );
}

interface BoxIndexEmployeeProps {
    employee: EmployeeDTO;
    buttons: ReactElement;
}

export default BoxIndexEmployee;