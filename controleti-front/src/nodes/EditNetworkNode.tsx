import { useState } from 'react';

import { urlNetworkNodes } from "../apis/endpoints";
import EditItem from "../components/items/EditItem";
import FormNotify from '../formshook/boxes/FormNotify';
import FormNetworkNode from './form/FormNetworkNode';
import { NetworkNodeCreationDTO, NetworkNodeDTO } from "./models/networknodes.model";
import { handleUndefinedOption } from '../utils/functions/Handles';

function EditNetworkNode() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformNode(upNode: NetworkNodeDTO):NetworkNodeCreationDTO {
        document.title = "Editar Ponto de Rede - " + upNode.code;

        return ({
            id: upNode.id,
            code: upNode.code,
            location: upNode.location,
            switchPort: upNode.switchPort,
            switchId: handleUndefinedOption(upNode.switchId),
            employeeId: handleUndefinedOption(upNode.employeeId),
            patchPanelLocation: upNode.patchPanelLocation,
            patchPanelPort: upNode.patchPanelPort ? upNode.patchPanelPort : undefined,
            patchPanelNodeId: upNode.patchPanelNodeId,
            notes: upNode.notes
        });
    }

    return (
        <EditItem<NetworkNodeCreationDTO, NetworkNodeDTO>
            url={urlNetworkNodes}
            indexUrl="/network/devices/nodes"
            transform={transformNode}
        >
            {(node, edit, buttons, error) => (
                <FormNetworkNode
                    title='Alterar Ponto de Rede'
                    model={node}
                    error={error}
                    buttons={() => buttons('/network/devices/nodes/create', node.id ? node.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/network/devices/nodes" success={success} text="Ponto de rede alterado com sucesso" />
                </FormNetworkNode>
            )}
        </EditItem>
    );
}

export default EditNetworkNode;