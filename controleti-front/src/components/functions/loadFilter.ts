import axios, { AxiosResponse } from "axios";
import { SearchDTO } from "../../shared/search-input/search.model";
import { IndexAction } from "../models/enums";
import { IndexDTO } from "../models/index.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

export async function loadFilter<T, TFilter>(
    url: string, page: number, recordsPerPage: number,
    searches: SearchDTO[], extra: TFilter | null,
    setItems: (response: IndexDTO<T>) => void,
    setUser: (user: UserLogged) => void,
    setErrors: (errors: string) => void
): Promise<void> {
    axios.post(`${url}/filter`, 
        { searches: searches, extra: extra, paginate: { page: page, recordsPerPage: recordsPerPage } },
        { 
            headers: { 'Access-Control-Expose-Headers': '*' }
        })
        .then((response: AxiosResponse<T[]>) => {
            const totalAmountOfRecords = parseInt(response.headers["totalamountofrecords"], 10);

            setItems({
                items: response.data,
                totalAmount: Math.ceil(Math.ceil(totalAmountOfRecords / recordsPerPage)),
                action: IndexAction.filtering
            });
        })
        .catch(function(errors) {
            HandleErrors(errors, setUser, setErrors);
        });
}