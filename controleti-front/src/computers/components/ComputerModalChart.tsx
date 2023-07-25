import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import List from "../../components/List";
import ReportModal from "../../modals/ReportModal";
import { AiOutlineBarChart } from "react-icons/ai";
import axios, { AxiosResponse } from "axios";
import { urlComputers } from "../../apis/endpoints";
import { useAuth } from "../../auth/AuthContext";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import HandleErrors from "../../utils/functions/HandleErrors";

import '../styles/ComputerChart.css';
import { SearchDTO } from "../../shared/search-input/search.model";
import { ComputerFilterDTO } from "../models/computer.model";

interface ITooltip {
    computers: string;
    desc: string;
}
interface IChart {
    name: string;
    desc: string;
    qtde: number;
    computers: string[];
}

interface ComputerModalChartDTO {
    memory: IChart;
    type: IChart;
    storageSize: IChart;
    so: IChart;
    processor: IChart;
}

interface ComputerModalChartProps {
    searches: SearchDTO[];
    extra: ComputerFilterDTO | null;
    pagination: { page: number; recordsPerPage: number; }
}

function ComputerModalChart(props: ComputerModalChartProps) {
    const { setUser } = useAuth();

    const [show, setShow] = useState<boolean>(false);
    const [response, setResponse] = useState<ComputerModalChartDTO>();
    const [data, setData] = useState<IChart[]>();

    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        function getChart() {
            axios.post(`${urlComputers}/chart`, { searches: props.searches, extra: props.extra, paginate: props.pagination })
                .then((res: AxiosResponse<ComputerModalChartDTO>) => {
                    setErrors("");

                    setResponse(res.data);

                    let nData: IChart[] = [];
                    nData.push(res.data.memory);
                    nData.push(res.data.type);
                    nData.push(res.data.storageSize);
                    nData.push(res.data.so);
                    nData.push(res.data.processor);

                    setData(nData);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getChart();
    }, [props.searches.length, props.extra]);

    function getComputers(label: string): ITooltip {
        let tipComputers: string = "";
        let desc: string = "";

        let computers: string[] | undefined = [];

        switch(label) {
            case 'Memória':
                computers = response?.memory.computers;
                desc = response?.memory.desc!;
                break;
            case 'Armazen.':
                computers = response?.type.computers;
                desc = response?.type.desc!;
                break;
            case 'Tamanho de Armaz.':
                computers = response?.storageSize.computers;
                desc = response?.storageSize.desc!;
                break;
            case 'SO':
                computers = response?.so.computers;
                desc = response?.so.desc!;
                break;
            case 'Processador':
                computers = response?.processor.computers;
                desc = response?.processor.desc!;
                break;
            default:
        }

        if (computers) {
            tipComputers = computers.join(", ");
        }

        return { computers: tipComputers, desc: desc };
    }

    function BarChartTooltip({ active, payload, label }: any) {
        const tooltipFill: ITooltip = getComputers(label);

        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
              <p className="info">{tooltipFill.desc}</p>
              {tooltipFill.computers.length > 0 && <p className="desc">Computadores: {tooltipFill.computers}</p>}
            </div>
          );
        }
        return null;
    };

    return (
        <>
            <button className="computer-chart-modal" onClick={() => setShow(true)}><AiOutlineBarChart />Visualize as necessidades dos computadores</button>
            <ReportModal title="Computadores inadequados" size="lg" show={show} onHide={() => setShow(false)} icon={<AiOutlineBarChart size={24} />}>
                <>
                <List list={data}>
                    <ResponsiveContainer height={250}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<BarChartTooltip />} />
                            <Legend />
                            <Bar dataKey="qtde" fill="#db2323" />
                        </BarChart>
                    </ResponsiveContainer>
                </List>
                <DisplayErrors error={errors} />
                </>
            </ReportModal>
        </>
    );
}

export default ComputerModalChart;