import React from "react";
import Loadable from "react-loadable";

import withAuthRouteComponent from "./shared/auth/withAuthRouteComponent";

import Loading from "./modules/loading/Loading";

const withAuth = withAuthRouteComponent("/login");

const Home = Loadable({
    loader: () =>
        import(/* webpackChunkName: "home" */ "../app/modules/home/Home"),
    loading: () => <Loading />,
    modules: ["../app/modules/home/Home"],
    webpack: () => [require.resolveWeak("../app/modules/home/Home")],
});

const Home_Post = Loadable({
    loader: () =>
        import(/* webpackChunkName: "home_post" */ "../app/modules/home/Post"),
    loading: () => <Loading />,
    modules: ["../app/modules/home/Post"],
    webpack: () => [require.resolveWeak("../app/modules/home/Post")],
});

const Login = Loadable({
    loader: () =>
        import(/* webpackChunkName: "login" */ "../app/modules/login/Login"),
    loading: () => <Loading />,
    modules: ["../app/modules/login/Login"],
    webpack: () => [require.resolveWeak("../app/modules/login/Login")],
});

const Send = Loadable({
    loader: () =>
        import(/* webpackChunkName: "send" */ "../app/modules/send/Send"),
    loading: () => <Loading />,
    modules: ["../app/modules/send/Send"],
    webpack: () => [require.resolveWeak("../app/modules/send/Send")],
});

const AdminCP = Loadable({
    loader: () =>
        import(/* webpackChunkName: "admincp" */ "../app/modules/admincp/AdminCP"),
    loading: () => <Loading />,
    modules: ["../app/modules/admincp/AdminCP"],
    webpack: () => [require.resolveWeak("../app/modules/admincp/AdminCP")],
});

const MyConfess = Loadable({
    loader: () =>
        import(/* webpackChunkName: "myconfess" */ "../app/modules/my-confess/MyConfess"),
    loading: () => <Loading />,
    modules: ["../app/modules/my-confess/MyConfess"],
    webpack: () => [require.resolveWeak("../app/modules/my-confess/MyConfess")],
});

const Medium_Index = Loadable({
    loader: () =>
        import(/* webpackChunkName: "medium_index" */ "../app/modules/medium/Index"),
    loading: () => <Loading />,
    modules: ["../app/modules/medium/Index"],
    webpack: () => [require.resolveWeak("../app/modules/medium/Index")],
});

const Medium_Post = Loadable({
    loader: () =>
        import(/* webpackChunkName: "medium_post" */ "../app/modules/medium/Post"),
    loading: () => <Loading />,
    modules: ["../app/modules/medium/Post"],
    webpack: () => [require.resolveWeak("../app/modules/medium/Post")],
});

const ToiDiCodeDao_Index = Loadable({
    loader: () =>
        import(/* webpackChunkName: "toidicodedao_index" */ "../app/modules/toidicodedao/Index"),
    loading: () => <Loading />,
    modules: ["../app/modules/toidicodedao/Index"],
    webpack: () => [require.resolveWeak("../app/modules/toidicodedao/Index")],
});

const ToiDiCodeDao_Post = Loadable({
    loader: () =>
        import(/* webpackChunkName: "toidicodedao_post" */ "../app/modules/toidicodedao/Post"),
    loading: () => <Loading />,
    modules: ["../app/modules/toidicodedao/Post"],
    webpack: () => [require.resolveWeak("../app/modules/toidicodedao/Post")],
});

export default [
    {
        path     : "/",
        title    : "Home",
        component: Home,
    },
    {
        path     : "/fpt/:id",
        title    : "Home Post",
        component: Home_Post,
    },
    {
        path     : "/fpt/:id/:title",
        title    : "Home Post",
        component: Home_Post,
    },
    {
        path     : "/login",
        title    : "Login",
        component: Login,
    },
    {
        path     : "/send",
        title    : "Send",
        component: Send,
    },
    {
        path     : "/admin-cp",
        title    : "Admin CP",
        component: withAuth(AdminCP),
    },
    {
        path     : "/my-confess",
        title    : "My Confess",
        component: MyConfess,
    },
    {
        path     : "/medium",
        title    : "News",
        component: Medium_Index,
    },
    {
        path     : "/medium/:id",
        title    : "Post",
        component: Medium_Post,
    },
    {
        path     : "/medium/:id/:title",
        title    : "Post",
        component: Medium_Post,
    },
    {
        path     : "/toidicodedao",
        title    : "Toi Di Code Dao",
        component: ToiDiCodeDao_Index,
    },
    {
        path     : "/toidicodedao/bai-viet/:id",
        title    : "Toi Di Code Dao Post",
        component: ToiDiCodeDao_Post,
    },
    {
        path     : "/toidicodedao/bai-viet/:id/:title",
        title    : "Toi Di Code Dao Post",
        component: ToiDiCodeDao_Post,
    },
];
