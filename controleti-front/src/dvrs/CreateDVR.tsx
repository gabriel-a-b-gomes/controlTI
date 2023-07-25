import { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { urlDVRs } from '../apis/endpoints';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm } from '../utils/functions/Handles';

import { DVRCreationDTO, DVRDTO } from "./models/dvr.model";

import FormDVR from './form/FormDVR';

function CreateDVR() {
    document.title = "Cadastrar DVR"

    const baseState: DVRCreationDTO = {
        code: '',
        location: '',
        brand: '',
        model: '',
        qtdeChannels: 0,
        hdSize: 0,
        activeCams: 0,
        hasBalun: true,
        dvrIP: '',
        dvrPort: '',
        dvrUser: '',
        dvrPassword: '',
        status: 1,
        assetNumber: '',
        acquisitionDate: undefined,
        lastPreventive: undefined,
        ticketId: '',
        notes: ''
    }

    const [dvr, setDvr] = useState<DVRCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='DVR' selectStyle='dvr'>
            <>
            <li><NavLink className="dropdown-item" to="/computers/create">Computador</NavLink></li>
            <li><NavLink className="dropdown-item" to="/ramais/create">Ramal</NavLink></li>
            <li><NavLink className="dropdown-item" to="/nobreaks/create">Nobreak</NavLink></li>
            <li><NavLink className="dropdown-item" to="/chips/create">Chip</NavLink></li>
            <li><NavLink className="dropdown-item" to="/printers/create">Impressora</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformDVR(dupDVR: DVRDTO): void {
        setDvr({
            code: '',
            location: dupDVR.location,
            brand: dupDVR.brand,
            model: dupDVR.model,
            qtdeChannels: dupDVR.qtdeChannels,
            hdSize: dupDVR.hdSize,
            activeCams: dupDVR.activeCams,
            hasBalun: dupDVR.hasBalun,
            dvrIP: dupDVR.dvrIP,
            dvrPort: dupDVR.dvrPort,
            dvrUser: dupDVR.dvrUser,
            dvrPassword: dupDVR.dvrPassword,
            status: dupDVR.status,
            assetNumber: '',
            acquisitionDate: handleDateForm(dupDVR.acquisitionDate),
            lastPreventive: handleDateForm(dupDVR.lastPreventive),
            ticketId: dupDVR.ticketId,
            notes: dupDVR.notes
        });
    }

    return (
        <CreateItem<DVRCreationDTO, DVRDTO>
            url={urlDVRs}
            transform={transformDVR}
        >
            {(create, buttons, error) => (
                <FormDVR
                    title='Cadastrar DVR'
                    model={dvr}
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
                    <FormNotify listingLink="/dvrs" success={success} text="DVR cadastrado com sucesso" />
                </FormDVR>
            )}
        </CreateItem>
    );
}

export default CreateDVR;