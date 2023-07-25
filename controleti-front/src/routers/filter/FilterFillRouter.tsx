import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from 'react';
import { urlRouters } from "../../apis/endpoints";
import { selectOptions } from "../../formshook/models/form.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";
import { FilterGetRouterDTO } from "../models/router.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FilterFillRouter(props: FilterFillRouterProps) {
    const { setUser } = useAuth();
    
    const [ssids, setSsids] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterRouter(): Promise<void> {
            axios.get(`${urlRouters}/filterget`)
                .then((response: AxiosResponse<FilterGetRouterDTO>) => {
                    setErrors("");

                    const ssids: string[] = response.data.routerSSIDs;
                    const auxSSID: selectOptions[] = [];

                    auxSSID.push({ display: 'Todos', value: 'all' });

                    for (let i = 0; i < ssids.length; i++) {
                        auxSSID.push({ display: `${ssids[i]}`, value: ssids[i] });
                    }

                    setSsids([...auxSSID]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterRouter();
    }, [setUser]);

    return (
        <>
            {ssids.length > 1 && status.length > 1 ? 
                props.children({
                    routerSSIDs: ssids,
                    status: status
                }) 
            : 
                <LoadingFilter />
            }
            <DisplayErrors error={errors} />
        </>
    );
}

interface FilterFillRouterProps {
    children: (fill: FilterFillRouterDTO) => ReactElement;
}

interface FilterFillRouterDTO {
    routerSSIDs: selectOptions[];
    status: selectOptions[];
}

export default FilterFillRouter;