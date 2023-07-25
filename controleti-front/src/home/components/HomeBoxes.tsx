import { Devices, NetworkDevices, Servers } from "../../shared/devices/Devices";
import HomeBox from "./HomeBox";

import '../styles/HomeBoxStyles.css';
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlHome } from "../../apis/endpoints";
import { LoadingHomeBoxes } from "../../utils/Loading";
import { useAuth } from "../../auth/AuthContext";
import HandleErrors from "../../utils/functions/HandleErrors";
import DisplayErrors from "../../utils/alerts/DisplayErros";

function HomeBoxes() {
    const { setUser } = useAuth();

    const [boxes, setBoxes] = useState<Boxes>();
    const [errors, setErrors] = useState<string>('');

    useEffect(() => {
        async function getTotalBoxes() {
            axios.get(`${urlHome}/boxes`)
                .then((response: AxiosResponse<Boxes>) => {
                    setBoxes(response.data);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getTotalBoxes();
    }, [setUser]);

    return (
        <div className="home-boxes">
            {boxes ?
                <>
                    <HomeBox index="/servers" 
                        color={Servers[0].color} icon={Servers[0].icon} 
                        title="Servidores" observation={`${boxes.serverBox.countPart} Hosts Ativos`} 
                        part={boxes.serverBox.countPart} total={boxes.serverBox.countTotal} 
                    />
                    <HomeBox index="/dvrs" 
                        color={Devices[3].color} icon={Devices[3].icon} 
                        title="DVRs" observation={`${boxes.dvrBox.countPart} Lotado${boxes.dvrBox.countPart > 1 ? 's' : ''}`} 
                        part={boxes.dvrBox.countPart} total={boxes.dvrBox.countTotal} 
                    />
                    <HomeBox index="/network/devices/switches" 
                        color={NetworkDevices[1].color} icon={NetworkDevices[1].icon} 
                        title="Switches" observation={`${boxes.switchBox.countPart} Lotado${boxes.switchBox.countPart > 1 ? 's' : ''}`} 
                        part={boxes.switchBox.countPart} total={boxes.switchBox.countTotal} 
                    />
                    <HomeBox index="/printers" 
                        color={Devices[4].color} icon={Devices[4].icon} 
                        title="Impressoras" observation={`${boxes.printerBox.countPart} ${boxes.printerBox.countPart > 1 ? 'Multifuncionais' : 'Multifuncional'}`} 
                        part={boxes.printerBox.countPart} total={boxes.printerBox.countTotal} 
                    />
                </>
                :
                <LoadingHomeBoxes />
            }
            <DisplayErrors error={errors} />
        </div>
    );
}

interface Box {
    countPart: number;
    countTotal: number;
}

interface Boxes {
    serverBox: Box;
    dvrBox: Box;
    switchBox: Box;
    printerBox: Box;
}

export default HomeBoxes;