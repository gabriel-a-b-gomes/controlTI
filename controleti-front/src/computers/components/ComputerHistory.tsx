import { ReactElement, useState } from "react";
import { MdHistory } from "react-icons/md";
import List from "../../components/List";
import HistoryModal from "../../modals/HistoryModal";
import { EmptyList } from "../../utils/EmptyComponents";
import { ComputerLogDTO } from "../models/computer.model";

import '../styles/ComputerHistoryStyles.css';

function ComputerHistory(props: ComputerHistoryProps): ReactElement {
    const [showHistory, setShowHistory] = useState<boolean>(false);

    function handleDate(date: Date | null | undefined) {
        if (date !== null && date !== undefined) {
            const convertedDate = new Date(date);
            return convertedDate.toLocaleDateString('pt-br');
        }

        return "";
    }

    function getClassComputer(status: number, isGood: boolean): string {
        if (status === 0) return 'history disable';

        if (isGood) return 'history good';

        return 'history issues';
    }

    function getTitleComputer(status: number, isGood: boolean): string {
        if (status === 0) return 'Computador Desativado';

        if (isGood) return 'Computador Adequado';

        return 'Computador Fora da Recomendação';
    }

    return (
        <>
            <button type="button" className="history-button" onClick={() => setShowHistory(true)}>
                <MdHistory /><span>Histórico</span>
            </button>

            <HistoryModal title={`Histórico: ${props.code}`} show={showHistory} onHide={() => setShowHistory(false)}>
                <List list={props.logs} emptyList={<EmptyList />}>
                    <table className="table chistory">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Departamento</th>
                                <th>Empresa</th>
                                <th>Colaborador</th>
                                <th>Processador</th>
                                <th>Memória RAM</th>
                                <th>Armazenamento</th>
                                <th>Sist. Op.</th>
                                <th>Perfil de Uso</th>
                                <th>Alterado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.logs && props.logs.map((log, index) => (
                                <tr key={log.id} className={getClassComputer(log.status, log.isGood)} title={getTitleComputer(log.status, log.isGood)}>
                                    <td>{index + 1}</td>
                                    <td>{log.code}</td>
                                    <td>{log.department}</td>
                                    <td>{log.enterprise}</td>
                                    <td>{log.employee}</td>
                                    <td>{log.processingUnit}</td>
                                    <td>{log.memorySize} GB</td>
                                    <td>{log.storageSize} GB ({log.storageType})</td>
                                    <td>{log.operationalSystem}</td>
                                    <td>{log.computerProfile}</td>
                                    <td>{handleDate(log.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </List>
            </HistoryModal>
        </>
    );
}

interface ComputerHistoryProps {
    logs: ComputerLogDTO[];
    code: string;
}

export default ComputerHistory;