import { TbNotesOff } from 'react-icons/tb';

import './styles/Empty.css';

export function EmptyPreventive(props: { text: string; }) {
    return (
        <div className='empty-list preventives'>
            <span>{props.text}</span>
            <TbNotesOff />
        </div>
    );
}

export function EmptyList() {
    return (
        <div className='empty-list'>
            <span>NENHUM REGISTRO</span>
            <TbNotesOff />
        </div>
    );
}

export function EmptyTable() {
    return (
        <div className='empty-table'>
            <TbNotesOff size={80} />
            <p>NENHUM REGISTRO</p>
        </div>
    );
}