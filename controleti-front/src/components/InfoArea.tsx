import { ReactElement, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import List from "./List";
import { LoadingInfo } from "../utils/Loading";

import './styles/InfoArea.css';
import DisplayErrors from "../utils/alerts/DisplayErros";
import { callEndpointAccessToken } from "../apis/callAccessToken";
import HandleErrors from "../utils/functions/HandleErrors";
import { useAuth } from "../auth/AuthContext";

function InfoArea<TInfos>(props: InfoAreaProps<TInfos>) {
    const { setUser } = useAuth();

    const [infos, setInfos] = useState<TInfos | undefined>(undefined);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function loadInfo() {
            axios.get(`${props.infoUrl}/infos`, { headers: { 'Authorization': await callEndpointAccessToken() }, withCredentials: true })
                .then((response: AxiosResponse<TInfos>) => {
                    setInfos(response.data);
                })
                .catch(function (errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        loadInfo();
    }, [props.toggleInfo]);

    return (
        <>
        <div className="info-area">
            <List list={infos} customLoading={<LoadingInfo />}>
                {props.children(infos!)}
            </List>
        </div>
        <DisplayErrors error={error} />
        </>
    );
}

interface InfoAreaProps<TInfo> {
    infoUrl: string;
    toggleInfo: boolean;
    children(infos: TInfo): ReactElement;
}

export default InfoArea;