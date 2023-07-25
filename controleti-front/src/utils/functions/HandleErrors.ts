import { UserLogged } from "../../auth/AuthContext";
import ErrorAlert from "../alerts/ErrorAlert";

export default function HandleErrors(errors: any, setUser: (user: UserLogged) => void, setErrors: (error: string) => void): void {
    if (errors.response.status === 401) {
        setUser({
            isAuthenticated: false, id: -1, displayName: '', roles: '', userEmail: '', userName: '' 
        });

        return ;
    }

    if (errors.response.status === 403) {
        return ErrorAlert('Sem Permissão', 'Seu usuário não tem permissão para executar esta função. Contate o administrador do sistema, se preciso!');
    }

    setErrors('');
    return setErrors(errors.response.data);
}