import { useState } from 'react';
import { urlDVRs } from '../apis/endpoints';
import EditItem from '../components/items/EditItem';
import FormNotify from '../formshook/boxes/FormNotify';
import { handleDateForm } from '../utils/functions/Handles';
import { DVRCreationDTO, DVRDTO } from './models/dvr.model';
import FormDVR from './form/FormDVR';

function EditDVR() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformDVR(upDVR: DVRDTO): DVRCreationDTO {
        document.title = "Editar DVR - " + upDVR.code;

        return({
            id: upDVR.id,
            code: upDVR.code,
            location: upDVR.location,
            brand: upDVR.brand,
            model: upDVR.model,
            qtdeChannels: upDVR.qtdeChannels,
            hdSize: upDVR.hdSize,
            activeCams: upDVR.activeCams,
            hasBalun: upDVR.hasBalun,
            dvrIP: upDVR.dvrIP,
            dvrPort: upDVR.dvrPort,
            dvrUser: upDVR.dvrUser,
            dvrPassword: upDVR.dvrPassword,
            status: upDVR.status,
            assetNumber: upDVR.assetNumber,
            acquisitionDate: handleDateForm(upDVR.acquisitionDate),
            lastPreventive: handleDateForm(upDVR.lastPreventive),
            ticketId: upDVR.ticketId,
            notes: upDVR.notes
        });
    }

    return (
        <EditItem<DVRCreationDTO, DVRDTO>
            url={urlDVRs}
            indexUrl="/dvrs"
            transform={transformDVR}
        >
            {(dvr, edit, buttons, error) => (
                <FormDVR
                    title='Alterar DVR'
                    model={dvr}
                    error={error}
                    buttons={() => buttons('/dvrs/create', dvr.id ? dvr.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/dvrs" success={success} text="DVR alterado com sucesso" />
                </FormDVR>
            )}
        </EditItem>
    );
}

export default EditDVR;