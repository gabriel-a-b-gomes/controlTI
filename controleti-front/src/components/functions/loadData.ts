import axios, { AxiosResponse } from "axios";
import { IndexAction } from "../models/enums";
import { IndexDTO } from "../models/index.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

export async function loadData<T>(
    url: string, page: number, recordsPerPage: number, 
    setItems: (response: IndexDTO<T>) => void,
    setUser: (user: UserLogged) => void,
    setErrors: (errors: string) => void
): Promise<void> {
    axios.get(`${url}?Page=${page}&RecordsPerPage=${recordsPerPage}`, { 
        headers: { 'Access-Control-Expose-Headers': '*' }
    })
        .then((response: AxiosResponse<T[]>) => {
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);

            setItems({
                items: response.data,
                totalAmount: Math.ceil(Math.ceil(totalAmountOfRecords / recordsPerPage)),
                action: IndexAction.loading
            });
        })
        .catch(function (errors) {
            HandleErrors(errors, setUser, setErrors);
        });
}