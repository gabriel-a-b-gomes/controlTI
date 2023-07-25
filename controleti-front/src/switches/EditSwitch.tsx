import { useState } from 'react';
import { urlSwitches } from '../apis/endpoints';
import EditItem from '../components/items/EditItem';
import FormNotify from '../formshook/boxes/FormNotify';
import { handleDateForm } from '../utils/functions/Handles';
import FormSwitch from './form/FormSwitch';
import { SwitchCreationDTO, SwitchDTO } from './models/switch.model';

function EditSwitch() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformSwitch(upSwitch: SwitchDTO): SwitchCreationDTO {
        document.title = "Editar Switch - " + upSwitch.code;

        return({
            id: upSwitch.id,
            code: upSwitch.code,
            location: upSwitch.location,
            brand: upSwitch.brand,
            switchIP: upSwitch.switchIP,
            switchMAC: upSwitch.switchMAC,
            switchUser: upSwitch.switchUser,
            switchPassword: upSwitch.switchPassword,
            qtdePorts: upSwitch.qtdePorts,
            status: upSwitch.status,
            assetNumber: upSwitch.assetNumber,
            acquisitionDate: handleDateForm(upSwitch.acquisitionDate),
            notes: upSwitch.notes
        });
    }

    return (
        <EditItem<SwitchCreationDTO, SwitchDTO>
            url={urlSwitches}
            indexUrl="/network/devices"
            transform={transformSwitch}
        >
            {(mSwitch, edit, buttons, error) => (
                <FormSwitch
                    title='Alterar Switch'
                    model={mSwitch}
                    error={error}
                    buttons={() => buttons('/network/devices/switches/create', mSwitch.id ? mSwitch.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/network/devices/switches" success={success} text="Switch alterado com sucesso" />
                </FormSwitch>
            )}
        </EditItem>
    );
}

export default EditSwitch;