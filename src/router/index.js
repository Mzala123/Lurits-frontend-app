import { createRouter, createWebHistory } from "vue-router";
import LoginView from '../views/auth/LoginView.vue'
import SideNav from '../components/SideNav.vue'
import SuperAdminDashboard from '../views/institution/SuperAdminDashboard.vue'
import InstitutionList from '../views/institution/InstitutionList.vue'
import InstitutionAdminList from '../views/institution/InstitutionAdminList.vue'
import CreateInstitution from '../views/institution/CreateInstitution.vue'
 

const routes = [
    {
        path:'/',
        name: 'login',
        component: LoginView
    },
    {
        path:'/sidenav',
        component: SideNav,
        children:[
            {
                path:'/add_institution',
                name:'add-institution',
                component: CreateInstitution
            },
            {
                path:'/institution_list',
                name:'institution-list',
                component: InstitutionList
            },
            {
                path:'/institution_admin_list',
                name:'institution-admin-list',
                component: InstitutionAdminList
            },
            {
                path:'/super_admin_dashboard',
                name:'super-admin-dashboard',
                component: SuperAdminDashboard
            }

        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router