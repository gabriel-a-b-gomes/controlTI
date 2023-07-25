import { ReactElement, useState } from 'react';
import { ServerVMCreationDTO, ServerVMDTO } from "./models/vm.model";
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { NavLink } from 'react-router-dom';
import CreateItem from '../components/items/CreateItem';
import { urlVMS } from '../apis/endpoints';
import FormServerVM from './form/FormServerVM';
import { selectOptions } from '../formshook/models/form.model';
import { VMFunctionalities } from './models/server.components.model';
import FormNotify from '../formshook/boxes/FormNotify';
import { handleDateIndex } from '../utils/functions/Handles';

function CreateServerVM() {
    document.title = "Cadastrar Máquina Virtual";

    const baseState: ServerVMCreationDTO = {
        code: '',
        operationalSystem: '',
        memorySize: 0,
        storageSize: 0,
        serverHostId: 0,
        status: 1,
        setupDate: undefined,
        notes: '',

        funcsIds: [],
        functionalitySelected: []
    }

    const [serverVm, setServerVm] = useState<ServerVMCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Máq. Virtual' selectStyle='srv-vms'>
            <>
            <li><NavLink className="dropdown-item" to="/servers/hosts/create">Servidor Host</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformServerVm(dupServerVm: ServerVMDTO): void {
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

        setServerVm({
            code: '',
            operationalSystem: dupServerVm.operationalSystem,
            memorySize: dupServerVm.memorySize,
            storageSize: dupServerVm.storageSize,
            serverHostId: dupServerVm.serverHostId,
            status: dupServerVm.status,
            setupDate: handleDateIndex(dupServerVm.setupDate),
            notes: dupServerVm.notes,            
            functionalitySelected: handleFuncs(dupServerVm.functionalities),
            funcsIds: []
        });
    }

    return (
        <CreateItem<ServerVMCreationDTO, ServerVMDTO>
            url={urlVMS}
            transform={transformServerVm}
        >
            {(create, buttons, error) => (
                <FormServerVM
                    title='Cadastrar Máquina Virtual'
                    model={serverVm}
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
                    <FormNotify listingLink="/servers" success={success} text="Máquina Virtual cadastrada com sucesso" />
                </FormServerVM>
            )}
        </CreateItem>
    );
}

export default CreateServerVM;