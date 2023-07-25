import { ReactNode } from "react";
import NotAllowed from "./NotAllowed";
import { useAuth } from "./AuthContext";

function AuthenticatedRoute(props: AuthenticatedRouteProps) {
    const { user } = useAuth();

    function isAuthToSee() {
        if (!props.roles || props.roles.length === 0) return true;

        for (let i = 0; i < props.roles.length; i++)
            if (user.roles.includes(props.roles[i])) return true;
        
        return false;
    }

    return (
        <>
        {isAuthToSee() ?
            props.children
            :
            <NotAllowed />
        }
        </>
    );
}

interface AuthenticatedRouteProps {
    roles?: string[];
    children: ReactNode;
}

export default AuthenticatedRoute;