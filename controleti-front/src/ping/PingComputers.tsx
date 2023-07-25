import { urlPing } from "../apis/endpoints";
import IndexPing from "./components/IndexPing";
import PingBoxIndex from "./components/PingBoxIndex";

function PingComputers(props: { search: string }) {
    return (
        <IndexPing
            title="Computadores"
            baseUrl={`${urlPing}/computer`}
            search={props.search}
            color="#BD9E3E"
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

export default PingComputers;