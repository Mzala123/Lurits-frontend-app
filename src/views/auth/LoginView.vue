<template>
    <div class="h-screen bg-slate-100 relative flex flex-row space-y-10 justify-center items-center">
          <div class="bg-white shadow-sm rounded-sm p-6 w-96 md:w-96">
               <h1 class="text-2xl font-bold leading-normal text-center">Welcome To LURITS</h1>
               <div class="flex justify-center items-center mb-4">
                <img src="../../assets/school logo.svg" alt="" class="h-24 w-24 stroke-emerald-500">
               </div>
                <div class="space-y-4">
                    <div class="relative w-full mb-2">
                        <label class="block text-blueGray-600 text-sm mb-1">
                            Enter username
                        </label>
                        <input type="" v-model="username" class="w-full border border-gray-500 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-sm text-sm shadow focus:outline-none">
                    </div>
                    <div class="relative w-full mb-4">
                        <label class="block text-blueGray-600 text-sm mb-1">
                          Enter password
                       </label>
                        <input v-model="password" @keyup.enter="login" class="w-full border border-gray-500 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-sm text-sm shadow focus:outline-none" type="password"/>
                   </div>
                   <div class="-m-2">
                        <a class="font-bold text-emerald-600 hover:text-blue hover:underline p-2 rounded-full" href="#">Forgot password?</a>
                   </div>
                   
                   <button @click="login" :disabled="loading" class="w-full flex justify-center text-center bg-emerald-600 hover:bg-emerald-700 
                        rounded-md text-white py-3 font-medium"> 
                        <span v-if="loading" class="flex justify-items-center">
                            <svg class="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
                                <circle class="opacity-25 bg-white" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75 bg-white" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6H6c0 4.411 3.589 8 8 8z"></path>
                            </svg>
                            Loading...
                            </span>
                        <span v-else>
                            Sign in
                        </span>
                   </button>

                </div>
          </div>
    
    </div>

</template>

<script>

import {ref} from "vue"
import router from "../../router"
import Swal from 'sweetalert2'
import axios from 'axios';
import config  from '../../../config'
import {useUserStore} from '../../stores/store'

export default{

    setup(){
        const username = ref(null)
        const password = ref(null)
        const alert_fill_fields = ref(false)
        const userStore = useUserStore()
        const loading = ref(false)
        const newstuff = ref(false)

        const login = ()=>{
            //router.push({path:"/sidenav"})
            loading.value = true
            if(!username.value || !password.value){
                Swal.fire({
                text:"Please fill in all required fields!",
                icon:"warning",
                dangerMode: true
                })
                loading.value = false
            }else{
                axios
                  .post(`${config.API_URL}/login`,
                  {
                    username: username.value,
                    password: password.value
                  }).then((response)=>{
                     if(response.status === 200){
                        sessionStorage.setItem("Authorization", response.data.token)
                        sessionStorage.setItem("user", JSON.stringify(response.data.user))
                        let user = JSON.parse(sessionStorage.getItem("user"))
                        let usertype_name = user.usertype_name
                        let userid = user._id

                     userStore.userId = user._id
                     userStore.persistUserId();
                   
                     sessionStorage.setItem("role", usertype_name)
                     console.log("the userrole is "+sessionStorage.getItem("role"))
                     sessionStorage.setItem("userid", userid)
                     console.log("the userid is "+sessionStorage.getItem("userid"))

                      if(usertype_name ===  'Super Admin'){
                          router.push({path:"/super_admin_dashboard"})
                      } else if(usertype_name === 'Head Teacher'){
                          router.push({path:'/head_dashboard'})
                      } else if(usertype_name === 'Teacher'){
                         router.push({path:'/teacher_learner_list'})
                      } else if(usertype_name === 'Learner'){
                         router.push({path:'/learner_dashboard'})
                      }


                     }
                  }).catch((error)=>{
                     const{status} = error.response
                           if(status === 401){
                             Swal.fire({
                                text: "Incorrect credentials!",
                                icon: "warning",
                                dangerMode: true,
                             })
                        loading.value = false
                           }else{
          
                            Swal.fire({
                                text: "Check your network connection!",
                                icon: "warning",
                                dangerMode: true,
                             })
                             loading.value = false
                         }
              })
            }
        }

        return{
            login,
            username,
            password,
            loading,
            alert_fill_fields, newstuff
            
        }
    }

}

</script>