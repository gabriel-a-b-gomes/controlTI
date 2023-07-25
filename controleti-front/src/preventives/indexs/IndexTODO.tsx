import { Devices, Servers } from "../../shared/devices/Devices";
import BoxIndexPreventives from "../components/BoxIndexPreventives";
import { computersScript, dvrsScript, nobreaksScript, serversScript } from "../components/ScriptPopover";
import IndexPreventives from "../IndexPreventives";
import { DevicePreventiveDTO } from "../models/preventive.model";

function IndexTODO(props: IndexPreventivesProps) {
    const NameIndex = 'todo';
    const EmptyTextIndex = 'Todas as preventivas foram feitas';

    return (
        <>
        {/* Computadores */}
        <IndexPreventives<DevicePreventiveDTO>
            tab={{
                device: Devices[0],
                filter: props.searchesComputer
            }}
            area={NameIndex}
            emptyText={EmptyTextIndex}
            script={computersScript}
        >
            {(preventives, deletePreventive, refresh, setError) => (
                <ul className="list-index">
                    {preventives?.map(preventive => 
                        <li key={preventive.id + preventive.code}>
                            <BoxIndexPreventives 
                                device={Devices[0]}
                                area={NameIndex}
                                equipament={preventive}
                                refresh={refresh}
                                setErrors={setError}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </IndexPreventives>
        {/* Servidores */}
        <IndexPreventives<DevicePreventiveDTO>
            tab={{
                device: Servers[0],
                filter: props.searchesServers
            }}
            area={NameIndex}
            emptyText={EmptyTextIndex}
            script={serversScript}
        >
            {(preventives, deletePreventive, refresh, setError) => (
                <ul className="list-index">
                    {preventives?.map(preventive => 
                        <li key={preventive.id + preventive.code}>
                            <BoxIndexPreventives 
                                device={Servers[0]}
                                area={NameIndex}
                                equipament={preventive}
                                refresh={refresh}
                                setErrors={setError}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </IndexPreventives>
        {/* Nobreaks */}
        <IndexPreventives<DevicePreventiveDTO>
            tab={{
                device: Devices[5],
                filter: props.searchesNobreak
            }}
            area={NameIndex}
            emptyText={EmptyTextIndex}
            script={nobreaksScript}
        >
            {(preventives, deletePreventive, refresh, setError) => (
                <ul className="list-index">
                    {preventives?.map(preventive => 
                        <li key={preventive.id + preventive.code}>
                            <BoxIndexPreventives 
                                device={Devices[5]}
                                area={NameIndex}
                                equipament={preventive}
                                refresh={refresh}
                                setErrors={setError}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </IndexPreventives>
        {/* DVRs */}
        <IndexPreventives<DevicePreventiveDTO>
            tab={{
                device: Devices[3],
                filter: props.searchesDVR
            }}
            area={NameIndex}
            emptyText={EmptyTextIndex}
            script={dvrsScript}
        >
            {(preventives, deletePreventive, refresh, setError) => (
                <ul className="list-index">
                    {preventives?.map(preventive => 
                        <li key={preventive.id + preventive.code}>
                            <BoxIndexPreventives 
                                device={Devices[3]}
                                area={NameIndex}
                                equipament={preventive}
                                refresh={refresh}
                                setErrors={setError}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </IndexPreventives>
        </>
    );
}

interface IndexPreventivesProps {
    searchesComputer: string[];
    searchesDVR: string[];
    searchesNobreak: string[];
    searchesServers: string[];
}

export default IndexTODO;