<template>
   <div class="h-screen relative w-screen px-2 py-2 flex bg-slate-100">
       
     <!--Side bar-->
      <div class="w-80 absolute h-full p-2 md:shadow-lg  transition-all duration-300 top-0 z-50"
         :class="[isOpen? 'left-0' : '-left-80']" ref="sidebarTarget">
          <div class="bg-slate-100 rounded-md h-full">
                <div class="flex justify-start items-center ml-4">
                      <img src="../assets/school logo.svg" class="h-10 w-10 fill-emerald-700" alt="">
                      <h1 class="ml-4 text-center text-gray-600 font-semibold text-xl">LURITS</h1>
                </div>

                <div v-show="user_type === 'Super Admin'"  class="">
                       <div class="ml-3 flex flex-row mt-5 px-4 ">
                            <router-link :to="'/add_institution'" class="rounded-2xl text-white flex font-semibold bg-emerald-700 hover:bg-emerald-600 outline-1 hover:shadow-md px-2 py-2 justify-center items-center w-56">
                                <PlusIcon class="h-6 w-6 mr-2"></PlusIcon>
                                <p class="block text-sm">Institution</p>
                            </router-link>
                       </div>

                        <div class="mt-6 border-t-2">
                            <router-link @click="name = item.name" :class="`flex items-center focus:outline-none hover:text-emerald-600 hover:border-l-2 border-emerald-500 px-8 py-2 w-full 
                                hover:bg-emerald-50 mr-auto mb-1 ${name === item.name ? 'text-emerald-600  bg-lighter border-l-2 border-emerald-600' : '' }`"
                                v-for="item of superAdminMenu" 
                                :key="item.name" 
                                v-bind:to="{name: item.name}">
                                    <component :is="item.icon" class="h-6 w-6 mr-4 text-left"></component>
                                    <p class="text-sm font-normal text-left">{{ item.title }}</p>
                            </router-link> 
                        </div>
                 </div>


                <div v-show="user_type === 'Head Teacher'" class="">
                    <div class="ml-3 flex flex-row mt-5 px-4 ">
                            <router-link :to="'/create_user'" class="rounded-2xl text-white flex font-semibold bg-emerald-700 hover:bg-emerald-600 outline-1 hover:shadow-md px-2 py-2 justify-center items-center w-56">
                                <PlusIcon class="h-6 w-6 mr-2"></PlusIcon>
                                <p class="block text-sm">User</p>
                            </router-link>
                    </div>

                    <div class="mt-6 border-t-2">
                            <router-link @click="name = item.name" :class="`flex items-center focus:outline-none hover:text-emerald-600 hover:border-l-2 border-emerald-500 px-8 py-2 w-full 
                                hover:bg-emerald-50 mr-auto mb-1 ${name === item.name ? 'text-emerald-600  bg-lighter border-l-2 border-emerald-600' : '' }`"
                                v-for="item of headTeacher" 
                                :key="item.name" 
                                v-bind:to="{name: item.name}">
                                    <component :is="item.icon" class="h-6 w-6 mr-4 text-left"></component>
                                    <p class="text-sm font-normal text-left">{{ item.title }}</p>
                            </router-link> 
                        </div>


                </div>

                <div v-show="user_type === 'Teacher'" class="">
                    <!-- <div class="ml-3 flex flex-row mt-5 px-4 ">
                            <router-link :to="'/create_user'" class="rounded-2xl text-white flex font-semibold bg-emerald-700 hover:bg-emerald-600 outline-1 hover:shadow-md px-2 py-2 justify-center items-center w-56">
                                <PlusIcon class="h-6 w-6 mr-2"></PlusIcon>
                                <p class="block text-sm">User</p>
                            </router-link>
                    </div> -->
                    <div class="mt-6 border-t-2">
                            <router-link @click="name = item.name" :class="`flex items-center focus:outline-none hover:text-emerald-600 hover:border-l-2 border-emerald-500 px-8 py-2 w-full 
                                hover:bg-emerald-50 mr-auto mb-1 ${name === item.name ? 'text-emerald-600  bg-lighter border-l-2 border-emerald-600' : '' }`"
                                v-for="item of teacherMenu" 
                                :key="item.name" 
                                v-bind:to="{name: item.name}">
                                    <component :is="item.icon" class="h-6 w-6 mr-4 text-left"></component>
                                    <p class="text-sm font-normal text-left">{{ item.title }}</p>
                            </router-link> 
                        </div>
                </div>

                <div v-show="user_type === 'Learner'" class="">
                  
                    <div class="mt-6 border-t-2">
                            <router-link @click="name = item.name" :class="`flex items-center focus:outline-none hover:text-emerald-600 hover:border-l-2 border-emerald-500 px-8 py-2 w-full 
                                hover:bg-emerald-50 mr-auto mb-1 ${name === item.name ? 'text-emerald-600  bg-lighter border-l-2 border-emerald-600' : '' }`"
                                v-for="item of learnerMenu" 
                                :key="item.name" 
                                v-bind:to="{name: item.name}">
                                    <component :is="item.icon" class="h-6 w-6 mr-4 text-left"></component>
                                    <p class="text-sm font-normal text-left">{{ item.title }}</p>
                            </router-link> 
                        </div>
                </div>



          </div>
      </div>

     <!--end of sidebar-->


      <!--content-->

      <div :class="[isOpen? 'md:ml-80' : 'ml-0']" class="w-full bg-slate-100 flex flex-col transition-all duration-300 gap-2">
             <div class="h-16 rounded-md p-2">

                <div class="flex justify-between items-center">
                    <div class="flex flex-row items-center">
                         <button @click="isOpen = !isOpen">
                            <Bars3Icon class="h-8 w-8"></Bars3Icon>
                         </button>
                         <h1 class="text-center ml-4 text-2xl font-semibold justify-center">{{ institutionName }}</h1>
                    </div>

                    <div class="flex justify-end items-end space-x-4">
                    <router-link v-bind:to="'/user_settings'" class="h-8 w-8 rounded-full border-2">
                        <Cog6ToothIcon class="stroke-gray-500"></Cog6ToothIcon>
                    </router-link>

                    <router-link v-bind:to="''" class="h-8 w-8 rounded-full border-2">
                            <QuestionMarkCircleIcon class="stroke-gray-500"></QuestionMarkCircleIcon>
                    </router-link>

                    <div class="relative" ref="target">
                        <button @click="isDropdownOpen = !isDropdownOpen" class="flex h-9 w-9 rounded-full border-2 bg-emerald-700 hover:bg-emerald-600 px-1 py-1 justify-center items-center">
                        <!-- <img :src="users?.profile_photo" class="h-8 w-8 rounded-full object-cover" alt=""> -->
                        <h1 class="font-extrabold text-xl text-center text-white"> M </h1>
                    </button>

                        <div v-if="isDropdownOpen" class="absolute top-10 z-50 right-2 w-80 rounded-md shadow-xl  bg-white ring-1 ring-black ring-opacity-5">
                        
                            <div class="flex flex-col items-left p-4 ">
                                <div class="flex items-center">
                                <!-- <img class="w-12 h-12 mb-3 rounded-full shadow-sm object-cover" alt="image"/> -->
                                <h5 class="mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-gray-800">{{ username }}</h5>
                                </div>
                                <span class="font-semibold text-sm text-gray-500 dark:text-gray-600"> </span>
                                <!-- <span  class="text-sm text-gray-500 dark:text-gray-600"> Okay </span> -->
                                <div class="my-5 border-b border-lighter"></div>
                                
                                <router-link v-bind:to="'/'" class="flex items-center text-sm w-full bg-lighest py-2 px-2 hover:shadow-md hover:border  hover:border-r-1 hover:border-black rounded-lg">
                                    <!-- <ArrowLeftIcon class="h-8 w-8"></ArrowLeftIcon> -->
                                    <component :is="icons.signout" class="h-6 w-6 mr-4 text-left"></component>
                                    Sign Out
                                </router-link>
                        </div>

                        </div>
                    </div>
                    </div>

            </div>


             </div>

             <!--middle content-->
             <div class="bg-white rounded-lg h-full py-2 px-4 overflow-y-auto" style="max-height: calc(100vh - 64px);">
                   <router-view class=""></router-view>
             </div>
             <!-- end of middle content-->
      </div>
      <!--end of content-->

   </div>
</template>

<script>

import {ref, onMounted} from 'vue'
import { QuestionMarkCircleIcon, Cog6ToothIcon,QueueListIcon,UserCircleIcon,ArrowLeftIcon,HomeIcon, Bars3Icon, PlusCircleIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { onClickOutside } from '@vueuse/core'
//import {QuestionMarkCircleIcon, Cog6ToothIcon} from  '@heroicons/vue/20/outline'
import router from '../router';
import { useUserStore } from '../stores/store';
import axios from 'axios';
import config from '../../config'

export default{
    components:{
       QuestionMarkCircleIcon,HomeIcon, UserCircleIcon,Cog6ToothIcon,QueueListIcon, ArrowLeftIcon, Bars3Icon, PlusCircleIcon, PlusIcon
    },
    setup(){

        const isDropdownOpen = ref(false)
        const users = ref(null)
        const user_type =  ref(null)
        const target = ref(null)
        const sidebarTarget = ref(null)

        const userStore = useUserStore()
        const userId = userStore.getUserId;

        const institutionId = ref(null)
        const institutionData = ref([])
        const institutionName = ref(null)
        const username = ref([])


        const isOpen = ref(true)

        onClickOutside(target, (event) => isDropdownOpen.value = false)

        //onClickOutside(sidebarTarget, (event) =>  isOpen.value = false)

        const icons = [{name:'icon', signout:ArrowLeftIcon}]
        const superAdminMenu = ref([
            {title:'Dashboard', icon:HomeIcon, name:'super-admin-dashboard'},
            {title:'Institutions List', icon:QueueListIcon, name:'institution-list'},
            {title:'Institution Admins List', icon:UserCircleIcon, name:'institution-admin-list'},
            
        ]); 

        const headTeacher = ref([
            {title:'Dashboard', icon:HomeIcon, name:'head-dashboard'},
            {title:'Learners unassigned class', icon:QueueListIcon, name:'unassigned-learner-list'},
            {title:'Learners list', icon:QueueListIcon, name:'learner-list'},
            {title:'Teachers  list', icon:QueueListIcon, name:'teacher-list'},
          ]
        )

        const teacherMenu = ref([
            // {title:'Dashboard', icon:HomeIcon, name:'teacher-dashboard'},
            {title:'Learners list', icon:QueueListIcon, name:'teacher-learner-list'},
            {title:'Graded learners list', icon: QueueListIcon, name:'grade-student-list'}
        ])

        const learnerMenu = ref([
            {title:'Learner dashboard', icon:HomeIcon, name:'learner-dashboard'},
            {title:'Learner report grade', icon:QueueListIcon, name:'learner-grades'},
        ])

        const read_user_information =()=>{
             axios
             .get(`${config.API_URL}/read_one_user_details/${userId}`)
             .then((response)=>{
                  if(response.status === 200){
                        institutionData.value = response.data
                        institutionId.value = institutionData.value.userDetails.institution_id
                        username.value = institutionData.value.username
                        institutionName.value = institutionData.value.userDetails.institution_name
                        sessionStorage.setItem("institutionId", institutionId.value)
                        sessionStorage.setItem("institution_name",  institutionName.value)
                        console.log("our id is "+institutionId.value, institutionData.value)
                  }
             })
        }

        onMounted(()=>{
            user_type.value = sessionStorage.getItem("role")
           
            read_user_information()
            console.log(" haha org name"+institutionName.value)

            console.log(userId)

        })

        return {
            isDropdownOpen,
            user_type,
            users, icons, target, isOpen, sidebarTarget,
            superAdminMenu, userId, userStore, headTeacher, read_user_information,
             institutionId, institutionData, username, institutionName, teacherMenu, learnerMenu
        }

    }
}

</script>