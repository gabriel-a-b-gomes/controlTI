import { useState } from 'react';
import { urlRouters } from '../apis/endpoints';
import EditItem from '../components/items/EditItem';
import FormNotify from '../formshook/boxes/FormNotify';
import { handleDateForm } from '../utils/functions/Handles';
import FormRouter from './form/FormRouter';
import { RouterCreationDTO, RouterDTO } from './models/router.model';

function EditRouter() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformSwitch(upRouter: RouterDTO): RouterCreationDTO {
        document.title = "Editar Roteador - " + upRouter.code;

        return({
            id: upRouter.id,
            code: upRouter.code,
            location: upRouter.location,
            brand: upRouter.brand,
            routerIP: upRouter.routerIP,
            routerMAC: upRouter.routerMAC,
            routerUser: upRouter.routerUser,
            routerPassword: upRouter.routerPassword,
            routerSSID: upRouter.routerSSID,
            status: upRouter.status,
            assetNumber: upRouter.assetNumber,
            acquisitionDate: handleDateForm(upRouter.acquisitionDate),
            notes: upRouter.notes
        });
    }

    return (
        <EditItem<RouterCreationDTO, RouterDTO>
            url={urlRouters}
            indexUrl="/network/devices"
            transform={transformSwitch}
        >
            {(router, edit, buttons, error) => (
                <FormRouter
                    title='Alterar Roteador'
                    model={router}
                    error={error}
                    buttons={() => buttons('/network/devices/routers/create', router.id ? router.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/network/devices/routers" success={success} text="Roteador alterado com sucesso" />
                </FormRouter>
            )}
        </EditItem>
    );
}

export default EditRouter;