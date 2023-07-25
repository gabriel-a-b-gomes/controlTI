import { ReactElement } from 'react';
import { Modal } from 'react-bootstrap';

import './styles/ModalStyles.css';

function ReportModal(props: ReportModalProps) {
    return (
        <Modal
            size={props.size}
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="modal-report"
        >
            <Modal.Header className="modal-report-header">
                <Modal.Title id="contained-modal-title-vcenter" className="modal-report-title">
                    {props.title}
                </Modal.Title>
                {props.icon}
            </Modal.Header>
            <Modal.Body className='modal-report-body'>
                {props.children}
            </Modal.Body>
        </Modal>   
    );
}

interface ReportModalProps {
    title: string;
    show: boolean;
    size: "sm" | "lg";
    icon: ReactElement;
    onHide: () => void;
    children: ReactElement;
}

ReportModal.defaultProps = {
    size: "sm"
}

export default ReportModal;