import axios, { AxiosResponse } from 'axios';
import { ReactElement, useState, useEffect } from 'react';
import { urlDVRs } from '../../apis/endpoints';

import { selectOptions } from "../../formshook/models/form.model";
import DisplayErrors from '../../utils/alerts/DisplayErros';
import { HasBalunClassification, StatusFilter } from '../../utils/enums/Enums';
import { LoadingFilter } from "../../utils/Loading";
import { FilterGetDVRDTO } from "../models/dvr.model";
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function FilterFillDVR(props: FilterFillDVRProps) {
    const { setUser } = useAuth();

    const [hdSizes, setHdSizes] = useState<selectOptions[]>([]);
    const [channels, setChannels] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const hasBalun: selectOptions[] = [
        { display: 'Todos', value: HasBalunClassification.noFilter },
        { display: 'Com Balun Acoplado', value: HasBalunClassification.onlyHasBalun },
        { display: 'Sem Balun Acoplado', value: HasBalunClassification.onlyNotHasBalun }
    ]

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterDVR(): Promise<void> {
            axios.get(`${urlDVRs}/filterget`)
                .then((response: AxiosResponse<FilterGetDVRDTO>) => {
                    setErrors("");

                    const hds: number[] = response.data.hdSizes;
                    const auxHds: selectOptions[] = [];

                    auxHds.push({ display: 'Filtrar...', value: -1 });

                    for (let i = 0; i < hds.length; i++) {
                        auxHds.push({ display: `${hds[i]} TB`, value: hds[i] });
                    }

                    setHdSizes([...auxHds]);

                    const chns: number[] = response.data.channels;
                    const auxChannels: selectOptions[] = [];

                    auxChannels.push({ display: 'Filtrar...', value: -1 });

                    for (let i = 0; i < chns.length; i++) {
                        auxChannels.push({ display: `${chns[i]}`, value: chns[i] });
                    }

                    setChannels([...auxChannels]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterDVR();
    }, [setUser]);

    return (
        <>
            {hdSizes.length > 1 && channels.length > 1? 
                props.children({
                    hasBalun: hasBalun,
                    status: status, 
                    hdSizes: hdSizes,
                    channels: channels
                }) 
            : 
                <LoadingFilter />
            }
            <DisplayErrors error={errors} />
        </>
    );
}

interface FilterFillDVRProps {
    children: (fill: FilterFillDVRDTO) => ReactElement;
}

interface FilterFillDVRDTO {
    status: selectOptions[];
    hasBalun: selectOptions[];
    hdSizes: selectOptions[];
    channels: selectOptions[];
}

export default FilterFillDVR;