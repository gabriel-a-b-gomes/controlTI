import { NavLink } from "react-router-dom";
import { IDevice } from "../shared/devices/devices.model";

import './styles/DeviceCard.css';

function DeviceCard(props: DeviceCardProps) {
    return (
        <NavLink to={props.device.to} className="card" style={{ background: props.device.color }}>
            <div className="card-icon">
                {props.device.icon}
            </div>
            <div className="card-text">
                {props.device.name}
            </div>
        </NavLink>
    );
}

interface DeviceCardProps {
    device: IDevice;
}

export default DeviceCard;