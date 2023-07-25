import { useState } from "react";
import { urlComputers } from "../apis/endpoints";
import EditItem from "../components/items/EditItem";
import FormNotify from "../formshook/boxes/FormNotify";
import { handleDateForm, handleUndefinedOption } from "../utils/functions/Handles";

import { ComputerCreationDTO, ComputerDTO, ComputerLogDTO } from "./models/computer.model";
import ComputerHistory from "./components/ComputerHistory";
import FormComputer from "./form/FormComputer";
import { ComputerMemoryDTO, MemoryCreationDTO } from "./models/computer.components.model";

function EditComputer() {
    const [logs, setLogs] = useState<ComputerLogDTO[]>([]);
    const [success, setSuccess] = useState<boolean>(false);

    function transformComputer(upComputer: ComputerDTO): ComputerCreationDTO {
        function handleMemories(dupMemories: ComputerMemoryDTO[]): MemoryCreationDTO[] {
            let memories: MemoryCreationDTO[] = [];

            dupMemories.forEach((dupMemory) => {
                memories.push({
                    model: dupMemory.memory.model,
                    memoryPentSize: dupMemory.memory.memoryPentSize,
                    qtde: dupMemory.qtde
                })
            })

            return memories;
        }

        setLogs(upComputer.logs);

        document.title = "Editar Computador - " + upComputer.code;

        return ({
            id: upComputer.id,
            code: upComputer.code,
            computerType: upComputer.computerType,
            memorySize: upComputer.memorySize,
            operationalSystem: upComputer.operationalSystem,
            rankOperationalSystem: upComputer.rankOperationalSystem,
            status: upComputer.status,
            assetNumber: upComputer.assetNumber,
            acquisitionDate: handleDateForm(upComputer.acquisitionDate),
            lastPreventiveDate: handleDateForm(upComputer.lastPreventiveDate),
            ticketId: upComputer.ticketId,
            notes: upComputer.notes,

            departmentId: handleUndefinedOption(upComputer.departmentId),
            employeeId: handleUndefinedOption(upComputer.employeeId),
            profileId: handleUndefinedOption(upComputer.profileId),

            processingUnit: {
                model: upComputer.processingUnit.model,
                frequency: upComputer.processingUnit.frequency,
                generation: upComputer.processingUnit.generation,
                rankProcessingUnit: upComputer.processingUnit.rankProcessingUnit
            },

            storage: {
                brand: upComputer.storage.brand, 
                type: upComputer.storage.type,
                storageSize: upComputer.storage.storageSize
            },

            memories: handleMemories(upComputer.memories)
        });
    }

    return (
        <EditItem<ComputerCreationDTO, ComputerDTO>
            url={urlComputers}
            indexUrl="/computers"
            transform={transformComputer}
        >
            {(computer, edit, buttons, error) => (
                <FormComputer
                    title='Alterar Computador'
                    model={computer}
                    error={error}
                    formHeaderOptions={<ComputerHistory logs={logs} code={computer.code} />}
                    buttons={() => buttons('/computers/create', computer.id ? computer.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/computers" success={success} text="Computador alterado com sucesso" />
                </FormComputer>
            )}
        </EditItem>
    );
}

export default EditComputer;