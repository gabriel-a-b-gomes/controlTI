import { useState } from 'react';

import { urlNobreaks } from '../apis/endpoints';

import EditItem from '../components/items/EditItem';
import FormNobreak from './form/FormNobreak';
import FormNotify from '../formshook/boxes/FormNotify';

import { NobreakCreationDTO, NobreakDTO } from './models/nobreak.model';
import { handleDateForm } from '../utils/functions/Handles';

function EditNobreak() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformNobreak(nobreak: NobreakDTO): NobreakCreationDTO {
        document.title = "Editar Nobreak - " + nobreak.code;

        return {
            id: nobreak.id,
            code: nobreak.code,
            location: nobreak.location,
            brand: nobreak.brand,
            model: nobreak.model,
            qtdeVA: nobreak.qtdeVA,
            isSenoidal: nobreak.isSenoidal,
            typeOfUse: nobreak.typeOfUse,
            status: nobreak.status,
            assetNumber: nobreak.assetNumber,
            acquisitionDate: handleDateForm(nobreak.acquisitionDate),
            lastPreventive: handleDateForm(nobreak.lastPreventive),
            ticketId: nobreak.ticketId,
            notes: nobreak.notes
        };
    }

    return (
        <EditItem<NobreakCreationDTO, NobreakDTO>
            url={urlNobreaks}
            indexUrl='/nobreaks'
            transform={transformNobreak}
        >
            {(nobreak, edit, buttons, error) => (
                <FormNobreak
                    title='Alterar Nobreak'
                    model={nobreak}
                    error={error}
                    buttons={() => buttons('/nobreaks/create', nobreak.id ? nobreak.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        console.log(status);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/nobreaks" success={success} text="Nobreak alterado com sucesso" />
                </FormNobreak>
            )}
        </EditItem>
    );
}

export default EditNobreak;