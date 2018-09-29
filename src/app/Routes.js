import Login from "../app/modules/login/Login";
import Home from "../app/modules/home/Home";
import Send from "../app/modules/send/Send";
import AdminCP from "./modules/admincp/AdminCP";

export default [
    {
        path: "/home",
        title: "Home",
        component: Home,
    },
    {
        path: "/login",
        title: "Login",
        component: Login,
    },
    {
        path: "/send",
        title: "Send",
        component: Send,
    },
    {
        path: "/admin-cp",
        title: "Admin CP",
        component: AdminCP,
    },
];
