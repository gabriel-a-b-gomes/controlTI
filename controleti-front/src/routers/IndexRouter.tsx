import Index from "../components/items/Index";
import { NetworkDevices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import BoxIndexRouter from "./components/BoxIndexRouter";
import FilterRouter from "./filter/FilterRouter";
import { RouterDTO, RouterFilterDTO } from "./models/router.model";

function IndexRouter(props: { toggleRefresh: () => void }) {
    const routerTab: IDevice = NetworkDevices[0]; // Posição 1 - Switch

    const routerFilterModel: RouterFilterDTO = {
        statusFilter: 2,
        routerSSID: "all",
        routerIp: "",
        routerUser: "",
        routerPassword: "",
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined
    }

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código que procura...' },
        { display: 'Localização', value: 'location', placeholder: 'Digite o local da impressora que procura...' },
        { display: 'Marca', value: 'brand', placeholder: 'Digite a marca que procura...' },
        { display: 'MAC', value: 'routermac', placeholder: 'Digite o MAC do roteador que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo que procura...' }
    ];
    
    return (
        <Index<RouterDTO, RouterFilterDTO>
            tab={routerTab}
            baseExtra={routerFilterModel}
            options={options}
            toggleRefresh={props.toggleRefresh}
            extraFilterElement={(extra, setExtra) => <FilterRouter base={routerFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(routers, buttons) => (
                <ul className="list-index">
                    {routers?.map(router => 
                        <li key={router.code}>
                            <BoxIndexRouter router={router} 
                                buttons={buttons(`/network/devices/routers/${router.id}/edit`, router.id, `Tem certeza que deseja deletar o Roteador: ${router.code}?`, 'Excluir Roteador')}
                            />
                        </li>  
                    )}
                </ul>
            )}
        </Index>
    );
}

export default IndexRouter;