import { useState } from 'react';
import EditSetting from "../../components/EditSetting";
import { FunctionalityCreationDTO, FunctionalityDTO } from "../models/functionalities.model";
import { urlFunctionalities } from '../../../apis/endpoints';
import FormFunctionality from '../form/FormFunctionality';
import NotifySettings from '../../components/NotifySetting';

function EditFunctionality(props: EditFunctionalityProps) {

    const [success, setSuccess] = useState<boolean>(false);

    function transformFunctionality(upFunc: FunctionalityDTO): FunctionalityCreationDTO {
        return ({
            id: upFunc.id,
            description: upFunc.description,
        });
    }

    return (
        <EditSetting<FunctionalityCreationDTO, FunctionalityDTO>
            url={urlFunctionalities}
            transform={transformFunctionality}
            itemId={props.itemId}
        >
            {(functionality, edit, buttons) => (
                <FormFunctionality
                    model={functionality}
                    buttons={buttons(functionality.id ? functionality.id : 0, () => props.duplicate(functionality.id ? functionality.id : 0), props.deleteCallBack, props.close)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);

                        setSuccess(status === 200);

                        if (status === 200) {
                            props.onSuccess();
                        }
                    }}
                >
                    <NotifySettings info="Funcionalidade alterada com sucesso" success={success} />
                </FormFunctionality>
            )}
        </EditSetting>
    );
} 

interface EditFunctionalityProps {
    itemId: number;
    duplicate: (dupId: number) => void;
    close: () => void;
    deleteCallBack: () => void;
    onSuccess: () => void;
}

export default EditFunctionality;