import DeviceCard from "../../components/DeviceCard";
import { Servers } from "../../shared/devices/Devices";

function ServerCreatingHome() {
    document.title = "Cadastro de Servidor"

    return (
        <div className="device-create-container">
            <div className='select-device-area'>
                <h1>{"Que Tipo de Servidor?"}</h1>
            </div>
            <div className='devices-cards'>
                {Servers.map(server => <DeviceCard key={server.name} device={server} />)}
            </div>
        </div>
    );
}

export default ServerCreatingHome;