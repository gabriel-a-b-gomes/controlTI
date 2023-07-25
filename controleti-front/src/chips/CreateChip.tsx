import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { urlChips } from '../apis/endpoints';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm, handleUndefinedOption } from '../utils/functions/Handles';
import { ChipCreationDTO, ChipDTO } from './models/chip.model';
import FormChip from './form/FormChip';

function CreateChip() {
    document.title = "Cadastrar Chip";

    const base: ChipCreationDTO = {
        number: '',
        account: '',
        acctualICCID: '',
        type: '',
        status: 1,
        assetNumber: '',
        acquisitionDate: undefined,
        notes: '',

        cellPhone: {
            model: '',
            memorySize: 0,
            storageSize: 0,
            operationalSystem: '',
            processingUnit: ''
        },

        departmentId: 0,
        employeeId: 0
    }

    const [chip, setChip] = useState<ChipCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Chip' selectStyle={'chip'}>
            <>
            <li><NavLink className="dropdown-item" to="/computers/create">Computador</NavLink></li>
            <li><NavLink className="dropdown-item" to="/printers/create">Impressora</NavLink></li>
            <li><NavLink className="dropdown-item" to="/dvrs/create">DVR</NavLink></li>
            <li><NavLink className="dropdown-item" to="/ramais/create">Ramal</NavLink></li>
            <li><NavLink className="dropdown-item" to="/nobreaks/create">Nobreak</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformChip(dupChip: ChipDTO): void {
        setChip({
            number: '',
            account: dupChip.account,
            acctualICCID: dupChip.acctualICCID,
            type: dupChip.type,
            status: dupChip.status,
            assetNumber: dupChip.assetNumber,
            notes: dupChip.notes,
            acquisitionDate: handleDateForm(dupChip.acquisitionDate),
            
            cellPhone: {
                model: dupChip.cellPhone?.model,
                storageSize: dupChip.cellPhone?.storageSize,
                memorySize: dupChip.cellPhone?.memorySize,
                operationalSystem: dupChip.cellPhone?.operationalSystem,
                processingUnit: dupChip.cellPhone?.processingUnit
            },

            departmentId: handleUndefinedOption(dupChip.departmentId),
            employeeId: handleUndefinedOption(dupChip.employeeId)
        });
    }

    return (
        <CreateItem<ChipCreationDTO, ChipDTO>
            url={urlChips}
            transform={transformChip}
        >
            {(create, buttons, error) => (
                <FormChip
                    title='Cadastrar Chip'
                    model={chip}
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
                    <FormNotify listingLink="/chips" success={success} text="Chip cadastrado com sucesso" />
                </FormChip>
            )}    
        </CreateItem>
    );
}

export default CreateChip;