import { useState } from "react";
import { urlRamais } from "../apis/endpoints";
import EditItem from "../components/items/EditItem";
import FormNotify from "../formshook/boxes/FormNotify";
import { handleDateForm, handleUndefinedOption } from "../utils/functions/Handles";
import FormRamal from "./form/FormRamal";
import { RamalCreationDTO, RamalDTO } from "./models/ramal.model";

function EditRamal() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformRamal(upRamal: RamalDTO): RamalCreationDTO {
        document.title = "Editar Ramal - " + upRamal.number;

        return({
            id: upRamal.id,
            number: upRamal.number,
            model: upRamal.model,
            exitNumber: upRamal.exitNumber,
            isDepartment: upRamal.isDepartment,
            deviceIP: upRamal.deviceIP,
            deviceConfig: upRamal.deviceConfig,
            deviceUser: upRamal.deviceUser,
            devicePassword: upRamal.devicePassword,
            status: upRamal.status,
            assetNumber: upRamal.assetNumber,
            acquisitionDate: handleDateForm(upRamal.acquisitionDate),
            notes: upRamal.notes,

            departmentId: handleUndefinedOption(upRamal.departmentId),
            employeeId: handleUndefinedOption(upRamal.employeeId)
        });
    }

    return (
        <EditItem<RamalCreationDTO, RamalDTO>
            url={urlRamais}
            indexUrl="/ramais"
            transform={transformRamal}
        >
            {(ramal, edit, buttons, error) => (
                <FormRamal
                    title='Alterar Ramal'
                    model={ramal}
                    error={error}
                    buttons={() => buttons('/ramais/create', ramal.id ? ramal.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/ramais" success={success} text="Ramal alterado com sucesso" />
                </FormRamal>
            )}
        </EditItem>
    );
}

export default EditRamal;