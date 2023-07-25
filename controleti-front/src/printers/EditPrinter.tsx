import { useState } from 'react';

import { urlPrinters } from "../apis/endpoints";
import EditItem from "../components/items/EditItem";
import FormNotify from "../formshook/boxes/FormNotify";
import { handleDateForm } from '../utils/functions/Handles';
import FormPrinter from "./form/FormPrinter";
import { PrinterCreationDTO, PrinterDTO } from "./models/printer.model";

function EditPrinter() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformPrinter(upPrinter: PrinterDTO): PrinterCreationDTO {
        document.title = "Editar Impressora - " + upPrinter.code;

        return({
            id: upPrinter.id,
            code: upPrinter.code,
            location: upPrinter.location,
            brand: upPrinter.brand,
            model: upPrinter.model,
            type: upPrinter.type,
            printerIP: upPrinter.printerIP,
            printerUser: upPrinter.printerUser,
            printerPassword: upPrinter.printerPassword,
            supplies: upPrinter.supplies,
            status: upPrinter.status,
            assetNumber: upPrinter.assetNumber,
            serialNumber: upPrinter.serialNumber,
            acquisitionDate: handleDateForm(upPrinter.acquisitionDate),
            notes: upPrinter.notes
        });
    }

    return (
        <EditItem<PrinterCreationDTO, PrinterDTO>
            url={urlPrinters}
            indexUrl="/printers"
            transform={transformPrinter}
        >
            {(printer, edit, buttons, error) => (
                <FormPrinter
                    title='Alterar Impressora'
                    model={printer}
                    error={error}
                    buttons={() => buttons('/printers/create', printer.id ? printer.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/printers" success={success} text="Impressora alterada com sucesso" />
                </FormPrinter>
            )}
        </EditItem>
    );
}

export default EditPrinter;