import { useState } from 'react';
import { urlDepartments } from '../../../apis/endpoints';
import CreateSetting from '../../components/CreateSetting';
import NotifySettings from '../../components/NotifySetting';

import { DepartmentCreationDTO, DepartmentDTO } from "../models/department.model";
import FormDepartment from '../form/FormDepartment';

function CreateDepartment(props: CreateDepartmentProps) {
    const base: DepartmentCreationDTO = {
        description: '',
        enterprise: ''
    }

    const [department, setDepartment] = useState<DepartmentCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    function transformDepartment(dupDep: DepartmentDTO): void {
        setDepartment({
            description: dupDep.description,
            enterprise: dupDep.enterprise
        });
    }

    return (
        <CreateSetting<DepartmentCreationDTO, DepartmentDTO>
            url={urlDepartments}
            transform={transformDepartment}
            duplicatedId={props.dupId}
        >
            {(create, buttons) => (
                <FormDepartment
                    model={department}
                    buttons={buttons(base, props.close)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await create(values);

                        setSuccess(status === 200);

                        if (status === 200) {
                            actions.reset(base);
                            props.onSuccess();
                        }
                    }}
                >
                    <NotifySettings info="Departamento cadastrado com sucesso" success={success} />
                </FormDepartment>
            )}
        </CreateSetting>
    );
} 

interface CreateDepartmentProps {
    dupId?: number;
    close: () => void;
    onSuccess: () => void;
}

export default CreateDepartment;