import { urlPing } from "../apis/endpoints";
import IndexPing from "./components/IndexPing";
import PingBoxIndex from "./components/PingBoxIndex";

function PingGeneral(props: { search: string }) {
    return (
        <IndexPing
            title="Geral"
            baseUrl={urlPing}
            search={props.search}
            color="#CE4E4E"
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

export default PingGeneral;