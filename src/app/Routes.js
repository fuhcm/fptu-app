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

const News = Loadable({
    loader: () =>
        import(/* webpackChunkName: "news" */ "../app/modules/news/News"),
    loading: () => <Loading />,
    modules: ["../app/modules/news/News"],
    webpack: () => [require.resolveWeak("../app/modules/news/News")],
});

const Post = Loadable({
    loader: () =>
        import(/* webpackChunkName: "post" */ "../app/modules/post/Post"),
    loading: () => <Loading />,
    modules: ["../app/modules/post/Post"],
    webpack: () => [require.resolveWeak("../app/modules/post/Post")],
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

const Review = Loadable({
    loader: () =>
        import(/* webpackChunkName: "review" */ "../app/modules/review/Review"),
    loading: () => <Loading />,
    modules: ["../app/modules/review/Review"],
    webpack: () => [require.resolveWeak("../app/modules/review/Review")],
});

const ReviewDetails = Loadable({
    loader: () =>
        import(/* webpackChunkName: "review_details" */ "../app/modules/review/Details"),
    loading: () => <Loading />,
    modules: ["../app/modules/review/Details"],
    webpack: () => [require.resolveWeak("../app/modules/review/Details")],
});

export default [
    {
        path     : "/",
        title    : "Home",
        component: Home,
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
        path     : "/news",
        title    : "News",
        component: News,
    },
    {
        path     : "/post/:id",
        title    : "Post",
        component: Post,
    },
    {
        path     : "/post/:id/:title",
        title    : "Post",
        component: Post,
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
    {
        path     : "/pentakill",
        title    : "Review",
        component: Review,
    },
    {
        path     : "/pentakill/:code",
        title    : "Review Details",
        component: ReviewDetails,
    },
];
