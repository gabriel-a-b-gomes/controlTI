import { ReactElement } from 'react';
import { Modal } from 'react-bootstrap';

import './styles/ModalStyles.css';

function CRUDModal(props: CRUDModalProps) {
    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="modal-crud"
        >
                <Modal.Header className="modal-crud-header">
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-crud-title">
                        {props.title}
                    </Modal.Title>
                    {props.icon}
                </Modal.Header>
                <Modal.Body className='modal-crud-body'>
                    {props.children}
                </Modal.Body>
        </Modal>   
    );
}

interface CRUDModalProps {
    title: string;
    show: boolean;
    icon: ReactElement;
    onHide: () => void;
    children: ReactElement;
}

export default CRUDModal;