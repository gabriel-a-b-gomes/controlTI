import { ReactElement, useState } from "react";

import IndexEmployees from "./Indexs/IndexEmployees";
import IndexSkypes from "./Indexs/IndexSkypes";
import IndexVpns from "./Indexs/IndexVpns";

import './styles/EmployeesStyles.css';

import InfoArea from "../components/InfoArea";
import { InfoEmployeeDTO } from "./models/employee.model";
import { urlEmployees } from "../apis/endpoints";

function LandingEmployees() {
    const [selectedTab, setSelectedTab] = useState<string>('employees');
    const [toggleInfo, setToggleInfo] = useState<boolean>(false);

    function getIndexView(selectedTab: string): ReactElement {
        if (selectedTab === 'employees') 
            return <IndexEmployees toggleRefresh={() => setToggleInfo(!toggleInfo)} />;
        if (selectedTab === 'skypes')
            return <IndexSkypes toggleRefresh={() => setToggleInfo(!toggleInfo)} />;
        
        return <IndexVpns toggleRefresh={() => setToggleInfo(!toggleInfo)} />
    }

    return (
        <>
            <InfoArea<InfoEmployeeDTO>
                infoUrl={urlEmployees}
                toggleInfo={toggleInfo}
            >
                {(infos) => (
                    <>
                    {infos &&
                        <>
                            <div className="info-item">
                                <label>Colaboradores Ativos</label>
                                <span>{infos.countEmployeeActive}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Conta de Vpn Ativas</label>
                                <span>{infos.countVpnAccountActive}</span>
                            </div>
                            <div className="divisor" />
                            <div className="info-item">
                                <label>Conta de Skype Ativas</label>
                                <span>{infos.countSkypeAccountActive}</span>
                            </div>
                        </>
                    }
                    </>
                )}
            </InfoArea>
            <div className='navtabs'>
                <button className={selectedTab === 'employees' ? "active" : ""} onClick={() => setSelectedTab('employees')}>Colaboradores</button>
                <button className={selectedTab === 'vpns' ? "active" : ""} onClick={() => setSelectedTab('vpns')}>VPNS</button>
                <button className={selectedTab === 'skypes' ? "active" : ""} onClick={() => setSelectedTab('skypes')}>Skypes</button>
            </div>

            {getIndexView(selectedTab)}
        </>
    );
}


export default LandingEmployees;