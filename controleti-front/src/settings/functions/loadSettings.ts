import axios, { AxiosResponse } from "axios";
import { PaginationDTO } from "../../utils/pagination/pagination.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

async function loadSettings<TSetting>(
    url: string,
    paginate: PaginationDTO,
    setAmountPages: (amount: number) => void,
    setItems: (newItems: TSetting[]) => void,
    setUser: (user: UserLogged) => void,
    setError: (error: string) => void
) {
    axios.get(`${url}?Page=${paginate.page}&RecordsPerPage=${paginate.recordsPerPage}`)
        .then((response: AxiosResponse<TSetting[]>) => {
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
            setAmountPages(Math.ceil(totalAmountOfRecords / paginate.recordsPerPage));
            setItems(response.data);
        })
        .catch(function (errors) {
            HandleErrors(errors, setUser, setError);
        });
}

export default loadSettings;