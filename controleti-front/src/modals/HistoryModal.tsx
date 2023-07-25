import { ReactElement } from 'react';
import { Modal } from 'react-bootstrap';

import { MdHistory } from 'react-icons/md';

import './styles/ModalStyles.css';

function HistoryModal(props: HistoryModalProps) {
    return (
        <Modal
            size={props.size}
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="modal-history"
        >
                <Modal.Header className="modal-history-header">
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-history-title">
                        {props.title}
                    </Modal.Title>
                    <MdHistory size={20} />
                </Modal.Header>
                <Modal.Body className='modal-history-body'>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <button className="close-modal" onClick={props.onHide}>Fechar</button>
                </Modal.Footer>
        </Modal>   
    );
}

interface HistoryModalProps {
    title: string;
    show: boolean;
    onHide: () => void;
    children: ReactElement;
    size?: 'xl' | 'lg';
}

HistoryModal.defaultProps = {
    size: 'xl'
}

export default HistoryModal;