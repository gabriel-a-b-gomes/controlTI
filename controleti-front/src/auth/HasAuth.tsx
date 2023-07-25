import { ReactNode } from 'react';
import { useAuth } from './AuthContext';

function HasAuth(props: HasAuthProps) {
    const { user } = useAuth();

    function canSeeThis(): boolean {
        if (props.premissions.length === 0) return true;

        for (let i = 0; i < props.premissions.length; i++) {
            if (user.roles.includes(props.premissions[i])) return true;
        }

        return false;
    }

    return (
        <>
        {canSeeThis() ?
            props.children
            :
            props.notPermitted
        }
        </>
    );
}

interface HasAuthProps {
    premissions: string[];
    notPermitted?: ReactNode;
    children: ReactNode; 
}

export default HasAuth;