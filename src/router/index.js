import { createRouter, createWebHistory} from "vue-router";
import MainPage from "../pages/MainPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import EmailVerifyPage from "../pages/EmailVerifyPage.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage
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