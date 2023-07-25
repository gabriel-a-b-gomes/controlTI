import { useState } from 'react';

import { urlDepartments } from '../../../apis/endpoints';
import EditSetting from '../../components/EditSetting';
import NotifySettings from '../../components/NotifySetting';

import { DepartmentCreationDTO, DepartmentDTO } from "../models/department.model";
import FormDepartment from '../form/FormDepartment';

function EditDepartment(props: EditDepartmentProps) {

    const [success, setSuccess] = useState<boolean>(false);

    function transformDepartment(upDep: DepartmentDTO): DepartmentCreationDTO {
        return ({
            id: upDep.id,
            description: upDep.description,
            enterprise: upDep.enterprise
        });
    }

    return (
        <EditSetting<DepartmentCreationDTO, DepartmentDTO>
            url={urlDepartments}
            transform={transformDepartment}
            itemId={props.itemId}
        >
            {(department, edit, buttons) => (
                <FormDepartment
                    model={department}
                    buttons={buttons(department.id ? department.id : 0, () => props.duplicate(department.id ? department.id : 0), props.deleteCallBack, props.close)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);

                        setSuccess(status === 200);

                        if (status === 200) {
                            props.onSuccess();
                        }
                    }}
                >
                    <NotifySettings info="Departamento alterado com sucesso" success={success} />
                </FormDepartment>
            )}
        </EditSetting>
    );
} 

interface EditDepartmentProps {
    itemId: number;
    duplicate: (dupId: number) => void;
    close: () => void;
    deleteCallBack: () => void;
    onSuccess: () => void;
}

export default EditDepartment;