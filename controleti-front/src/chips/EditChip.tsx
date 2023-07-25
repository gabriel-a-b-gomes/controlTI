import { useState } from "react";
import { urlChips } from "../apis/endpoints";
import EditItem from "../components/items/EditItem";
import FormNotify from "../formshook/boxes/FormNotify";
import { handleDateForm, handleUndefinedOption } from "../utils/functions/Handles";
import { ChipCreationDTO, ChipDTO } from "./models/chip.model";
import FormChip from "./form/FormChip";

function EditChip() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformChip(upChip: ChipDTO): ChipCreationDTO {
        document.title = "Editar Chip - " + upChip.number;

        return ({
            id: upChip.id,
            number: upChip.number,
            account: upChip.account,
            acctualICCID: upChip.acctualICCID,
            type: upChip.type,
            status: upChip.status,
            assetNumber: upChip.assetNumber,
            notes: upChip.notes,
            acquisitionDate: handleDateForm(upChip.acquisitionDate),
            
            cellPhone: {
                model: upChip.cellPhone?.model,
                storageSize: upChip.cellPhone?.storageSize,
                memorySize: upChip.cellPhone?.memorySize,
                operationalSystem: upChip.cellPhone?.operationalSystem,
                processingUnit: upChip.cellPhone?.processingUnit
            },

            departmentId: handleUndefinedOption(upChip.departmentId),
            employeeId: handleUndefinedOption(upChip.employeeId)
        });
    }

    return (
        <EditItem<ChipCreationDTO, ChipDTO>
            url={urlChips}
            indexUrl="/chips"
            transform={transformChip}
        >
            {(chip, edit, buttons, error) => (
                <FormChip
                    title='Alterar Chip'
                    model={chip}
                    error={error}
                    buttons={() => buttons('/chips/create', chip.id ? chip.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/chips" success={success} text="Chip alterado com sucesso" />
                </FormChip>
            )}
        </EditItem>
    );
}

export default EditChip;