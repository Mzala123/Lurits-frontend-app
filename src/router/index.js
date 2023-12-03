import { createRouter, createWebHistory } from "vue-router";
import LoginView from '../views/auth/LoginView.vue'
import SideNav from '../components/SideNav.vue'

import SuperAdminDashboard from '../views/institution/SuperAdminDashboard.vue'
import InstitutionList from '../views/institution/InstitutionList.vue'
import InstitutionAdminList from '../views/institution/InstitutionAdminList.vue'
import CreateInstitution from '../views/institution/CreateInstitution.vue'
import AddInstitutionAdmin from '../views/institution/AddInstitutionAdmin.vue'
import UpdateInstitution from '../views/institution/UpdateInstitution.vue'

import CreateUser from '../views/HeadTeacher/CreateUser.vue'
import LearnerList from '../views/HeadTeacher/LearnerList.vue'
import TeacherList from '../views/HeadTeacher/TeacherList.vue'
import HeadDashboard from '../views/HeadTeacher/HeadDashboard.vue'
import UserSettings from '../views/HeadTeacher/UserSettings.vue'
import UpdateUser from '../views/HeadTeacher/UpdateUser.vue'

import AssignClassLearner from '../views/HeadTeacher/AssignClassLearner.vue'
import AssignClassTeacher from '../views/HeadTeacher/AssignClassTeacher.vue' 


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
            },

            {
                path:'/add_institution_admin/:id',
                name:'add-institution-admin',
                component: AddInstitutionAdmin
            },
            {
                path:'/update_institution/:id',
                name:'update-institution',
                component: UpdateInstitution
            },
            {
                path:'/create_user',
                name:'create-user',
                component: CreateUser
            },
            {
                path:'/learner_list',
                name:'learner-list',
                component: LearnerList
            },
            {
                path:'/teacher_list',
                name:'teacher-list',
                component: TeacherList
            },
            {
                path:'/head_dashboard',
                name:'head-dashboard',
                component:HeadDashboard
            },
            {
                path:'/user_settings',
                name:'user-settings',
                component: UserSettings
            },
            {
                path:'/update_user/:id',
                name:'update-user',
                component:UpdateUser
            },
            {
                path:'/assign_class_learner/:id',
                name:'assign-class-learner',
                component: AssignClassLearner
            },
            {
                path:'/assign_class_teacher/:id',
                name:'assing-class-teacher',
                component: AssignClassTeacher
            }



        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router