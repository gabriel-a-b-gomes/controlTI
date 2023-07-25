import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { urlComputers } from '../apis/endpoints';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm, handleUndefinedOption } from '../utils/functions/Handles';
import { ComputerCreationDTO, ComputerDTO } from "./models/computer.model";
import FormComputer from './form/FormComputer';
import { ComputerMemoryDTO, MemoryCreationDTO } from './models/computer.components.model';

function CreateComputer() {
    document.title = "Cadastrar Computador"

    const base: ComputerCreationDTO = {
        code: '',
        computerType: 0,
        memorySize: 0,
        operationalSystem: '',
        rankOperationalSystem: 2,
        status: 1,
        assetNumber: '',
        notes: '',
        acquisitionDate: undefined,
        lastPreventiveDate: undefined,
        ticketId: '',
        departmentId: 0,
        employeeId: 0,
        profileId: 0,

        processingUnit: {
            model: '',
            frequency: '',
            generation: '',
            rankProcessingUnit: 3
        },

        storage: {
            brand: '', 
            type: 'HD',
            storageSize: 0
        },

        memories: [{
            model: '',
            memoryPentSize: 0,
            qtde: 0
        }]
    }

    const [computer, setComputer] = useState<ComputerCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Computador' selectStyle='computer'>
            <>
            <li><NavLink className="dropdown-item" to="/chips/create">Chip</NavLink></li>
            <li><NavLink className="dropdown-item" to="/printers/create">Impressora</NavLink></li>
            <li><NavLink className="dropdown-item" to="/dvrs/create">DVR</NavLink></li>
            <li><NavLink className="dropdown-item" to="/ramais/create">Ramal</NavLink></li>
            <li><NavLink className="dropdown-item" to="/nobreaks/create">Nobreak</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformComputer(dupComputer: ComputerDTO): void {
        function handleMemories(dupMemories: ComputerMemoryDTO[]): MemoryCreationDTO[] {
            let memories: MemoryCreationDTO[] = [];

            dupMemories.forEach((dupMemory) => {
                memories.push({
                    model: dupMemory.memory.model,
                    memoryPentSize: dupMemory.memory.memoryPentSize,
                    qtde: dupMemory.qtde
                })
            })

            return memories;
        }

        setComputer({
            code: '',
            computerType: dupComputer.computerType,
            memorySize: dupComputer.memorySize,
            operationalSystem: dupComputer.operationalSystem,
            rankOperationalSystem: dupComputer.rankOperationalSystem,
            status: dupComputer.status,
            assetNumber: dupComputer.assetNumber,
            acquisitionDate: handleDateForm(dupComputer.acquisitionDate),
            lastPreventiveDate: handleDateForm(dupComputer.lastPreventiveDate),
            ticketId: dupComputer.ticketId,
            notes: dupComputer.notes,

            departmentId: handleUndefinedOption(dupComputer.departmentId),
            employeeId: handleUndefinedOption(dupComputer.employeeId),
            profileId: handleUndefinedOption(dupComputer.profileId),

            processingUnit: {
                model: dupComputer.processingUnit.model,
                frequency: dupComputer.processingUnit.frequency,
                generation: dupComputer.processingUnit.generation,
                rankProcessingUnit: dupComputer.processingUnit.rankProcessingUnit
            },

            storage: {
                brand: dupComputer.storage.brand, 
                type: dupComputer.storage.type,
                storageSize: dupComputer.storage.storageSize
            },

            memories: handleMemories(dupComputer.memories)
        });
    }

    return (
        <CreateItem<ComputerCreationDTO, ComputerDTO>
            url={urlComputers}
            transform={transformComputer}
        >
            {(create, buttons, error) => (  
                <FormComputer
                    title='Cadastrar Computador'
                    model={computer}
                    error={error}
                    formHeaderOptions={selectDevice}
                    buttons={(actions) => buttons(() => actions.reset(base))}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        console.log(values)
                        const status = await create(values);
                        setSuccess(status === 200);

                        if (status === 200) {
                            actions.reset(base);
                        }
                    } }
                >
                    <FormNotify listingLink="/computers" success={success} text="Computador cadastrado com sucesso" />
                </FormComputer>
            )}
        </CreateItem>
    );
}

export default CreateComputer;