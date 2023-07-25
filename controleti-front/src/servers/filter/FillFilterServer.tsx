import { useState, useEffect, ReactElement } from 'react';

import { useAuth } from "../../auth/AuthContext";
import { selectOptions } from "../../formshook/models/form.model";
import { StatusFilter } from '../../utils/enums/Enums';
import { urlHosts } from '../../apis/endpoints';
import axios, { AxiosResponse } from 'axios';
import { FunctionalityDTO } from '../../settings/functionalities/models/functionalities.model';
import HandleErrors from '../../utils/functions/HandleErrors';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import { LoadingFilter } from '../../utils/Loading';

interface FilterGetHostDTO {
    functionalities: FunctionalityDTO[];
}

interface FillFilterHost {
    functionalities: selectOptions[];
    status: selectOptions[];
}

function FillFilterServer(props: FillFilterServerProps) {
    const { setUser } = useAuth();
    const [functionalities, setFunctionalities] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterServer(): Promise<void> {
            axios.get(`${urlHosts}/filterget`)
                .then((response: AxiosResponse<FilterGetHostDTO>) => {
                    setErrors("");

                    const funcs: FunctionalityDTO[] = response.data.functionalities;
                    const auxFunctionalities: selectOptions[] = [];

                    auxFunctionalities.push({ display: 'Todas', value: 0 });

                    for (let i = 0; i < funcs.length; i++) {
                        auxFunctionalities.push({ display: `${funcs[i].description}`, value: funcs[i].id });
                    }

                    setFunctionalities([...auxFunctionalities]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterServer();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {functionalities.length > 1 ? 
                props.children({
                    functionalities: functionalities,
                    status: status
                }) 
            : 
                <LoadingFilter />
            }
        </>
    );
}

interface FillFilterServerProps {
    children: (fill: FillFilterHost) => ReactElement;
}

export default FillFilterServer;