import { useEffect, useState } from 'react';

import { Devices } from "../../shared/devices/Devices";
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

import '../styles/HomeChartStyles.css';
import { useNavigate } from "react-router-dom";
import { urlHome } from '../../apis/endpoints';
import axios, { AxiosResponse } from 'axios';
import List from '../../components/List';
import { useAuth } from '../../auth/AuthContext';
import HandleErrors from '../../utils/functions/HandleErrors';
import DisplayErrors from '../../utils/alerts/DisplayErros';

function HistoryChart() {
  const { setUser } = useAuth();

  const [reportItems, setReportItems] = useState<ReportIsGood[]>();
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    async function getReportIsGood() {
      axios.get(`${urlHome}/report`)
          .then((response: AxiosResponse<ReportIsGood[]>) => {
              setReportItems(response.data);
          })
          .catch(function (errors) {
              HandleErrors(errors, setUser, setErrors);
          });
    }

    getReportIsGood();
  }, [setUser]);

  const navigate = useNavigate();

  function handleGoToComputers() {
      navigate('/computers');
  }

  return (
      <div className='home-chart' onClick={handleGoToComputers} title="Clique para ir para computadores">
          <div className="home-chart-title">
              <h3>Computadores Adequados x Inadequados</h3>
              {Devices[0].icon}
          </div>
          <List list={reportItems}>
            <ResponsiveContainer width={"95%"} height={"82%"}>
              <LineChart data={reportItems!}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" interval="preserveEnd" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="inadequado" stroke="rgb(242, 59, 59)" fillOpacity={1} fill="url(#colorInadequado)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="adequado" stroke="#dfbc54" fillOpacity={1} fill="url(#colorAdequado)" />
              </LineChart>
            </ResponsiveContainer>
          </List>
          <DisplayErrors error={errors} />
      </div>
  );
}

interface ReportIsGood {
  data: string;
  adequado: string;
  inadequado: string;
}

export default HistoryChart;