import axios, { AxiosResponse } from "axios";
import { useEffect, useState, ReactElement } from "react";
import { urlChips } from "../../apis/endpoints";
import { selectOptions } from "../../formshook/models/form.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { StatusFilter } from "../../utils/enums/Enums";
import { LoadingFilter } from "../../utils/Loading";
import { FilterGetChipDTO } from "../models/chip.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FilterFillChip(props: FilterFillChipProps) {
    const { setUser } = useAuth();

    const [types, setTypes] = useState<selectOptions[]>([]);
    const [cpMemories, setCpMemories] = useState<selectOptions[]>([]);
    const [cpStorages, setCpStorages] = useState<selectOptions[]>([]);
    
    const status: selectOptions[] = [
        { display: 'Todos', value: StatusFilter.Todos },
        { display: 'Ativo', value: StatusFilter.Ativo },
        { display: 'Desativado', value: StatusFilter.Desativo }
    ];
    

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFilterChip(): Promise<void> {
            axios.get(`${urlChips}/filterget`)
                .then((response: AxiosResponse<FilterGetChipDTO>) => {
                    setErrors("");

                    const tps: string[] = response.data.types;
                    const auxTypes: selectOptions[] = [];

                    auxTypes.push({ display: 'Todos', value: 'all' });

                    for (let i = 0; i < tps.length; i++) {
                        auxTypes.push({ display: `${tps[i]}`, value: tps[i] });
                    }

                    setTypes([...auxTypes]);

                    const cpMemo: number[] = response.data.cellphoneMemorySizes;
                    const auxCellMemo: selectOptions[] = [];

                    auxCellMemo.push({ display: 'Filtrar...', value: -1 });

                    for (let i = 0; i < cpMemo.length; i++) {
                        auxCellMemo.push({ display: `${cpMemo[i]} GB`, value: cpMemo[i] });
                    }

                    setCpMemories([...auxCellMemo]);

                    const cpSto: number[] = response.data.cellphoneStorageSizes;
                    const auxCellStorage: selectOptions[] = [];

                    auxCellStorage.push({ display: 'Filtrar...', value: -1 });

                    for (let i = 0; i < cpSto.length; i++) {
                        auxCellStorage.push({ display: `${cpSto[i]} GB`, value: cpSto[i] });
                    }

                    setCpStorages([...auxCellStorage]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFilterChip();
    }, [setUser]);

    return (
        <>
            {types.length > 1 && cpMemories.length > 1 && cpMemories.length > 1 ? 
                props.children({
                    types: types,
                    cellphoneMemorySizes: cpMemories,
                    cellphoneStorageSizes: cpStorages,
                    status: status
                }) 
            : 
                <LoadingFilter />
            }
            <DisplayErrors error={errors} />
        </>
    );
}

interface FilterFillChipProps {
    children: (fill: FilterFillChipDTO) => ReactElement;
}

interface FilterFillChipDTO {
    status: selectOptions[];
    types: selectOptions[];
    cellphoneMemorySizes: selectOptions[];
    cellphoneStorageSizes: selectOptions[];
}

export default FilterFillChip;