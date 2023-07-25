
import { useState } from 'react';
import { urlVMS } from "../apis/endpoints";
import EditItem from "../components/items/EditItem";
import FormNotify from "../formshook/boxes/FormNotify";
import { selectOptions } from "../formshook/models/form.model";
import { handleDateIndex } from "../utils/functions/Handles";
import FormServerVM from "./form/FormServerVM";
import { VMFunctionalities } from "./models/server.components.model";
import { ServerVMCreationDTO, ServerVMDTO } from "./models/vm.model";

function EditServerVM() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformServerVm(upServerVM: ServerVMDTO): ServerVMCreationDTO {
        function handleFuncs(dupFuncs: VMFunctionalities[]) {
            let funcs: selectOptions[] = [];

            dupFuncs.forEach((func) => {
                funcs.push({
                    display: func.functionality.description,
                    value: func.functionality.id
                })
            });

            return funcs;
        }

        document.title = "Editar Máquina Virtual - " + upServerVM.code;

        return ({
            id: upServerVM.id,
            code: upServerVM.code,
            operationalSystem: upServerVM.operationalSystem,
            memorySize: upServerVM.memorySize,
            storageSize: upServerVM.storageSize,
            serverHostId: upServerVM.serverHostId,
            status: upServerVM.status,
            setupDate: handleDateIndex(upServerVM.setupDate),
            notes: upServerVM.notes,            
            functionalitySelected: handleFuncs(upServerVM.functionalities),
            funcsIds: []
        });
    }

    return (
        <EditItem<ServerVMCreationDTO, ServerVMDTO>
            url={urlVMS}
            indexUrl="/servers"
            transform={transformServerVm}
        >
            {(vm, edit, buttons, error) => (
                <FormServerVM
                    title='Alterar Máquina Virtual'
                    model={vm}
                    error={error}
                    buttons={() => buttons('/servers/vms/create', vm.id ? vm.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/servers" success={success} text="Máquina virtual alterada com sucesso" />
                </FormServerVM>
            )}
        </EditItem>
    );
}

export default EditServerVM;