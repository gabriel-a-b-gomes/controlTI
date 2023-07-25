import { urlDVRs } from "../apis/endpoints";
import Index from "../components/items/Index";
import InfoArea from "../components/InfoArea";
import { Devices } from "../shared/devices/Devices";
import { IDevice } from "../shared/devices/devices.model";
import { SearchModel } from "../shared/search-input/search.model";
import BoxIndexDVR from "./components/BoxIndexDVR";
import { DVRDTO, DVRFilterDTO, DVRInfoDTO } from "./models/dvr.model";
import FilterDVR from "./filter/FilterDVR";
import { useState } from "react";

function IndexDVRs() {
    const dvrTab: IDevice = Devices[3]; // Posição 3 - DVR

    const [toggleInfo, setToggleInfo] = useState<boolean>(false);

    const dvrFilterModel: DVRFilterDTO = {
        statusFilter: 2,
        hasBalun: 0,
        toHdSize: -1,
        toChannels: -1,
        fromActiveCams: undefined,
        toActiveCams: undefined,
        fromAcquisitionDate: undefined,
        toAcquisitionDate: undefined,
        fromLastPreventive: undefined,
        toLastPreventive: undefined
    };

    const options: SearchModel[] = [
        { display: 'Código', value: 'code', placeholder: 'Digite o código que procura...' },
        { display: 'Localização', value: 'location', placeholder: 'Digite a localização que procura...' },
        { display: 'Marca', value: 'brand', placeholder: 'Digite a marca que procura...' },
        { display: 'IP', value: 'dvrIP', placeholder: '000.000.000.000' },
        { display: 'Porta', value: 'dvrPort', placeholder: '00000...' },
        { display: 'Modelo', value: 'model', placeholder: 'Digite o modelo do aparelho que procura...' },
        { display: 'Usuário', value: 'dvrUser', placeholder: 'Digite o usuário do DVR que procura...' },
        { display: 'Senha', value: 'dvrPassword', placeholder: 'Digite a senha do DVR que procura...' },
        { display: 'Ativo', value: 'assetNumber', placeholder: 'Digite o ativo que procura...' }
    ];

    return (
        <>
        <InfoArea<DVRInfoDTO>
            infoUrl={urlDVRs}
            toggleInfo={toggleInfo} 
        >
            {(infos) => (
                <>
                {infos &&
                    <>
                        <div className="info-item">
                            <label>Número de DVRs Ativos</label>
                            <div className="detailed">
                                <span>{infos.countDVR}</span>
                                {infos.countDVRFull > 0 && <p>{infos.countDVRFull} Cheio</p>}
                            </div>
                        </div>
                        <div className="divisor" />
                        <div className="info-item">
                            <label>Número de Canais</label>
                            <span>{infos.countChannels}</span>
                        </div>
                        <div className="divisor" />
                        <div className="info-item">
                            <label>Canais Livres</label>
                            <div className="detailed">
                                <span>{infos.countFreeChannels}</span>
                                <p>{Math.round(infos.countFreeChannels / infos.countChannels * 100)}%</p>
                            </div>
                        </div>
                        <div className="divisor" />
                        <div className="info-item">
                            <label>Câmeras Instaladas</label>
                            <span>{infos.countCams}</span>
                        </div>
                    </>
                }
                </>
            )}
        </InfoArea>
        <Index<DVRDTO, DVRFilterDTO>
            tab={dvrTab}
            baseExtra={dvrFilterModel}
            options={options}
            toggleRefresh={() => setToggleInfo(!toggleInfo)}
            extraFilterElement={(extra, setExtra) => <FilterDVR base={dvrFilterModel} model={extra} onSubmit={setExtra} />}
        >
            {(dvrs, buttons) => (
                <ul className="list-index">
                    {dvrs?.map(dvr => 
                        <li key={dvr.code}>
                            <BoxIndexDVR 
                                dvr={dvr}
                                buttons={buttons(`/dvrs/${dvr.id}/edit`, dvr.id, `Tem certeza que deseja deletar o DVR: ${dvr.code}?`, 'Excluir DVR')}
                            />
                        </li>    
                    )}
                </ul>
            )}
        </Index>
        </>
    );
}

export default IndexDVRs;