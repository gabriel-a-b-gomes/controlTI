import { urlPing } from "../apis/endpoints";
import IndexPing from "./components/IndexPing";
import PingBoxIndex from "./components/PingBoxIndex";

function PingServer(props: { search: string }) {
    return (
        <IndexPing
            title="Servidores"
            baseUrl={`${urlPing}/server`}
            search={props.search}
            color="#1F598E"
        >
            {(pings) => (
                <ul className="pings-ul">
                    {pings?.map(ping => 
                        <li key={ping.code + ping.address + ping.deviceId}>
                            <PingBoxIndex devicePinged={ping} />
                        </li>    
                    )}
                </ul>
            )}
        </IndexPing>
    );
}   

export default PingServer;