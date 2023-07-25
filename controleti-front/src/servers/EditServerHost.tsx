import { useState } from "react";
import { urlHosts } from "../apis/endpoints";
import { MemoryCreationDTO, StorageCreationDTO } from "../computers/models/computer.components.model";
import { ServerHostCreationDTO, ServerHostDTO } from "./models/host.model";
import { HostFunctionalities, ServerMemory, ServerStorage } from "./models/server.components.model";
import { selectOptions } from "../formshook/models/form.model";
import { handleDateForm } from "../utils/functions/Handles";
import FormServerHost from "./form/FormServerHost";
import FormNotify from "../formshook/boxes/FormNotify";
import EditItem from "../components/items/EditItem";

function EditServerHost() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformServerHost(upServerHost: ServerHostDTO): ServerHostCreationDTO {
        function handleMemories(dupMemories: ServerMemory[]) {
            let memories: MemoryCreationDTO[] = [];

            dupMemories.forEach((memo) => {
                memories.push({
                    model: memo.memory.model,
                    memoryPentSize: memo.memory.memoryPentSize,
                    qtde: memo.qtde
                });
            });

            return memories;
        }

        function handleStorages(dupStorages: ServerStorage[]) {
            let storages: StorageCreationDTO[] = [];

            dupStorages.forEach((sto) => {
                storages.push({
                    brand: sto.storage.brand,
                    storageSize: sto.storage.storageSize,
                    type: sto.storage.type,
                    qtde: sto.qtde
                });
            });

            return storages;
        }

        function handleFuncs(dupFuncs: HostFunctionalities[]) {
            let funcs: selectOptions[] = [];

            dupFuncs.forEach((func) => {
                funcs.push({
                    display: func.functionality.description,
                    value: func.functionality.id
                })
            });

            return funcs;
        }

        document.title = "Editar Servidor Host - " + upServerHost.code;

        return({
            id: upServerHost.id,
            code: upServerHost.code,
            machineBrand: upServerHost.machineBrand,
            machineModel: upServerHost.machineModel,
            memorySize: upServerHost.memorySize,
            storageSize: upServerHost.storageSize,
            status: upServerHost.status,
            processorModelDescription: upServerHost.processorModelDescription,
            processorFrequency: upServerHost.processorFrequency,
            operationalSystemDescription: upServerHost.operationalSystemDescription,
            assetNumber: upServerHost.assetNumber,
            ticketId: upServerHost.ticketId,
            lastPreventiveDate: handleDateForm(upServerHost.lastPreventiveDate),
            acquisitionDate: handleDateForm(upServerHost.acquisitionDate),
            notes: upServerHost.notes,

            memories: handleMemories(upServerHost.memories),
            storages: handleStorages(upServerHost.storages),
            
            functionalitySelected: handleFuncs(upServerHost.functionalities),
            funcsIds: []
        });
    }

    return (
        <EditItem<ServerHostCreationDTO, ServerHostDTO>
            url={urlHosts}
            indexUrl="/servers"
            transform={transformServerHost}
        >
            {(host, edit, buttons, error) => (
                <FormServerHost
                    title='Alterar Servidor'
                    model={host}
                    error={error}
                    buttons={() => buttons('/servers/hosts/create', host.id ? host.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/servers" success={success} text="Servidor Host alterado com sucesso" />
                </FormServerHost>
            )}
        </EditItem>
    );
}

export default EditServerHost;