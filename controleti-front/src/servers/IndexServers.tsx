import { useState } from "react";

import Index from "../components/items/Index";
import { Servers } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import { InfoServerDTO, ServerFilterDTO, ServerHostDTO } from "./models/host.model";

import './styles/ServerStyles.css';
import FilterServer from "./filter/FilterServer";
import BoxIndexHost from "./components/BoxIndexHost";
import InfoArea from "../components/InfoArea";
import { urlHosts } from "../apis/endpoints";
import { StatusFilter } from "../utils/enums/Enums";

function IndexServers() {
    const hostTab: IDevice = Servers[0];
    const vmTab: IDevice = Servers[1];

    const [toggleInfo, setToggleInfo] = useState<boolean>(false);

    const hostFilterModel: ServerFilterDTO = {
        hostFunctionality: 0,
        vmFunctionality: 0,
        statusFilter: StatusFilter.Todos,
        fromAcquisionDate: undefined,
        toAcquisitionDate: undefined,
        fromLastPreventive: undefined,
        toLastPreventive: undefined,
        fromMemorySize: undefined,
        toMemorySize: undefined,
        fromStorageSize: undefined,
        toStorageSize: undefined
    };

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código do host que procura...' },
        { display: 'Máquina Virtual', value: 'virtualmachine', placeholder: 'Digite o código da máquina virtual que procura...' },
        { display: 'Modelo', value: 'model', placeholder: 'Digite o modelo do host que procura...' },
        { display: 'Marca', value: 'brand', placeholder: 'Digite a marca do host que procura...' },
        { display: 'Processador', value: 'processor', placeholder: 'Digite o processador do host que procura...' },
        { display: 'Memória', value: 'memory', placeholder: 'Digite o modelo de memória do host que procura...' },
        { display: 'Armazenamento', value: 'storage', placeholder: 'Digite o marca de armazen. do host que procura...' },
        { display: 'Sist. Operacional', value: 'operationalsystem', placeholder: 'Digite o sist. operacional que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo do host que procura...' }
    ];



    return (
        <>
        <InfoArea<InfoServerDTO>
            infoUrl={urlHosts}
            toggleInfo={toggleInfo}
        >
            {(infos) => (
                <>
                {infos &&
                    <>
                        <div className="info-item">
                            <label>Servidores Hosts Ativos</label>
                            <span>{infos.hostQtde}</span>
                        </div>
                        <div className="divisor" />
                        <div className="info-item">
                            <label>Máquinas Virtuais Ativas</label>
                            <span>{infos.vmQtde}</span>
                        </div>
                        <div className="divisor" />
                        <div className="info-item">
                            <label>Preventivas a Fazer</label>
                            <div className="detailed">
                                <span>{infos.preventivesTodo}</span>
                                {infos.hostQtde > 0 && <p>{Math.round(infos.preventivesTodo / infos.hostQtde * 100)}%</p>}
                            </div>
                        </div>
                        <div className="divisor" />
                        <div className="info-item">
                            <label>VM's Formatadas Este Ano</label>
                            <div className="detailed">
                                <span>{infos.vmsSetupThisYear}</span>
                                {infos.vmQtde > 0 && <p>{Math.round(infos.vmsSetupThisYear / infos.vmQtde * 100)}%</p>}
                            </div>
                        </div>
                    </>
                }
                </>
            )}
        </InfoArea>
        <Index<ServerHostDTO, ServerFilterDTO>
            tab={hostTab}
            tabChild={vmTab}
            baseExtra={hostFilterModel}
            customNewRedirect="/servers/create"
            options={options}
            toggleRefresh={() => setToggleInfo(prev => !prev)}
            extraFilterElement={(extra, setExtra) => <FilterServer base={hostFilterModel} extra={extra} onSubmit={setExtra} />}
        >
            {(hosts, buttons, buttonsVMs) => (
                <ul className="list-index">
                    {hosts?.map(host => 
                        <li key={host.code}>
                            <BoxIndexHost host={host} 
                                buttons={buttons(`/servers/hosts/${host.id}/edit`, host.id, `Tem certeza que deseja deletar o Servidor Host: ${host.code}?`, 'Excluir Servidor Host')}
                                buttonsVirtualMachines={(vmId, vmCode) => 
                                    buttonsVMs(`/servers/vms/${vmId}/edit`, vmId, `Tem certeza que deseja deletar a Máquina Virtual: ${vmCode}?`, 'Excluir Máquina Virtual')
                                }
                            />
                        </li>  
                    )}
                </ul>
            )}
        </Index>
        </>
    );
}

export default IndexServers;