import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { urlComputers } from "../../apis/endpoints";
import { EmployeeDTO } from "../../employees/models/employee.model";
import { selectOptions } from "../../formshook/models/form.model";
import { DepartmentDTO } from "../../settings/departments/models/department.model";
import { ProfileDTO } from "../../settings/profiles/models/profile.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { RankProcessing, RankSO } from "../../utils/enums/Enums";
import { LoadingForm } from "../../utils/Loading";
import { FormGetComputerDTO } from "../models/computer.model";
import { ProcessingUnitDTO, StorageDTO } from "../models/computer.components.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FillComputer(props: FillComputerProps) {
    const { setUser } = useAuth();

    const [employees, setEmployees] = useState<selectOptions[]>([]);
    const [departments, setDepartments] = useState<selectOptions[]>([]);
    const [profiles, setProfiles] = useState<selectOptions[]>([]);
    const [processors, setProcessors] = useState<ProcessingUnitDTO[]>([]);
    const [storages, setStorages] = useState<StorageDTO[]>([]);

    const status: selectOptions[] = [
        { display: 'Ativo', value: 1 },
        { display: 'Desativado', value: 0 }
    ];

    const soRanks: selectOptions[] = [
        { display: "Ultrapassado", value: RankSO.Ultrapassado },
        { display: "Atual", value: RankSO.Atual },
        { display: "Novo", value: RankSO.Novo }
    ];

    const processorRanks: selectOptions[] = [
        { display: "Muito Ruim", value: RankProcessing["Muito Ruim"] },
        { display: "Ruim", value: RankProcessing.Ruim },
        { display: "Normal", value: RankProcessing.Normal },
        { display: "Bom", value: RankProcessing.Bom },
        { display: "Muito Bom", value: RankProcessing["Muito Bom"] }
    ];

    const storageTypes: selectOptions[] = [
        { display: "HD", value: 'HD' },
        { display: "SSD", value: 'SSD' }
    ];

    const computerTypes: selectOptions[] = [
        { display: 'Desktop', value: 0 },
        { display: 'Notebook', value: 1 }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFormComputer(): Promise<void> {
            axios.get(`${urlComputers}/formget`)
                .then((response: AxiosResponse<FormGetComputerDTO>) => {
                    setErrors("");

                    console.log(response.data)

                    const eps: EmployeeDTO[] = response.data.employees;
                    const auxEmployees: selectOptions[] = [];

                    auxEmployees.push({ display: 'Selecione o colaborador', value: 0 });

                    for (let i = 0; i < eps.length; i++) {
                        auxEmployees.push({ display: `${eps[i].name}`, value: eps[i].id });
                    }

                    setEmployees([...auxEmployees]);
                    
                    const dpts: DepartmentDTO[] = response.data.departments;
                    const auxDepartments: selectOptions[] = [];

                    auxDepartments.push({ display: 'Selecione o departmento', value: 0 });

                    for (let i = 0; i < dpts.length; i++) {
                        auxDepartments.push({ display: `${dpts[i].description} - ${dpts[i].enterprise}`, value: dpts[i].id });
                    }

                    setDepartments([...auxDepartments]);

                    const profs: ProfileDTO[] = response.data.profiles;
                    const auxProfiles: selectOptions[] = [];

                    auxProfiles.push({ display: 'Selecione o perfil', value: 0 });

                    for (let i = 0; i < profs.length; i++) {
                        auxProfiles.push({ display: `${profs[i].name}`, value: profs[i].id });
                    }

                    setProfiles([...auxProfiles]);

                    setProcessors(response.data.processingUnits);
                    setStorages(response.data.storages);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFormComputer();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {employees.length > 1 && departments.length > 1 && profiles.length > 1 ? 
                props.children({
                    departments: departments,
                    employees: employees,
                    profiles: profiles,
                    soRanks: soRanks,
                    processorRanks: processorRanks,
                    computerTypes: computerTypes,
                    status: status,
                    storageTypes: storageTypes,
                    processingUnits: processors,
                    storages: storages
                }) 
            : 
                <LoadingForm />
            }
        </>
    );
}

interface FillComputerProps {
    children: (fill: FillComputerCreationDTO) => ReactElement;
}

interface FillComputerCreationDTO {
    departments: selectOptions[];
    employees: selectOptions[];
    computerTypes: selectOptions[];
    storageTypes: selectOptions[];
    soRanks: selectOptions[];
    processorRanks: selectOptions[];
    profiles: selectOptions[];
    status: selectOptions[];

    processingUnits: ProcessingUnitDTO[];
    storages: StorageDTO[];
}

export default FillComputer;