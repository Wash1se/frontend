import { createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue"
import AllTracksPage from "@/pages/AllTracksPage.vue"
import FavouriteTracks from "@/pages/FavouriteTracks.vue"
import RegisterPage from "@/pages/RegisterPage.vue"
import LoginPage from "@/pages/LoginPage.vue"
import EmailVerifyPage from "@/pages/EmailVerifyPage.vue"

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
        children:[
                {
                    path: '/all-tracks/',
                    name: 'AllTracks',
                    component: AllTracksPage
                },
                {
                    path: '/collection/tracks/',
                    name: 'Tracks',
                    component: FavouriteTracks
                },
        ]
    },
    {
        path: '/auth/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/auth/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/auth/email-verify/',
        name: 'email-verify',
        component: EmailVerifyPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router