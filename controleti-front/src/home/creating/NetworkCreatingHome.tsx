import DeviceCard from "../../components/DeviceCard";
import { NetworkDevices } from "../../shared/devices/Devices";

function NetworkCreatingHome() {
    document.title = "Cadastro de Equipamento de Rede"
    return (
        <div className="device-create-container">
            <div className='select-device-area'>
                <h1>{"Qual Equipamento de Rede?"}</h1>
            </div>
            <div className='devices-cards'>
                {NetworkDevices.map(netDevice => <DeviceCard key={netDevice.name} device={netDevice} />)}
            </div>
        </div>
    );
}

export default NetworkCreatingHome;