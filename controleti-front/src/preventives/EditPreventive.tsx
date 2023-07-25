import axios, { AxiosResponse } from "axios";
import FormPreventive from "./form/FormPreventives";
import { PreventiveCreationDTO } from "./models/preventive.model";
import HandleErrors from "../utils/functions/HandleErrors";
import { useAuth } from "../auth/AuthContext";

function EditPreventive(props: EditPreventiveProps) {
    const { setUser } = useAuth();

    async function editPreventive(newItem: PreventiveCreationDTO): Promise<number> {
        const status = await axios.put(`${props.url}/preventive`, newItem)
            .then((response: AxiosResponse) => {
                props.setError("");
                return response.status;
            }).catch(function (errors) {
                HandleErrors(errors, setUser, props.setError)

                return errors.response.status;
            });

        return status;
    }

    return (
        <FormPreventive
            modelPreventive={props.modelPreventive}
            onSubmit={async (data) => {
                const status = await editPreventive(data);

                if (status === 200) {
                    props.setSuccess();
                    props.refresh();
                } else 
                    props.setError("Algo de errado ocorreu.");
            }}
        />
    );
}

interface EditPreventiveProps {
    url: string;
    modelPreventive: PreventiveCreationDTO;
    refresh: () => void;
    setError(error: string): void;
    setSuccess: () => void;
}

export default EditPreventive;