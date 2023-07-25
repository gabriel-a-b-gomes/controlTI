import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlAuth } from '../apis/endpoints';
import LoadingAuth from './LoadingAuth';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

export interface UserLogged {
    isAuthenticated: boolean;
    id: number;
    displayName: string;
    userName: string;
    userEmail: string;
    roles: string;
}

interface AuthContextType {
    login: () => void;
    logout: () => void;
    setUser: (user: UserLogged) => void;
    user: UserLogged;
}

export const AuthContext = createContext<AuthContextType>({ 
    login: () => {},
    logout: () => {},
    setUser: ({}) => {},
    user: { isAuthenticated: false, id: 0, displayName: '', roles: '', userEmail: '', userName: '' }
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider(props: { children: ReactNode }) {
    const { instance } = useMsal();
    const isAuth = useIsAuthenticated();

    const [user, setUser] = useState<UserLogged>({ isAuthenticated: false, id: 0, displayName: '', roles: '', userEmail: '', userName: '' });
    const [loading, setLoading] = useState<boolean>(true);

    async function assertUserInfo() {
        if (isAuth) {
            setLoading(true);
            console.log(urlAuth);
            await axios.get(`${urlAuth}`)
                .then((response: AxiosResponse<UserLogged>) => {
                    const userAuth: UserLogged = response.data;

                    setUser({
                        isAuthenticated: true,
                        id: userAuth.id,
                        displayName: userAuth.displayName,
                        userEmail: userAuth.userEmail,
                        userName: userAuth.userName,
                        roles: userAuth.roles
                    });
                    setLoading(false);
                })
                .catch(function(err) {
                    setUser({ isAuthenticated: false, id: -1, displayName: '', roles: '', userEmail: '', userName: '' });
                    setLoading(false);
                });
        } else {
            setLoading(false)
        }
            
    } 

    useEffect(() => {
        assertUserInfo();
    }, [isAuth, instance.getActiveAccount()?.username]);


    function login() {
        instance.loginRedirect({
            ...loginRequest,
            redirectUri: 'http://localhost:3000/'
        });
    }
    
    function logout() {
        instance.logoutRedirect();
    }

    return (
        <AuthContext.Provider value={{
            login, logout, user, setUser
        }}>
            {!loading && user.id !== 0 ? props.children : <LoadingAuth />}
        </AuthContext.Provider>
    );
}
