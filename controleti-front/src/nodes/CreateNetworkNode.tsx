import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { urlNetworkNodes } from "../apis/endpoints";
import CreateItem from "../components/items/CreateItem";
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import FormNetworkNode from "./form/FormNetworkNode";
import { NetworkNodeCreationDTO, NetworkNodeDTO } from "./models/networknodes.model";
import { handleUndefinedOption } from '../utils/functions/Handles';

function CreateNetworkNode() {
    document.title = "Cadastrar Ponto de Rede";

    const base: NetworkNodeCreationDTO = {
        code: '',
        location: '',
        switchPort: 0,
        switchId: 0,
        employeeId: 0,
        patchPanelLocation: '',
        patchPanelPort: undefined,
        patchPanelNodeId: '',
        notes: ''
    }

    const [node, setNode] = useState<NetworkNodeCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Ponto de Rede' selectStyle='node'>
            <>
            <li><NavLink className="dropdown-item" to="/network/devices/switches/create/">Switch</NavLink></li>
            <li><NavLink className="dropdown-item" to="/network/devices/routers/create/">Roteador</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformNode(dupNode: NetworkNodeDTO): void {
        setNode({
            code: '',
            location: dupNode.location,
            switchPort: dupNode.switchPort,
            switchId: handleUndefinedOption(dupNode.switchId),
            employeeId: handleUndefinedOption(dupNode.employeeId),
            patchPanelLocation: dupNode.patchPanelLocation,
            patchPanelPort: dupNode.patchPanelPort,
            patchPanelNodeId: dupNode.patchPanelNodeId,
            notes: dupNode.notes
        });
    }

    return (
        <CreateItem<NetworkNodeCreationDTO, NetworkNodeDTO>
            url={urlNetworkNodes}
            transform={transformNode}
        >
            {(create, buttons, error) => (
                <FormNetworkNode
                    title='Cadastrar Ponto de Rede'
                    model={node}
                    error={error}
                    formHeaderOptions={selectDevice}
                    buttons={(actions) => buttons(() => actions.reset(base))}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await create(values);
                        setSuccess(status === 200);

                        if (status === 200) {
                            actions.reset(base);
                        }
                    } }
                >
                    <FormNotify listingLink="/network/devices/nodes" success={success} text="Ponto de rede cadastrado com sucesso" />
                </FormNetworkNode>
            )}
        </CreateItem>
    );
}

export default CreateNetworkNode;