import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { urlNetworkNodes } from "../../apis/endpoints";
import { selectOptions } from "../../formshook/models/form.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";
import { FilterGetNodeDTO, SwitchGet } from "../models/networknodes.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FilterFillNode(props: FilterFillNodeProps) {
    const { setUser } = useAuth();

    const [swtGets, setSwtGets] = useState<selectOptions[]>([]);
    const [patches, setPatches] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterNode(): Promise<void> {
            axios.get(`${urlNetworkNodes}/filterget`)
                .then((response: AxiosResponse<FilterGetNodeDTO>) => {
                    setErrors("");

                    const swts: SwitchGet[] = response.data.switches;
                    const auxSwitches: selectOptions[] = [];

                    auxSwitches.push({ display: 'Todos', value: -1 });

                    for (let i = 0; i < swts.length; i++) {
                        auxSwitches.push({ display: `${swts[i].code}`, value: swts[i].id });
                    }

                    setSwtGets([...auxSwitches]);

                    const ptcs: string[] = response.data.patchpanels;
                    const auxPatches: selectOptions[] = [];

                    auxPatches.push({ display: 'Todos', value: 'all' });

                    for (let i = 0; i < ptcs.length; i++) {
                        auxPatches.push({ display: `${ptcs[i]}`, value: ptcs[i] });
                    }

                    setPatches([...auxPatches]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterNode();
    }, [setUser]);

    return (
        <>
            {swtGets.length > 1 && patches.length > 1? 
                props.children({
                    status: status, 
                    switches: swtGets,
                    patchpanels: patches
                }) 
            : 
                <LoadingFilter />
            }
            <DisplayErrors error={errors} />
        </>
    );
}

interface FilterFillNodeProps {
    children: (fill: FilterFillNodeDTO) => ReactElement;
}

interface FilterFillNodeDTO {
    status: selectOptions[];
    switches: selectOptions[];
    patchpanels: selectOptions[];
}

export default FilterFillNode;