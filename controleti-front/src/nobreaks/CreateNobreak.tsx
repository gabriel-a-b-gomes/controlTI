import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { urlNobreaks } from '../apis/endpoints';

import FormNobreak from './form/FormNobreak';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';

import { NobreakCreationDTO, NobreakDTO } from './models/nobreak.model';
import { handleDateForm } from '../utils/functions/Handles';

function CreateNobreak() {
    document.title = "Cadastrar Nobreak";

    const baseState: NobreakCreationDTO = {
        code: '',
        location: '',
        brand: '',
        model: '',
        qtdeVA: 0,
        isSenoidal: false,
        typeOfUse: 0,
        status: 1,
        assetNumber: '',
        acquisitionDate: undefined,
        lastPreventive: undefined,
        ticketId: '',
        notes: ''
    }

    const [nobreak, setNobreak] = useState<NobreakCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Nobreak' selectStyle='nobreak'>
            <>
            <li><NavLink className="dropdown-item" to="/computers/create">Computador</NavLink></li>
            <li><NavLink className="dropdown-item" to="/ramais/create">Ramal</NavLink></li>
            <li><NavLink className="dropdown-item" to="/dvrs/create">DVR</NavLink></li>
            <li><NavLink className="dropdown-item" to="/chips/create">Chip</NavLink></li>
            <li><NavLink className="dropdown-item" to="/printers/create">Impressora</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformNobreak(dupNobreak: NobreakDTO): void {
        setNobreak({
            code: '',
            location: dupNobreak.location,
            brand: dupNobreak.brand,
            model: dupNobreak.model,
            qtdeVA: dupNobreak.qtdeVA,
            isSenoidal: dupNobreak.isSenoidal,
            typeOfUse: dupNobreak.typeOfUse,
            status: dupNobreak.status,
            assetNumber: '',
            acquisitionDate: handleDateForm(dupNobreak.acquisitionDate),
            lastPreventive: handleDateForm(dupNobreak.lastPreventive),
            ticketId: dupNobreak.ticketId,
            notes: dupNobreak.notes
        });
    }

    return (
        <CreateItem<NobreakCreationDTO, NobreakDTO>
            url={urlNobreaks}
            transform={transformNobreak}
        >
            {(create, buttons, error) => (
                <FormNobreak
                    title='Cadastrar Nobreak'
                    model={nobreak}
                    error={error}
                    formHeaderOption={selectDevice}
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
                    <FormNotify listingLink="/nobreaks" success={success} text="Nobreak cadastrado com sucesso" />
                </FormNobreak>
            )}
        </CreateItem>
    );
}

export default CreateNobreak;