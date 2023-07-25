import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { urlComputers } from "../../apis/endpoints";
import { selectOptions } from "../../formshook/models/form.model";
import { ProfileDTO } from "../../settings/profiles/models/profile.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { ComputerClassification, ComputerTypeFilter, StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";
import { FilterGetComputerDTO } from "../models/computer.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FillFilterComputer(props: FillFilterComputerProps) {
    const { setUser } = useAuth();
    const [profiles, setProfiles] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];

    const storageTypes: selectOptions[] = [
        { display: 'Todos', value: 'ALL' },
        { display: "HD", value: 'HD' },
        { display: "SSD", value: 'SSD' }
    ];

    const computerTypes: selectOptions[] = [
        { display: 'Todos', value: ComputerTypeFilter.Todos },
        { display: 'Desktop', value: ComputerTypeFilter.Desktop },
        { display: 'Notebook', value: ComputerTypeFilter.Notebook }
    ];

    const computerClassification: selectOptions[] = [
        { display: 'Todos', value: ComputerClassification.Todos },
        { display: 'Fora do Recomendavel', value: ComputerClassification.SoRuim },
        { display: 'Dentro do Recomendavel', value: ComputerClassification.SoBom }
    ]

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterComputer(): Promise<void> {
            axios.get(`${urlComputers}/filterget`)
                .then((response: AxiosResponse<FilterGetComputerDTO>) => {
                    setErrors("");

                    const profs: ProfileDTO[] = response.data.profiles;
                    const auxProfiles: selectOptions[] = [];

                    auxProfiles.push({ display: 'Todos', value: 0 });

                    for (let i = 0; i < profs.length; i++) {
                        auxProfiles.push({ display: `${profs[i].name}`, value: profs[i].id });
                    }

                    setProfiles([...auxProfiles]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterComputer();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {profiles.length > 1 ? 
                props.children({
                    profiles: profiles,
                    computerTypes: computerTypes,
                    status: status,
                    storageTypes: storageTypes,
                    computerClassification: computerClassification
                }) 
            : 
                <LoadingFilter />
            }
        </>
    );
}

interface FillFilterComputerProps {
    children: (fill: ComputerFillFilterDTO) => ReactElement;
}

interface ComputerFillFilterDTO {
    profiles: selectOptions[];
    status: selectOptions[];
    computerTypes: selectOptions[];
    storageTypes: selectOptions[];
    computerClassification: selectOptions[];
}

export default FillFilterComputer;