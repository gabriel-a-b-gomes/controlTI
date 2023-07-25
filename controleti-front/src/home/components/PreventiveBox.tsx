import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { RiToolsFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { urlHome } from '../../apis/endpoints';
import List from '../../components/List';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import { LoadingHomeSide } from '../../utils/Loading';

import '../styles/PreventiveBoxStyles.css';
import { useAuth } from '../../auth/AuthContext';
import HandleErrors from '../../utils/functions/HandleErrors';

function PreventiveBox() {
    const { setUser } = useAuth();

    const navigate = useNavigate();

    const [preventives, setPreventives] = useState<PreventiveIndicator[]>();
    const [errors, setErrors] = useState<string>('');
    const [listClass, setListClass] = useState<string>('');

    useEffect(() => {
        function getPreventivesHome() {
            axios.get(`${urlHome}/preventives`)
                .then((response: AxiosResponse<PreventiveIndicator[]>) => {
                    setPreventives(response.data);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        }

        getPreventivesHome();
    }, [setUser]);

    useEffect(() => {
        if (preventives && preventives.length > 4) {
            setListClass('scroll');
        }
    }, [preventives]);

    function handleGoToPreventives() {
        navigate('/preventives');
    }

    return(
        <>
        <div className="preventives-overview-container" title='Clique para ir para preventivas' onClick={handleGoToPreventives}>
            <div className="preventives-box-title">
                Preventivas
                <RiToolsFill />
            </div>
            <List list={preventives} customLoading={<LoadingHomeSide />}>
                <ul className={"preventives-box-list " + listClass}>
                    {preventives?.map((preventive, key) =>
                        preventive.totalPreventives > 0 &&
                            <li key={preventive.departmentDescription + key}>
                                <div className='preventive-area-info'>
                                    <div className='preventive-area-depart'>
                                        {preventive.departmentDescription}
                                        <span>{preventive.departmentEnterprise}</span>
                                    </div>
                                    <span className='preventive-porcentege'>{Math.floor(preventive.totalPreventivesDone / preventive.totalPreventives * 100)}%</span>
                                </div>
                                <div className='preventive-progress'>
                                    <div style={{ width: `${preventive.totalPreventivesDone / preventive.totalPreventives * 100}%` }} />
                                </div>
                            </li>
                    )}
                </ul>
            </List>
        </div>
        <DisplayErrors error={errors} />
        </>
    );
}

interface PreventiveIndicator {
    departmentDescription: string;
    departmentEnterprise: string;
    totalPreventivesDone: number;
    totalPreventives: number;
}

export default PreventiveBox;