import Login from '../app/modules/login/Login';
import Home from '../app/modules/home/Home';

export default [
    {
        path: "/home",
        title: "Home",
        component: Home
    },
    {
        path: "/login",
        title: "Login",
        component: Login
    },
];