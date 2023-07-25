import { Devices } from "../../shared/devices/Devices";
import TotalBox from "./TotalBox";

import '../styles/TotalBoxStyles.css';
import axios, { AxiosResponse } from "axios";
import { urlHome } from "../../apis/endpoints";
import { useEffect, useState } from "react";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { LoadingHomeSide } from "../../utils/Loading";
import { useAuth } from "../../auth/AuthContext";
import HandleErrors from "../../utils/functions/HandleErrors";

function TotalBoxes() {
    const { setUser } = useAuth();

    const [boxes, setBoxes] = useState<TotalBoxesClass>();
    const [errors, setErrors] = useState<string>('');

    useEffect(() => {
        async function getTotalBoxes() {
            axios.get(`${urlHome}/totals`)
                .then((response: AxiosResponse<TotalBoxesClass>) => {
                    setBoxes(response.data);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getTotalBoxes();
    }, [setUser]);

    return (
        <>
        <div className="total-boxes">
            {boxes ? 
                <>
                    <TotalBox title="Ramais" color={Devices[1].color} icon={Devices[1].icon} link="/ramais" count={boxes.ramalBox.total} />
                    <TotalBox title="Chips" color={Devices[2].color} icon={Devices[2].icon} link="/chips" count={boxes.chipBox.total} />
                    <TotalBox title="Nobreak" color={Devices[5].color} icon={Devices[5].icon} link="/nobreaks" count={boxes.nobreakBox.total} />
                </>
                :
                <LoadingHomeSide />
            }
        </div>
        <DisplayErrors error={errors} />
        </>
    );
}

interface TotalBoxClass {
    total: number;
}

interface TotalBoxesClass {
    ramalBox: TotalBoxClass;
    chipBox: TotalBoxClass;
    nobreakBox: TotalBoxClass;
}


export default TotalBoxes;