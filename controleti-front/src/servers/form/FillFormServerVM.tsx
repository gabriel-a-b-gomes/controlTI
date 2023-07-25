import { ReactElement, useEffect, useState } from "react";
import { selectOptions } from "../../formshook/models/form.model";
import { FunctionalityDTO } from "../../settings/functionalities/models/functionalities.model";
import { ServerHostDTO } from "../models/host.model";
import { useAuth } from "../../auth/AuthContext";
import axios, { AxiosResponse } from "axios";
import { urlVMS } from "../../apis/endpoints";
import HandleErrors from "../../utils/functions/HandleErrors";
import { LoadingForm } from "../../utils/Loading";
import { Status } from "../../utils/enums/Enums";
import DisplayErrors from "../../utils/alerts/DisplayErros";

interface FormGetServerVMDTO {
    functionalities: FunctionalityDTO[];
    hosts: ServerHostDTO[];
}

function FillFormServerVM(props: FillServerVMProps) {
    const { setUser } = useAuth();

    const [functionalities, setFunctionalities] = useState<selectOptions[]>([]);
    const [hosts, setHosts] = useState<selectOptions[]>([]);
    const [errors, setErrors] = useState<string>("");

    const status: selectOptions[] = [
        { display: 'Ativo', value: Status.Ativo },
        { display: 'Desativado', value: Status.Desativo }
    ];

    useEffect(() => {
        async function getFormServerVM(): Promise<void> {
            axios.get(`${urlVMS}/formget`)
                .then((response: AxiosResponse<FormGetServerVMDTO>) => {
                    let i = 0;
                    setErrors("");

                    const funcs: FunctionalityDTO[] = response.data.functionalities;
                    const auxFunctionalities: selectOptions[] = [];

                    for (i = 0; i < funcs.length; i++) {
                        auxFunctionalities.push({ display: `${funcs[i].description}`, value: funcs[i].id });
                    }

                    setFunctionalities([...auxFunctionalities]);

                    const srvHosts: ServerHostDTO[] = response.data.hosts;
                    const auxSrvHosts: selectOptions[] = [];

                    auxSrvHosts.push({ display: "Selecione um servidor host", value: 0 });
                    for (i = 0; i < srvHosts.length; i++) {
                        auxSrvHosts.push({ display: `${srvHosts[i].code}`, value: srvHosts[i].id });
                    }

                    setHosts([...auxSrvHosts]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFormServerVM();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {functionalities.length > 0 && hosts.length > 0 ?
                props.children({
                    status: status,
                    hosts: hosts,
                    functionalities: functionalities
                })
                :
                <LoadingForm />
            }
        </>
    );
}

interface FillServerVM {
    functionalities: selectOptions[];
    hosts: selectOptions[];
    status: selectOptions[];
}

interface FillServerVMProps {
    children: (fill: FillServerVM) => ReactElement;
}

export default FillFormServerVM;