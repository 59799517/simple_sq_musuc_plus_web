import { createRouter,createWebHashHistory} from "vue-router";

const home = () => import("../components/Home.vue")
const login = () => import("../components/Login.vue")
const search = () => import("../components/Search.vue")
const Download = () => import("../components/Download.vue")
const Set = () => import("../components/Set.vue")

const Parsertext = () => import("../components/Parsertext.vue")
const ParserPlaylist = () => import("../components/ParserPlaylist.vue")
const routes = [
    { path: "/", redirect: "/login" },
    {
        path: "/search",
        name: "search",
        component: search
    },
    {
        path: "/home",
        name: "home",
        component: home
    },
    {
        path: "/login",
        name: "login",
        component: login
    },
    {
        path: "/search",
        name: "search",
        component: search
    },
    {
        path: "/download",
        name: "download",
        component: Download
    },
    {
        path: "/set",
        name: "set",
        component: Set
    },
    {
        path: "/parserPlaylist",
        name: "parserPlaylist",
        component: ParserPlaylist
    },
    {
        path: "/parsertext",
        name: "parsertext",
        component: Parsertext
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})