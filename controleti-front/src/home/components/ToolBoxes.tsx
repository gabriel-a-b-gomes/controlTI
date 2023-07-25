import { BsGearFill } from "react-icons/bs";
import { MdAddBox, MdOutlineSignalWifiStatusbarConnectedNoInternet4, MdSupervisedUserCircle } from "react-icons/md";

import '../styles/HomeBoxStyles.css';
import ToolBox from "./ToolBox";

const colors = {
    network: '#F09B1A',
    employees: '#885AC3',
    creation: 'rgba(249, 59, 59, 1)',
    setting: '#17ebc4'
}

function ToolBoxes() {
    return (
        <div className="tool-boxes">
            <ToolBox link="/network/ping" color={colors.network} icon={<MdOutlineSignalWifiStatusbarConnectedNoInternet4 />} hint="Pingar os Equipamentos" />
            <ToolBox link="/employees" color={colors.employees} icon={<MdSupervisedUserCircle />} hint="Colaboradores" />
            <ToolBox link="/devices/create/" color={colors.creation} icon={<MdAddBox />} hint="Cadastrar equipamento" />
            <ToolBox link="/settings" color={colors.setting} icon={<BsGearFill />} hint="Configurações" />
        </div>
    );
}

export default ToolBoxes;