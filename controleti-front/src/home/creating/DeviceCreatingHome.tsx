import DeviceCard from '../../components/DeviceCard';

import { Devices } from '../../shared/devices/Devices';

import './CreatingHome.css';

function DeviceCreatingHome() {
    document.title = "Cadastro de Equipamento";

    return (
        <div className='device-create-container'>
            <div className='select-device-area'>
                <h1>{"Qual Equipamento?"}</h1>
            </div>
            <div className='devices-cards'>
                {Devices.map(device => <DeviceCard key={device.name} device={device} />)}
            </div>
        </div>
    );
}

export default DeviceCreatingHome;