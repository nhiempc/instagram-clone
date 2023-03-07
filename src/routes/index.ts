// Pages
import Home from '../pages/home';
import Profile from '../pages/user/[username]';
import Login from '../pages/auth/signin';

// Route configs
import routesConfigs from '../configs/routes';

const publicRoutes = [
    { path: routesConfigs.home, component: Home},
    { path: routesConfigs.login, component: Login},
    { path: routesConfigs.profile, component: Profile},
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
