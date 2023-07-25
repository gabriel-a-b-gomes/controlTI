import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { urlRouters } from '../apis/endpoints';
import CreateItem from '../components/items/CreateItem';
import FormNotify from '../formshook/boxes/FormNotify';
import CreatingDeviceSelect from '../shared/devices/CreatingDeviceSelect';
import { handleDateForm } from '../utils/functions/Handles';
import FormRouter from './form/FormRouter';

import { RouterCreationDTO, RouterDTO } from "./models/router.model";

function CreateRouter() {
    document.title = "Cadastrar Roteador";

    const baseState: RouterCreationDTO = {
        code: '',
        location: '',
        brand: '',
        routerIP: '',
        routerMAC: '',
        routerUser: '',
        routerPassword: '',
        routerSSID: '',
        status: 1,
        assetNumber: '',
        acquisitionDate: undefined,
        notes: ''
    }

    const [router, setRouter] = useState<RouterCreationDTO>(baseState);
    const [success, setSuccess] = useState<boolean>(false);

    const selectDevice: ReactElement = (
        <CreatingDeviceSelect display='Roteador' selectStyle='router'>
            <>
            <li><NavLink className="dropdown-item" to="/network/devices/switches/create/">Switch</NavLink></li>
            <li><NavLink className="dropdown-item" to="/network/devices/nodes/create/">Ponto de Rede</NavLink></li>
            </>
        </CreatingDeviceSelect>
    );

    function transformRouter(dupRouter: RouterDTO): void {
        setRouter({
            code: '',
            location: dupRouter.location,
            brand: dupRouter.brand,
            routerIP: dupRouter.routerIP,
            routerMAC: '',
            routerUser: dupRouter.routerUser,
            routerPassword: dupRouter.routerPassword,
            routerSSID: dupRouter.routerSSID,
            status: dupRouter.status,
            assetNumber: '',
            acquisitionDate: handleDateForm(dupRouter.acquisitionDate),
            notes: dupRouter.notes
        });
    }

    return (
        <CreateItem<RouterCreationDTO, RouterDTO>
            url={urlRouters}
            transform={transformRouter}
        >
            {(create, buttons, error) => (
                <FormRouter
                    title='Cadastrar Roteador'
                    model={router}
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
                    <FormNotify listingLink="/network/devices/routers" success={success} text="Roteador cadastrado com sucesso" />
                </FormRouter>
            )}
        </CreateItem>
    );
}

export default CreateRouter;