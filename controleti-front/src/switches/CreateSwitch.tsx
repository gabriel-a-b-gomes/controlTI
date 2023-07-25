import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { urlSwitches } from '../apis/endpoints';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm } from '../utils/functions/Handles';
import FormSwitch from './form/FormSwitch';

import { SwitchCreationDTO, SwitchDTO } from "./models/switch.model";

function CreateSwitch() {
    document.title = "Cadastrar Switch";

    const baseState: SwitchCreationDTO = {
        code: '',
        location: '',
        brand: '',
        switchIP: '',
        switchMAC: '',
        switchUser: '',
        switchPassword: '',
        qtdePorts: 0,
        status: 1,
        assetNumber: '',
        acquisitionDate: undefined,
        notes: ''
    }

    const [mSwitch, setMSwitch] = useState<SwitchCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Switch' selectStyle='switch'>
            <>
            <li><NavLink className="dropdown-item" to="/network/devices/routers/create/">Roteador</NavLink></li>
            <li><NavLink className="dropdown-item" to="/network/devices/nodes/create/">Ponto de Rede</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformSwitch(dupSwitch: SwitchDTO): void {
        setMSwitch({
            code: '',
            location: dupSwitch.location,
            brand: dupSwitch.brand,
            switchIP: dupSwitch.switchIP,
            switchMAC: '',
            switchUser: dupSwitch.switchUser,
            switchPassword: dupSwitch.switchPassword,
            qtdePorts: dupSwitch.qtdePorts,
            status: dupSwitch.status,
            assetNumber: '',
            acquisitionDate: handleDateForm(dupSwitch.acquisitionDate),
            notes: dupSwitch.notes
        });
    }

    return (
        <CreateItem<SwitchCreationDTO, SwitchDTO>
            url={urlSwitches}
            transform={transformSwitch}
        >
            {(create, buttons, error) => (
                <FormSwitch
                    title='Cadastrar Switch'
                    model={mSwitch}
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
                    <FormNotify listingLink="/network/devices/switches" success={success} text="Switch cadastrado com sucesso" />
                </FormSwitch>
            )}
        </CreateItem>
    );
}

export default CreateSwitch;