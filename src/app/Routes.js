import React from "react";
import Loadable from "react-loadable";

// import Login from "../app/modules/login/Login";
// import Home from "../app/modules/home/Home";
// import Send from "../app/modules/send/Send";
// import AdminCP from "./modules/admincp/AdminCP";
// import MyConfess from "./modules/my-confess/MyConfess";
import withAuthRouteComponent from "./shared/auth/withAuthRouteComponent";

import Loading from "../app/modules/loading/Loading";

const withAuth = withAuthRouteComponent("/login");

const Home = Loadable({
    loader: () =>
        import(/* webpackChunkName: "home" */ "../app/modules/home/Home"),
    loading: () => <Loading />,
    modules: ["home"],
});

const Login = Loadable({
    loader: () =>
        import(/* webpackChunkName: "login" */ "../app/modules/login/Login"),
    loading: () => <Loading />,
    modules: ["login"],
});

const Send = Loadable({
    loader: () =>
        import(/* webpackChunkName: "send" */ "../app/modules/send/Send"),
    loading: () => <Loading />,
    modules: ["login"],
});

const AdminCP = Loadable({
    loader: () =>
        import(/* webpackChunkName: "admincp" */ "../app/modules/admincp/AdminCP"),
    loading: () => <Loading />,
    modules: ["admincp"],
});

const MyConfess = Loadable({
    loader: () =>
        import(/* webpackChunkName: "myconfess" */ "../app/modules/my-confess/MyConfess"),
    loading: () => <Loading />,
    modules: ["myconfess"],
});

export default [
    {
        path: "/",
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
        component: withAuth(AdminCP),
    },
    {
        path: "/my-confess",
        title: "My Confess",
        component: MyConfess,
    },
];
