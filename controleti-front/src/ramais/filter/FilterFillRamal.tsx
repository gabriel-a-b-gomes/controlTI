import axios, { AxiosResponse } from "axios";
import { useEffect, useState, ReactElement } from "react";
import { urlRamais } from "../../apis/endpoints";
import { selectOptions } from "../../formshook/models/form.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { RamalClassification, StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";
import { FilterGetRamalDTO } from "../models/ramal.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FilterFillRamal(props: FilterFillRamalProps) {
    const { setUser } = useAuth();

    const [exits, setExits] = useState<selectOptions[]>([]);
    const [gateways, setGateways] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const ramalClassification: selectOptions[] = [
        { display: 'Todos', value: RamalClassification.all },
        { display: 'Só de Departamento', value: RamalClassification.onlyDeparment },
        { display: 'Só Pessoal', value: RamalClassification.onlyPersonal }
    ]

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterRamal(): Promise<void> {
            axios.get(`${urlRamais}/filterget`)
                .then((response: AxiosResponse<FilterGetRamalDTO>) => {
                    setErrors("");

                    const exits: string[] = response.data.exitNumbers;
                    const auxExitnumbers: selectOptions[] = [];

                    auxExitnumbers.push({ display: 'Todos', value: 'all' });

                    for (let i = 0; i < exits.length; i++) {
                        auxExitnumbers.push({ display: `${exits[i]}`, value: exits[i] });
                    }

                    setExits([...auxExitnumbers]);

                    const gates: string[] = response.data.gateways;
                    const auxGateways: selectOptions[] = [];

                    auxGateways.push({ display: 'Todos', value: 'all' });

                    for (let i = 0; i < gates.length; i++) {
                        auxGateways.push({ display: `${gates[i]}`, value: gates[i] });
                    }

                    setGateways([...auxGateways]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterRamal();
    }, [setUser]);

    return (
        <>
            {exits.length > 1 && gateways.length > 1 ? 
                props.children({
                    exitNumbers: exits,
                    gateways: gateways,
                    isDepartment: ramalClassification,
                    status: status
                }) 
            : 
                <LoadingFilter />
            }
            <DisplayErrors error={errors} />
        </>
    );
}

interface FilterFillRamalProps {
    children: (fill: FilterFillRamalDTO) => ReactElement;
}

interface FilterFillRamalDTO {
    exitNumbers: selectOptions[];
    gateways: selectOptions[];
    status: selectOptions[];
    isDepartment: selectOptions[];
}

export default FilterFillRamal;