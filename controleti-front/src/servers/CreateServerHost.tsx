import { ReactElement, useState } from "react";
import FormNotify from "../formshook/boxes/FormNotify";
import FormServerHost from "./form/FormServerHost";
import CreatingDeviceSelect from "../shared/devices/CreatingDeviceSelect";
import { NavLink } from "react-router-dom";
import { ServerHostCreationDTO, ServerHostDTO } from "./models/host.model";
import { Status } from "../utils/enums/Enums";
import { handleDateForm } from "../utils/functions/Handles";
import { HostFunctionalities, ServerMemory, ServerStorage } from "./models/server.components.model";
import { MemoryCreationDTO, StorageCreationDTO } from "../computers/models/computer.components.model";
import { selectOptions } from "../formshook/models/form.model";
import CreateItem from "../components/items/CreateItem";
import { urlHosts } from "../apis/endpoints";

function CreateServerHost() {
    document.title = "Cadastrar Servidor Host";

    const baseState: ServerHostCreationDTO = {
        code: '',
        machineBrand: '',
        machineModel: '',
        memorySize: 0,
        storageSize: 0,
        status: Status.Ativo,
        processorModelDescription: '',
        processorFrequency: '',
        operationalSystemDescription: '',
        assetNumber: '',
        ticketId: '',
        lastPreventiveDate: undefined,
        acquisitionDate: undefined,
        notes: '',

        memories: [{
            memoryPentSize: 0,
            model: '',
            qtde: 0
        }],
        storages: [{
            type: 'HD',
            brand: '',
            storageSize: 0,
            qtde: 0
        }],
        funcsIds: [],
        functionalitySelected: []
    }

    const [serverHost, setServerHost] = useState<ServerHostCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Servidor Host' selectStyle='srv-host'>
            <>
            <li><NavLink className="dropdown-item" to="/servers/vms/create">Máquina Virtual</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformServerHost(dupServerHost: ServerHostDTO): void {
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

        setServerHost({
            code: '',
            machineBrand: dupServerHost.machineBrand,
            machineModel: dupServerHost.machineModel,
            memorySize: dupServerHost.memorySize,
            storageSize: dupServerHost.storageSize,
            status: dupServerHost.status,
            processorModelDescription: dupServerHost.processorModelDescription,
            processorFrequency: dupServerHost.processorFrequency,
            operationalSystemDescription: dupServerHost.operationalSystemDescription,
            assetNumber: '',
            ticketId: '',
            lastPreventiveDate: handleDateForm(dupServerHost.lastPreventiveDate),
            acquisitionDate: handleDateForm(dupServerHost.acquisitionDate),
            notes: dupServerHost.notes,

            memories: handleMemories(dupServerHost.memories),
            storages: handleStorages(dupServerHost.storages),
            
            functionalitySelected: handleFuncs(dupServerHost.functionalities),
            funcsIds: []
        });
    }

    return (
        <CreateItem<ServerHostCreationDTO, ServerHostDTO>
            url={urlHosts}
            transform={transformServerHost}
        >
            {(create, buttons, error) => (
                <FormServerHost
                    title='Cadastrar Servidor'
                    model={serverHost}
                    error={error}
                    formHeaderOptions={selectDevice}
                    buttons={(actions) => buttons(() => actions.reset(baseState))}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await create(values);
                        setSuccess(status === 200);

                        if (status === 200) {
                            actions.reset(baseState);
                        }
                    } }
                >
                    <FormNotify listingLink="/servers" success={success} text="Servidor Host cadastrado com sucesso" />
                </FormServerHost>
            )}
        </CreateItem>
    );
}

export default CreateServerHost;