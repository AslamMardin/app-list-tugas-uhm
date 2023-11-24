import { createWebHashHistory, createRouter } from "vue-router";
import TugasPage from '../components/Tugas.vue'
import LoginPage from '../components/pages/Login.vue'
import TutorialPage from '../components/pages/Tutorial.vue'
import NotFoundPage from '../components/pages/NotFound.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: TugasPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/tutorial',
        name: 'tutorial',
        component: TutorialPage
    },

];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});



export default router;