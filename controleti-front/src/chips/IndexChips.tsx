import { urlChips } from "../apis/endpoints";
import Index from "../components/items/Index";
import InfoArea from "../components/InfoArea";
import { Devices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import BoxIndexChip from "./components/BoxIndexChip";
import { ChipDTO, ChipFilterDTO, InfoChipDTO } from "./models/chip.model";
import FilterChip from "./filter/FilterChip";
import { useState } from "react";

function IndexChips() {
    const chipTab: IDevice = Devices[2]; // Posição 2 - Chip

    const [toggleInfo, setToggleInfo] = useState<boolean>(false);

    const chipFilterModel: ChipFilterDTO = {
        statusFilter: 2,
        typeFilter: 'all',
        deepFilterCellphone: '',
        toCellphoneMemorySize: -1,
        toCellphoneStorageSize: -1,
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined
    };

    const options: SearchModel[] = [
        { display: 'Número', value: 'number', placeholder: 'Digite o número que procura...' },
        { display: 'Departamento', value: 'department', placeholder: 'Digite o departamento que procura...' },
        { display: 'Empresa', value: 'enterprise', placeholder: 'Digite a empresa que procura...' },
        { display: 'Colaborador', value: 'employee', placeholder: 'Digite o colaborador que procura...' },
        { display: 'Conta', value: 'account', placeholder: 'Digite a conta referente ao chip que procura...' },
        { display: 'Código ICCID', value: 'iccid', placeholder: 'Digite o código ICCID que procura...' },
        { display: 'Celular', value: 'cellphone', placeholder: 'Digite o modelo do celular que procura...' },
        { display: 'Ativo', value: 'assetnumber', placeholder: 'Digite o ativo que procura...' }
    ];

    return (
        <>
        <InfoArea<InfoChipDTO> 
            infoUrl={urlChips}
            toggleInfo={toggleInfo}
        >
            {(infos) => (
                <>
                    {infos &&
                        <>
                            <div className="info-item">
                                <label>Quantidade de Chips Ativos</label>
                                <span>{infos.countChipActive}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Chips Parados</label>
                                <div className="detailed">
                                    <span>{infos.countWithoutEmployee}</span>
                                    <p>{Math.round(infos.countWithoutEmployee / infos.countChipActive * 100)}%</p>
                                </div>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Quantidade de Celulares c/ Chips</label>
                                <span>{infos.countChipWithCellphone}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Comprados neste ano</label>
                                <div className="detailed">
                                    <span>{infos.countChipBoughtLastYear}</span>
                                    <p>{Math.round(infos.countChipBoughtLastYear / infos.countChipActive * 100)}%</p>
                                </div>
                            </div>
                        </>
                    }
                </>
            )}
        </InfoArea>
        <Index<ChipDTO, ChipFilterDTO>
            tab={chipTab}
            baseExtra={chipFilterModel}
            options={options}
            toggleRefresh={() => setToggleInfo(!toggleInfo)}
            extraFilterElement={(extra, setExtra) => <FilterChip base={chipFilterModel} model={extra} onSubmit={setExtra} />}
        > 
            {(chips, buttons) => (
                <ul className="list-index">
                    {chips?.map(chip => 
                        <li key={chip.number}>
                            <BoxIndexChip chip={chip} 
                                buttons={buttons(`/chips/${chip.id}/edit`, chip.id, `Tem certeza que deseja deletar o Chip: ${chip.number}?`, 'Excluir Chip')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
        </>
    );
}

export default IndexChips;