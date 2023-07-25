import axios, { AxiosResponse } from "axios";
import { PaginationDTO } from "../../utils/pagination/pagination.model";
import { ItemsPreventive } from "../models/preventive.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

export default async function filterPreventive<T>(
    url: string, 
    area: string,
    searches: string[],
    paginate: PaginationDTO,
    setItems: (items: ItemsPreventive<T>) => void,
    setUser: (user: UserLogged) => void,
    setErrors: (errors: string) => void
) {
    axios.post(`${url}/preventives/${area}/filter`, { searches: searches, paginate })
        .then((response: AxiosResponse<T[]>) => {
            const totalAmountOfRecords = parseInt(response.headers["totalamountofrecords"], 10);

            setItems({
                items: response.data,
                pages: Math.ceil(Math.ceil(totalAmountOfRecords / paginate.recordsPerPage)),
            });
        })
        .catch(function(errors) {
            HandleErrors(errors, setUser, setErrors);
        });
}