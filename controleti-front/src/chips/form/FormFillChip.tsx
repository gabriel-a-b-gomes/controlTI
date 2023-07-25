import axios, { AxiosResponse } from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { urlChips } from '../../apis/endpoints';
import { EmployeeDTO } from '../../employees/models/employee.model';
import { selectOptions } from '../../formshook/models/form.model';
import { DepartmentDTO } from '../../settings/departments/models/department.model';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import { LoadingForm } from '../../utils/Loading';
import { CellPhoneCreationDTO } from '../models/cellphone.model';

import { FormGetChipDTO } from "../models/chip.model";
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function FormFillChip(props: FormFillChipProps) {
    const { setUser } = useAuth();

    const [employees, setEmployees] = useState<selectOptions[]>([]);
    const [departments, setDepartments] = useState<selectOptions[]>([]);
    const [cellphones, setCellphones] = useState<CellPhoneCreationDTO[]>();

    const status: selectOptions[] = [
        { display: 'Ativo', value: 1 },
        { display: 'Desativado', value: 0 }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFormChip(): Promise<void> {
            axios.get(`${urlChips}/formget`)
                .then((response: AxiosResponse<FormGetChipDTO>) => {
                    setErrors("");

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

                    setCellphones(response.data.cellPhones);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFormChip();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {employees.length > 0 && departments.length > 0 && cellphones ? 
                props.children({ employees: employees, departments: departments, status: status, cellphones: cellphones }) 
            : 
                <LoadingForm />
            }
        </>
    );
}

interface FormFillChipProps {
    children: (fill: ChipForm) => ReactElement;
}

interface ChipForm {
    departments: selectOptions[];
    employees: selectOptions[];
    status: selectOptions[];
    cellphones: CellPhoneCreationDTO[];
}

export default FormFillChip;