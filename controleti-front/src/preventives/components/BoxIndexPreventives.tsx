import { ReactElement, useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IDevice } from '../../shared/devices/devices.model';
import ConfirmAlert from '../../utils/alerts/ConfirmAlert';
import { handleDateForm, handleDateIndex } from '../../utils/functions/Handles';
import { DevicePreventiveDTO } from "../models/preventive.model";
import AddPreventive from '../AddPreventive';
import EditPreventive from '../EditPreventive';

import '../styles/BoxIndexPreventivesStyles.css';
import { MdEdit, MdOutlinePostAdd } from 'react-icons/md';
import PreventiveHistory from './PreventiveHistory';

function BoxIndexPreventives(props: BoxIndexPreventivesProps) {
    const [change, setChange] = useState<boolean>(false);
    const [formOption, setFormOption] = useState<'add' | 'edit'>('edit');
    const [actions, setActions] = useState<ReactElement | undefined>(undefined);
    const [buttons, setButtons] = useState<ReactElement | undefined>(undefined);

    useEffect(() => {
        handleActions();
    }, [change]);

    function OverDueIndicator(duesProps: {
        lastPreventiveDate?: Date;
        createdAt: Date;
        children: (dueDate: string, isOverDue: boolean) => ReactElement; 
    }): ReactElement { 
        let dueDate: Date | undefined = undefined;
        let isOverDue: boolean = false;

        const addDays = 450;
        
        if (duesProps.lastPreventiveDate !== undefined) 
            dueDate = new Date(duesProps.lastPreventiveDate);
        else
            dueDate = new Date(duesProps.createdAt);
        
        dueDate.setDate(dueDate.getDate() + addDays);

        isOverDue = dueDate < new Date();
    
        return (duesProps.children(handleDateIndex(dueDate), isOverDue))
    }

    function handleActions(): void {
        if (props.area === 'todo') {
            // ToDo
            if (!change) {
                setButtons(<button onClick={() => setChange(true)}>Preventiva<MdOutlinePostAdd size={14} /></button>);
                setActions(
                    <div className='todo-preventive-middle'>
                        <div className='todo-preventive-infos'>
                            <OverDueIndicator 
                                createdAt={props.equipament.createdAt}
                                lastPreventiveDate={props.equipament.preventives && props.equipament.preventives.length > 0 ?
                                    props.equipament.preventives?.[0].preventiveDate 
                                    :
                                    undefined
                                }
                            >
                                {(dueDate, isOverDue) => (
                                    <>  
                                    {dueDate && dueDate.length > 0 &&
                                        <>
                                        {isOverDue ? <span className='over-due'>Em Atraso</span> : <div />}
                                        <div className='todo-preventive-info'>
                                            <span>Prazo:</span>
                                            <span className='info'>{dueDate}</span>
                                        </div>
                                        </>
                                    }
                                    </>
                                )}
                            </OverDueIndicator>
                            {props.equipament.preventives && props.equipament.preventives.length > 0 ?
                                <div className='todo-preventive-info'>
                                    <span>Última Preventiva:</span>
                                    <span className='info'>{handleDateIndex(
                                        props.equipament.preventives && props.equipament.preventives.length > 0 ?
                                            props.equipament.preventives?.[0].preventiveDate 
                                            :
                                            undefined
                                    )}</span>
                                </div>
                                :
                                <div />
                            }
                        </div>
                        <PreventiveHistory equipament={props.equipament} color={props.device.color} />
                    </div>
                ); 
            } else {  
                setButtons(<button className='cancel' onClick={() => setChange(false)}>Cancelar</button>);
                setActions(
                    <AddPreventive 
                        url={props.device.url}
                        model={{
                            lastPreventiveDate: handleDateForm(new Date())!,
                            ticketId: '',
                            deviceId: props.equipament.id
                        }}
                        refresh={props.refresh}
                        setError={(error) => props.setErrors(error)}
                    />
                );
            }
        } else {
            // Done
            if (!change) {
                setButtons(
                    <div className='triple'>
                        <button className='edit' onClick={() => { setChange(true); setFormOption('edit');}} title="Editar"><MdEdit /></button>
                        <button className='trash' onClick={() => ConfirmAlert(() => props.deletePreventive?.(), props.alertTitle, props.alertText)} title="Apagar"><RiDeleteBin5Fill /></button>
                        <button className='new' onClick={() => { setChange(true); setFormOption('add');}} title="Novo"><MdOutlinePostAdd size={18} /></button>
                    </div>
                );
                setActions(
                    <div className='done-preventive-middle'>
                        <div className='done-preventive-infos'>
                            <div className='done-preventive-info'>
                                <span>Última Preventiva:</span>
                                <span className='info'>{handleDateIndex(props.equipament.preventives[0].preventiveDate)}</span>
                            </div>
                            <div className='done-preventive-info'>
                                <span>Ticket:</span>
                                <a href={'http://srv-app/osticket/scp/tickets.php?id=' + (parseInt(props.equipament.preventives[0].ticketId) + 8)}>
                                    <span className='info'>#{props.equipament.preventives[0].ticketId}</span>    
                                </a>
                            </div>
                        </div>
                        <PreventiveHistory equipament={props.equipament} color={props.device.color} />
                    </div>
                );
            } else {
                setButtons(<button className='cancel' onClick={() => setChange(false)}>Cancelar</button>);
                if (formOption === 'edit') 
                    setActions(
                        <EditPreventive 
                            url={props.device.url} 
                            modelPreventive={{
                                id: props.equipament.preventives[0].id,
                                lastPreventiveDate: handleDateForm(props.equipament.preventives[0].preventiveDate)!, 
                                ticketId: props.equipament.preventives[0].ticketId,
                                deviceId: props.equipament.id
                            }}
                            refresh={props.refresh}
                            setSuccess={() => setChange(false)}
                            setError={(error) => props.setErrors(error)}
                        />
                    );
                else 
                    setActions(
                        <AddPreventive 
                            url={props.device.url}
                            model={{
                                lastPreventiveDate: handleDateForm(new Date())!,
                                ticketId: '',
                                deviceId: props.equipament.id
                            }}
                            refresh={props.refresh}
                            setError={(error) => props.setErrors(error)}
                        />
                    );       
            }
        }
    }
    
    return (
        <>
        {buttons && actions &&
            <div className='box-preventive-container'>
                <div className='box-preventive-area'>
                    <span className='preventive-title'>
                        {props.device.icon}
                        <span className={props.device.css} style={{ background: props.device.color }}>{props.equipament.code}</span>
                        {(props.equipament.employee || props.equipament.department) &&
                            <div className='computer-hint'>
                                <span className='employee'>{props.equipament.employee?.displayName}</span>
                                <span>{props.equipament.department?.description} {props.equipament.department?.enterprise}</span>
                            </div>
                        }
                    </span>
                    <div className='box-preventive-middle'>{actions}</div>
                </div>
                <div className='box-preventive-buttons'>{buttons}</div>
            </div>
        }
        </>
    );
}

interface BoxIndexPreventivesProps {
    device: IDevice;
    equipament: DevicePreventiveDTO;
    area: string;
    alertText?: string;
    alertTitle?: string;
    refresh: () => void; 
    setErrors: (error: string) => void;
    deletePreventive?: () => void;
}

export default BoxIndexPreventives;