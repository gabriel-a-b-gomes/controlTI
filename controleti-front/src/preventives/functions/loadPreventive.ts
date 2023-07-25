import axios, { AxiosResponse } from "axios";
import { PaginationDTO } from "../../utils/pagination/pagination.model";
import { ItemsPreventive } from "../models/preventive.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

export default async function loadPreventive<T>(
    url: string,
    area: string,
    paginate: PaginationDTO,
    setItems: (items: ItemsPreventive<T>) => void,
    setUser: (user: UserLogged) => void,
    setErrors: (errors: string) => void
) {
    axios.get(`${url}/preventives/${area}?Page=${paginate.page}&RecordsPerPage=${paginate.recordsPerPage}`, { 
        headers: { 'Access-Control-Expose-Headers': '*' }
    })
        .then((response: AxiosResponse<T[]>) => {
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);

            setItems({
                items: response.data,
                pages: Math.ceil(Math.ceil(totalAmountOfRecords / paginate.recordsPerPage)),
            });
        })
        .catch(function (errors) {
            HandleErrors(errors, setUser, setErrors);
        });
}