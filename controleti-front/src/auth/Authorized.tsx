import { ReactNode } from "react";
import { useAuth } from "./AuthContext";

function Authorized(props: AuthorizedProps) {
    const { user } = useAuth();

    return (
        <>
        {user.isAuthenticated || user.id >= 0 ?
                props.authorize
            : 
                props.unAuthorize
        }
        </>
    );
}

interface AuthorizedProps {
    authorize: ReactNode;
    unAuthorize: ReactNode;
}

export default Authorized;