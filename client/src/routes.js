import Users from './pages/Users';
import { USERS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/consts';
import Auth from './pages/Auth';

export const publicRoutes = [
    {
        path: USERS_ROUTE,
        Component: Users,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
]