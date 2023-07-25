import { ReactElement } from "react";
import { Modal } from "react-bootstrap";

import './styles/ModalStyles.css';

function OptionsModal(props: OptionsModalProps) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="modal-options"
        >
                <Modal.Header className="modal-options-header">
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-options-title">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <button className="close-modal" onClick={props.onHide}>Fechar</button>
                </Modal.Footer>
        </Modal>   
    );
}

interface OptionsModalProps {
    title: string;
    show: boolean;
    onHide: () => void;
    children: ReactElement;
}

export default OptionsModal;