import { useState, ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { urlNetworkDevices } from '../apis/endpoints';
import InfoArea from '../components/InfoArea';
import IndexNetworkNode from '../nodes/IndexNetworkNode';
import IndexRouter from '../routers/IndexRouter';
import IndexSwitch from "../switches/IndexSwitch";
import { NetworkDevicesInfoDTO } from './models/network.devices';

import './styles/NetworkDevicesStyles.css';

function IndexNetworkDevices() {
    const { index } = useParams();
    const [selectedTab, setSelectedTab] = useState<string>('routers');
    const [toggleInfo, setToggleInfo] = useState<boolean>(false);

    useEffect(() => {
        if (index === 'routers' || index === 'switches' || index === 'nodes') {
            setSelectedTab(index);
        }
    }, [index]);

    function getIndexView(selectedTab: string): ReactElement {
        if (selectedTab === 'routers') 
            return <IndexRouter toggleRefresh={() => setToggleInfo(!toggleInfo)} />;
        if (selectedTab === 'switches')
            return <IndexSwitch toggleRefresh={() => setToggleInfo(!toggleInfo)} />;
        
        return <IndexNetworkNode toggleRefresh={() => setToggleInfo(!toggleInfo)} />
    }

    return (
        <>
            <InfoArea<NetworkDevicesInfoDTO>
                infoUrl={urlNetworkDevices}
                toggleInfo={toggleInfo} 
            >
                {(infos) => (
                    <>
                    {infos &&
                        <>
                            <div className="info-item">
                                <label>Roteadores Ativos</label>
                                <span>{infos.countRouters}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Switches Ativos</label>
                                <div className="detailed">
                                    <span>{infos.countSwitches}</span>
                                    {infos.countSwitchFull > 0 && <p>{infos.countSwitchFull} Lotado(s)</p>}
                                </div>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Portas vagas nos Switches</label>
                                <div className="detailed">
                                    <span>{infos.countFreeSwitchesPorts}</span>
                                    <p>{Math.round(infos.countFreeSwitchesPorts / infos.countSwitchesPorts * 100)}%</p>
                                </div>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Pontos de Redes Ativos</label>
                                <span>{infos.countNetNodes}</span>
                            </div>
                        </>
                    }
                    </>
                )}
            </InfoArea>
            <div className='navtabs'>
                <button className={selectedTab === 'routers' ? "active" : ""} onClick={() => setSelectedTab('routers')}>Roteadores</button>
                <button className={selectedTab === 'switches' ? "active" : ""} onClick={() => setSelectedTab('switches')}>Switches</button>
                <button className={selectedTab === 'nodes' ? "active" : ""} onClick={() => setSelectedTab('nodes')}>Pontos de Rede</button>
            </div>

            {getIndexView(selectedTab)}
        </>
    );
}


export default IndexNetworkDevices;