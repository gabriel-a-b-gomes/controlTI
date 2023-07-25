import { urlPing } from "../apis/endpoints";
import IndexPing from "./components/IndexPing";
import PingBoxIndex from "./components/PingBoxIndex";

function PingRamais(props: { search: string }) {
    return (
        <IndexPing
            title="Ramais"
            baseUrl={`${urlPing}/ramal`}
            search={props.search}
            color="#F2921D"
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

export default PingRamais;