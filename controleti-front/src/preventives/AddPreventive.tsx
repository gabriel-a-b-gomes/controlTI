import axios, { AxiosResponse } from "axios";
import FormPreventive from "./form/FormPreventives";
import { PreventiveCreationDTO } from "./models/preventive.model";
import HandleErrors from "../utils/functions/HandleErrors";
import { useAuth } from "../auth/AuthContext";

function AddPreventive(props: AddPreventiveProps) {
    const { setUser } = useAuth();

    async function createPreventive(newPreventive: PreventiveCreationDTO): Promise<number> {
        const status = await axios.post(`${props.url}/preventive`, newPreventive)
            .then((response: AxiosResponse) => {
                props.setError("");
                return response.status;
            }).catch(function (errors) {
                HandleErrors(errors, setUser, props.setError);

                return errors.response.status;
            });

        return status;
    }

    return (
        <FormPreventive
            modelPreventive={props.model}
            onSubmit={async (data) => {
                const status = await createPreventive(data);

                if (status === 200)
                    props.refresh();
                else 
                    props.setError("Algo de errado ocorreu.");
            }}
        />
    );
}

interface AddPreventiveProps {
    url: string;
    model: PreventiveCreationDTO;
    refresh: () => void;
    setError(error: string): void;
}

export default AddPreventive;