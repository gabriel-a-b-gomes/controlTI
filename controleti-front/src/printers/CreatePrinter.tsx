import { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { urlPrinters } from "../apis/endpoints";
import CreateItem from "../components/items/CreateItem";
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm } from '../utils/functions/Handles';
import FormPrinter from './form/FormPrinter';
import { PrinterCreationDTO, PrinterDTO } from "./models/printer.model";

function CreatePrinter() {
    document.title = "Cadastrar Impressora";

    const baseState: PrinterCreationDTO = {
        code: '',
        location: '',
        brand: '',
        model: '',
        type: 1,
        printerIP: '',
        printerUser: '',
        printerPassword: '',
        supplies: '',
        status: 1,
        assetNumber: '',
        serialNumber: '',
        acquisitionDate: undefined,
        notes: ''
    }

    const [printer, setPrinter] = useState<PrinterCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Impressora' selectStyle='printer'>
            <>
            <li><NavLink className="dropdown-item" to="/computers/create">Computador</NavLink></li>
            <li><NavLink className="dropdown-item" to="/ramais/create">Ramal</NavLink></li>
            <li><NavLink className="dropdown-item" to="/dvrs/create">DVR</NavLink></li>
            <li><NavLink className="dropdown-item" to="/chips/create">Chip</NavLink></li>
            <li><NavLink className="dropdown-item" to="/nobreaks/create">Nobreak</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformPrinter(dupPrinter: PrinterDTO): void {
        setPrinter({
            code: '',
            location: dupPrinter.location,
            brand: dupPrinter.brand,
            model: dupPrinter.model,
            type: dupPrinter.type,
            printerIP: dupPrinter.printerIP,
            printerUser: dupPrinter.printerUser,
            printerPassword: dupPrinter.printerPassword,
            supplies: dupPrinter.supplies,
            status: dupPrinter.status,
            assetNumber: '',
            serialNumber: '',
            acquisitionDate: handleDateForm(dupPrinter.acquisitionDate),
            notes: dupPrinter.notes
        });
    }

    return (
        <CreateItem<PrinterCreationDTO, PrinterDTO>
            url={urlPrinters}
            transform={transformPrinter}
        >
            {(create, buttons, error) => (
                <FormPrinter
                    title='Cadastrar Impressora'
                    model={printer}
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
                    <FormNotify listingLink="/printers" success={success} text="Impressora cadastrada com sucesso" />
                </FormPrinter>
            )}
        </CreateItem>
    );
}

export default CreatePrinter;