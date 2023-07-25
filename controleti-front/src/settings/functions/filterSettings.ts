import axios, { AxiosResponse } from "axios";
import { SearchDTO } from "../../shared/search-input/search.model";
import { PaginationDTO } from "../../utils/pagination/pagination.model";
import HandleErrors from "../../utils/functions/HandleErrors";
import { UserLogged } from "../../auth/AuthContext";

async function filterSettings<TSetting>(
    url: string,
    paginate: PaginationDTO,
    searches: SearchDTO[],
    setAmountPages: (amount: number) => void,
    setItems: (newItems: TSetting[]) => void,
    setUser: (user: UserLogged) => void,
    setError: (error: string) => void
) {
    axios.post(`${url}/filter`, { 
        searches: searches, paginate: paginate
    })
        .then((response: AxiosResponse<TSetting[]>) => {
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
            setAmountPages(Math.ceil(totalAmountOfRecords / paginate.recordsPerPage));
            setItems(response.data);
        })
        .catch(function (errors) {
            HandleErrors(errors, setUser, setError);
        });
}

export default filterSettings;