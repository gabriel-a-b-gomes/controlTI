import { useState } from 'react';
import { urlFunctionalities } from "../../../apis/endpoints";
import CreateSetting from "../../components/CreateSetting";
import FormFunctionality from "../form/FormFunctionality";
import { FunctionalityCreationDTO, FunctionalityDTO } from "../models/functionalities.model";
import NotifySettings from '../../components/NotifySetting';

function CreateFunctionality(props: CreateFunctionalityProps) {
    const base: FunctionalityCreationDTO = {
        description: ''
    }

    const [functionality, setFunctionality] = useState<FunctionalityCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    function transformFunctionality(dupFunc: FunctionalityDTO): void {
        setFunctionality({
            description: dupFunc.description,
        });
    }

    return (
        <CreateSetting<FunctionalityCreationDTO, FunctionalityDTO>
            url={urlFunctionalities}
            transform={transformFunctionality}
            duplicatedId={props.dupId}
        >
            {(create, buttons) => (
                <FormFunctionality
                    model={functionality}
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
                    <NotifySettings info="Functionalidade cadastrada com sucesso" success={success} />
                </FormFunctionality>
            )}
        </CreateSetting>
    );
} 

interface CreateFunctionalityProps {
    dupId?: number;
    close: () => void;
    onSuccess: () => void;
}

export default CreateFunctionality;