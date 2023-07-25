import './App.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Menu from './shared/menu/Menu';
import { authRoutes, routes } from './shared/menu/routes-config';
import { AuthProvider } from './auth/AuthContext';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import { CustomNavigationClient } from './auth/NavigationClient';
import { msalInstance } from '.';
import NotAuthenticated from './auth/NotAuthenticated';
import Authorized from './auth/Authorized';
import AuthenticatedRoute from './auth/AuthenticatedRoute';


function App() {
  const history = useNavigate();
  const navigationClient = new CustomNavigationClient(history);
  msalInstance.setNavigationClient(navigationClient);

  return (
    <>
        <AuthenticatedTemplate>
            <AuthProvider>
                <Authorized
                    authorize={
                        <Routes>
                            <Route element={
                                <>
                                    <Menu />
                                    <div className='app'>
                                        <Outlet />
                                    </div>
                                </>
                            }>
                            {routes.map(route => (
                                <Route key={route.path} 
                                    path={route.path} 
                                    element={
                                        <AuthenticatedRoute roles={route.roles}>
                                        <route.component />
                                        </AuthenticatedRoute>
                                    }
                                />  
                                
                            ))}
                            </Route>
                        </Routes>
                    }
                    unAuthorize={<NotAuthenticated />}
                />
            </AuthProvider>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <Routes>
                {authRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.component />} />
                )}
            </Routes>
        </UnauthenticatedTemplate>
    </>
  );
}

export default App;
