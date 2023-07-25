import { ReactElement, useState, useEffect } from "react";
import { selectOptions } from "../../formshook/models/form.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import axios, { AxiosResponse } from "axios";
import { urlHosts } from "../../apis/endpoints";
import { useAuth } from "../../auth/AuthContext";
import { FunctionalityDTO } from "../../settings/functionalities/models/functionalities.model";
import { Status } from "../../utils/enums/Enums";
import { LoadingForm } from "../../utils/Loading";
import DisplayErrors from "../../utils/alerts/DisplayErros";

interface FormGetServerHostDTO {
    functionalities: FunctionalityDTO[];
}

function FillFormServerHost(props: FillFormServerHostProps) {
    const { setUser } = useAuth();

    const [functionalities, setFunctionalities] = useState<selectOptions[]>([]);

    const status: selectOptions[] = [
        { display: 'Ativo', value: Status.Ativo },
        { display: 'Desativado', value: Status.Desativo }
    ];

    const storageTypes: selectOptions[] = [
        { display: "HD", value: 'HD' },
        { display: "SSD", value: 'SSD' },
        { display: "HD Externo", value: 'HD Externo' }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFormServerHost(): Promise<void> {
            axios.get(`${urlHosts}/formget`)
                .then((response: AxiosResponse<FormGetServerHostDTO>) => {
                    setErrors("");

                    const funcs: FunctionalityDTO[] = response.data.functionalities;
                    const auxFunctionalities: selectOptions[] = [];

                    for (let i = 0; i < funcs.length; i++) {
                        auxFunctionalities.push({ display: `${funcs[i].description}`, value: funcs[i].id });
                    }

                    setFunctionalities([...auxFunctionalities]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFormServerHost();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {functionalities.length > 0 ?
                props.children({
                    status: status,
                    storageTypes: storageTypes,
                    functionalities: functionalities
                })
                :
                <LoadingForm />
            }
        </>
    );  
}

interface FillServerHost {
    functionalities: selectOptions[];
    storageTypes: selectOptions[];
    status: selectOptions[];
}

interface FillFormServerHostProps {
    children: (fill: FillServerHost) => ReactElement;
}

export default FillFormServerHost;