import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { urlNetworkNodes } from "../../apis/endpoints";
import { EmployeeDTO } from "../../employees/models/employee.model";
import { selectOptions } from "../../formshook/models/form.model";
import { SwitchDTO } from "../../switches/models/switch.model";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { LoadingForm } from "../../utils/Loading";
import { PostGetNodeDTO } from "../models/networknodes.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";

function FillNodeForm(props: FillNodeFormProps) {
    const { setUser } = useAuth();

    const [employees, setEmployees] = useState<selectOptions[]>([]);
    const [switches, setSwitches] = useState<selectOptions[]>([]);
    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        async function getPostGetNode(): Promise<void> {
            axios.get(`${urlNetworkNodes}/postget`)
                .then((response: AxiosResponse<PostGetNodeDTO>) => {
                    setErrors("");

                    const eps: EmployeeDTO[] = response.data.employees;
                    const auxEmployees: selectOptions[] = [];

                    auxEmployees.push({ display: 'Selecione o colaborador', value: 0 });

                    for (let i = 0; i < eps.length; i++) {
                        auxEmployees.push({ display: `${eps[i].name}`, value: eps[i].id });
                    }

                    setEmployees([...auxEmployees]);
                    
                    const sws: SwitchDTO[] = response.data.switches;
                    const auxSwitches: selectOptions[] = [];

                    auxSwitches.push({ display: 'Selecione o switch', value: 0 });

                    for (let i = 0; i < sws.length; i++) {
                        auxSwitches.push({ display: `${sws[i].code}`, value: sws[i].id });
                    }

                    setSwitches([...auxSwitches])
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getPostGetNode();
    }, [setUser]);

    return (
        <>
            <DisplayErrors error={errors} />
            {employees.length > 0 && switches.length > 0 ? 
                props.children({ employees: employees, switches: switches }) 
            : 
                <LoadingForm />
            }
        </>
    );
}

interface FillNodeFormProps {
    children: (fill: FillNodeCrudDTO) => ReactElement;
}

interface FillNodeCrudDTO {
    employees: selectOptions[];
    switches: selectOptions[];
}

export default FillNodeForm;