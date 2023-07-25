import { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { urlRamais } from '../apis/endpoints';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm, handleUndefinedOption } from '../utils/functions/Handles';
import FormRamal from './form/FormRamal';
import { RamalCreationDTO, RamalDTO } from './models/ramal.model';

function CreateRamal() {
    document.title = "Cadastrar Ramal";

    const base: RamalCreationDTO = {
        number: '',
        model: '',
        exitNumber: '',
        isDepartment: false,
        deviceIP: '',
        deviceConfig: '',
        deviceUser: '',
        devicePassword: '',
        status: 1,
        assetNumber: '',
        acquisitionDate: undefined,
        notes: '',

        departmentId: 0,
        employeeId: 0
    }

    const [ramal, setRamal] = useState<RamalCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Ramal' selectStyle='ramal'>
            <>
            <li><NavLink className="dropdown-item" to="/computers/create">Computador</NavLink></li>
            <li><NavLink className="dropdown-item" to="/printers/create">Impressora</NavLink></li>
            <li><NavLink className="dropdown-item" to="/dvrs/create">DVR</NavLink></li>
            <li><NavLink className="dropdown-item" to="/chips/create">Chip</NavLink></li>
            <li><NavLink className="dropdown-item" to="/nobreaks/create">Nobreak</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformRamal(dupRamal: RamalDTO): void {
        setRamal({
            number: '',
            model: dupRamal.model,
            exitNumber: dupRamal.exitNumber,
            isDepartment: dupRamal.isDepartment,
            deviceIP: dupRamal.deviceIP,
            deviceConfig: dupRamal.deviceConfig,
            deviceUser: dupRamal.deviceUser,
            devicePassword: dupRamal.devicePassword,
            status: dupRamal.status,
            assetNumber: dupRamal.assetNumber,
            acquisitionDate: handleDateForm(dupRamal.acquisitionDate),
            notes: dupRamal.notes,

            departmentId: handleUndefinedOption(dupRamal.departmentId),
            employeeId: handleUndefinedOption(dupRamal.employeeId)
        });
    }

    return (
        <CreateItem<RamalCreationDTO, RamalDTO>
            url={urlRamais}
            transform={transformRamal}
        >
            {(create, buttons, error) => (
                <FormRamal
                    title='Cadastrar Ramal'
                    model={ramal}
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
                    <FormNotify listingLink="/ramais" success={success} text="Ramal cadastrado com sucesso" />
                </FormRamal>
            )}
        </CreateItem>
    );
}

export default CreateRamal;