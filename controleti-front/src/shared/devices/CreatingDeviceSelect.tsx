import { ReactElement } from "react";

import './styles/CreatingDeviceSelect.css'

function CreatingDeviceSelect(props: CreatingDeviceSelectProps) {
    return (
        <div className="dropdown">
            <button className={`select-form-device ${props.selectStyle}`} type="button" id="dropdownSelect" data-bs-toggle="dropdown" aria-expanded="false">
                {props.display}
                <span className="dropdown-toggle" />
            </button>
            <ul className="dropdevice dropdown-menu dropdown-menu-end" aria-labelledby="dropdownSelect">
                {props.children}
            </ul>
        </div>
    );
}

interface CreatingDeviceSelectProps {
    display: string;
    selectStyle?: string;
    children: ReactElement;
}

export default CreatingDeviceSelect;