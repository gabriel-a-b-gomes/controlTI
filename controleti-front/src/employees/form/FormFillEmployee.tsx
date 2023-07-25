import axios, { AxiosResponse } from 'axios';
import { useState, ReactElement, useEffect } from 'react';
import { urlDepartments } from '../../apis/endpoints';
import { selectOptions } from '../../formshook/models/form.model';
import { DepartmentDTO } from '../../settings/departments/models/department.model';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import { LoadingForm } from '../../utils/Loading';
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function FormFillEmployee(props: FormFillEmployeeProps) {
    const { setUser } = useAuth();

    const [optDepartments, setOptDepartments] = useState<selectOptions[]>([]);
    const [errors, setErrors] = useState<string>();

    const status: selectOptions[] = [ { display: 'Ativo', value: 1 }, { display: 'Desligado', value: 0 } ];

    useEffect(() => {
        async function getDepartments(): Promise<void> {
            axios.get(`${urlDepartments}/all`)
                .then((response: AxiosResponse<DepartmentDTO[]>) => {
                    setErrors("");

                    const auxDepart: selectOptions[] = [];

                    auxDepart.push({ display: 'Selecione o departamento do Colaborador', value: 0 });

                    for (let i = 0; i < response.data.length; i++) {
                        auxDepart.push({ display: `${response.data[i].description} - ${response.data[i].enterprise}`, value: response.data[i].id });
                    }

                    setOptDepartments([...auxDepart]);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getDepartments();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {optDepartments.length > 1 && status.length > 0 ? 
                props.children({ optDepartments: optDepartments, status: status }) 
            : 
                <LoadingForm />
            }
        </>
    );
}

interface FormFillEmployeeProps {
    children: (fill: EmployeeFormFill) => ReactElement;
}

interface EmployeeFormFill {
    optDepartments: selectOptions[];
    status: selectOptions[];
}

export default FormFillEmployee;