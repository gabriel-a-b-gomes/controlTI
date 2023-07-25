import { useState } from 'react';

import { MdHistory } from "react-icons/md";
import HistoryModal from "../../modals/HistoryModal";
import { handleDateIndex } from '../../utils/functions/Handles';
import { DevicePreventiveDTO } from "../models/preventive.model"; 

function PreventiveHistory(props: PreventiveHistoryProps) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <button className='log-preventive-button' onClick={() => setOpen(true)}><span>Preventivas Anteriores</span><MdHistory size={16} /></button>
            <HistoryModal title={"Preventivas " + props.equipament.code} show={open} onHide={() => setOpen(false)} size='lg'>
                <table className='table preventives' style={{ borderTopColor: props.color, marginBottom: 0 }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Código</th>
                            <th>Data da Preventiva</th>
                            <th>Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.equipament.preventives?.map(preventive => 
                            <tr key={preventive.ticketId + preventive.preventiveDate}>
                                <td>{preventive.id}</td>
                                <td>{props.equipament.code}</td>
                                <td>{handleDateIndex(preventive.preventiveDate)}</td>
                                <td>{preventive.ticketId}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </HistoryModal>
        </>
    );
}

interface PreventiveHistoryProps {
    equipament: DevicePreventiveDTO;
    color: string;
}

export default PreventiveHistory;