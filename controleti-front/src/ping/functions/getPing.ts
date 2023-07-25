import axios, { AxiosResponse } from "axios";
import { PingDTO } from "../models/ping.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

export default async function getPing(
    pingUrl: string, 
    search: string,
    setItems: (items: PingDTO[]) => void,
    setUser: (user: UserLogged) => void,
    setLoading: (loading: boolean) => void,
    setErrors: (errors: string) => void
) {
    axios.get(`${pingUrl}?search=${search}`)
        .then((response: AxiosResponse<PingDTO[]>) => {
            setItems(response.data);
            setLoading(false);
        })
        .catch(function(errors) {
            HandleErrors(errors, setUser, setErrors);
        });
}