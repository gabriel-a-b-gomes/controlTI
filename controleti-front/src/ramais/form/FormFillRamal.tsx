import axios, { AxiosResponse } from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { urlRamais } from '../../apis/endpoints';
import { EmployeeDTO } from '../../employees/models/employee.model';
import { selectOptions } from '../../formshook/models/form.model';
import { DepartmentDTO } from '../../settings/departments/models/department.model';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import { LoadingForm } from '../../utils/Loading';

import { FormGetRamalDTO } from "../models/ramal.model";
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function FormFillRamal(props: FormFillRamalProps) {
    const { setUser } = useAuth();

    const [employees, setEmployees] = useState<selectOptions[]>([]);
    const [departments, setDepartments] = useState<selectOptions[]>([]);

    const status: selectOptions[] = [
        { display: 'Ativo', value: 1 },
        { display: 'Desativado', value: 0 }
    ];

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getFormRamal(): Promise<void> {
            axios.get(`${urlRamais}/formget`)
                .then((response: AxiosResponse<FormGetRamalDTO>) => {
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
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getFormRamal();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {employees.length > 0 && departments.length > 0 ? 
                props.children({ employees: employees, departments: departments, status: status }) 
            : 
                <LoadingForm />
            }
        </>
    );
}

interface FormFillRamalProps {
    children: (fill: FormRamalDTO) => ReactElement;
}

interface FormRamalDTO {
    employees: selectOptions[];
    departments: selectOptions[];
    status: selectOptions[];
}

export default FormFillRamal;