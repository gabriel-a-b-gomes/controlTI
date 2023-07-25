import { urlComputers } from "../apis/endpoints";
import Index from "../components/items/Index";
import InfoArea from "../components/InfoArea";
import { Devices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import { ComputerClassification, ComputerTypeFilter, StatusFilter } from "../utils/enums/Enums";
import { LoadingFilter } from "../utils/Loading";
import BoxIndexComputer from "./components/BoxIndexComputer";
import { ComputerDTO, ComputerFilterDTO, InfoComputerDTO } from "./models/computer.model";
import FilterComputer from "./filter/FilterComputer";
import { useState } from "react";
import ComputerModalChart from "./components/ComputerModalChart";

function IndexComputers() {
    const computerTab: IDevice = Devices[0]; // Posição 0 - Computador

    const [toggleInfo, setToggleInfo] = useState<boolean>(false);

    const computerFilterModel: ComputerFilterDTO = {
        classification: ComputerClassification.Todos,
        statusFilter: StatusFilter.Todos,
        computerTypeFilter: ComputerTypeFilter.Todos,
        profileFilter: 0,
        storageTypeFilter: 'ALL',
        fromStorageSize: undefined,
        toStorageSize: undefined,
        fromMemorySize: undefined, 
        toMemorySize: undefined,
        fromLastPreventive: undefined,
        toLastPreventive: undefined,
    }

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código que procura...' },
        { display: 'Departamento', value: 'department', placeholder: 'Digite o departamento que procura...' },
        { display: 'Empresa', value: 'enterprise', placeholder: 'Digite a empresa que procura...' },
        { display: 'Colaborador', value: 'employee', placeholder: 'Digite o colaborador que procura...' },
        { display: 'Memória', value: 'memory', placeholder: 'Digite o modelo da memória que procura...' },
        { display: 'Armazenamento', value: 'storage', placeholder: 'Digite a marca do armazen. que procura...' },
        { display: 'Processador', value: 'processor', placeholder: 'Digite o modelo do processador que procura...' },
        { display: 'Sist. Operacional', value: 'operationalsystem', placeholder: 'Digite o sistema operacional que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo que procura...' }
    ];

    return (
        <>
            <InfoArea<InfoComputerDTO>
                infoUrl={urlComputers}
                toggleInfo={toggleInfo}
            >
                {(infos) => (
                    <>
                    {infos &&
                        <>
                            <div className="info-item">
                                <label>Quantidade de Computadores</label>
                                <span>{infos.countComputer}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Notebooks</label>
                                <span>{infos.countNotebook}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Preventivas a Fazer</label>
                                <div className="detailed">
                                    <span>{infos.countPreventives}</span>
                                    <p>{Math.round(infos.countPreventives / infos.countComputer * 100)}%</p>
                                </div>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Fora do Recomendável</label>
                                <div className="detailed">
                                    <span>{infos.countIsNotGood}</span>
                                    <p>{Math.round(infos.countIsNotGood / infos.countComputer * 100)}%</p>
                                </div>
                            </div>
                        </>
                    }
                    </>
                )}
            </InfoArea>
            <Index<ComputerDTO, ComputerFilterDTO>
                tab={computerTab}
                baseExtra={computerFilterModel}
                options={options}
                headerOptions={(searches, extra, pagination) => <ComputerModalChart searches={searches} extra={extra} pagination={pagination} />}
                toggleRefresh={() => setToggleInfo(!toggleInfo)}
                extraFilterElement={(extra, setExtra) => extra ? <FilterComputer base={computerFilterModel} extra={extra} onSubmit={setExtra} /> : <LoadingFilter /> }
            >
                {(computers, buttons) => (
                    <ul className="list-index">
                        {computers?.map(computer => (
                            <li key={computer.code}>
                                <BoxIndexComputer
                                    computer={computer}
                                    buttons={buttons(`/computers/${computer.id}/edit`, computer.id, `Tem certeza que deseja deletar o Computador: ${computer.code}?`, 'Excluir Computador')}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </Index>
        </>
    );
}

export default IndexComputers;