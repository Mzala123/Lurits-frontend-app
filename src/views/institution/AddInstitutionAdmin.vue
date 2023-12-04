<template>

      <div v-if="is_loading"
                    class="mt-10 bg-slate-50/50 flex justify-center items-center w-full h-full"
                    >
                    <div class="h-10 w-10 border-2 animate-spin bg-blue"></div>
        </div>

     

      <div class="w-full lg:w-6/12 px-4 mt-2">
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h1 class="flex items-center text-xl font-semibold px-4 pt-6 uppercase">
             Add Institution adminstrator details
          </h1>



          <div class="w-full lg:w-12/12 px-4 pt-6 hidden">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
               Institution Id
              </label>
              <input
                v-model="institutionId"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div class="w-full lg:w-12/12 px-4 pt-6 hidden">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
                usertype
              </label>
              <input
                v-model="usertype"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>



          <!-- <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
               National Id
              </label>
              <input
                v-model="nationalId"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div> -->
  

          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label class="block text-gray-600 text-sm">
                 Firstname
              </label>
              <input
                v-model="firstname"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
  


          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm "
              >
               Lastname
              </label>
              <input
                v-model="lastname"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>


          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
              Email
              </label>
              <input
                v-model="email"
                type="email"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
              Phonenumber
              </label>
              <input
                v-model="phonenumber"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>


          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
                <label class="block text-gray-600 text-sm mb-2">
                Gender</label>
                <select v-model="gender" class="px-2.5 py-3 placeholder-black text-gray-700 border border-black border-1
                bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            </div>

            <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                    <label class="block text-gray-600 text-sm mb-2">
                    Date of birth</label>
                    <input v-model="dob" type="date" class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1
                    bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
                </div>
            </div>


            <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm "
              >
               Place of residence
              </label>
              <input
                v-model="place_residence"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <!-- <div class="w-full lg:w-12/12 px-4">
            <label
              class="block text-gray-600 text-sm"
            >
             Address
            </label>
            <textarea
              rows="4"
               v-model="address"
              class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
            ></textarea>
          </div> -->


            <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                    <label class="block text-gray-600 text-sm mb-2">
                    User type</label>
                    <select v-model="usertype_name" class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1
                    bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
                        <option value="Head Teacher">Head Teacher</option>
                    </select>
                </div>
            </div>


          
         

             <div class="relative w-full mb-3 mt-6 flex justify-end px-4">

                <button @click="" class="rounded-lg bg-red-600 mr-5 px-3 py-3 text-white w-48 hover:bg-red-700">
                     Cancel
                </button>

                <button @click="create_institution_admin" :disabled="loading" class="flex justify-center items-center rounded-lg 
                bg-emerald-700 px-3 py-3 text-white w-48 hover:bg-emerald-600">
                    
                    <span v-if="loading" class="flex justify-items-center">
                        <svg class="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
                            <circle class="opacity-25 bg-white" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75 bg-white" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6H6c0 4.411 3.589 8 8 8z"></path>
                        </svg>
                        Loading...
                    </span>
                    <span v-else class="flex justify-items-center">
                    <PlusIcon class="h-6 w-6 mr-3"/>
                    <p>   Submit </p>
                    </span>

                </button>
            </div> 
         
        </div>
      </div>
    <!-- </div> -->

</template>

<script>
import {ref, onMounted} from 'vue'
import {PlusCircleIcon, UserPlusIcon, PlusIcon, PencilIcon} from '@heroicons/vue/24/outline'
import config  from '../../../config'
import axios from 'axios';
import Swal from 'sweetalert2';
import router from "../../router";
import { useRoute } from 'vue-router';


export default{

    components:{
        PlusCircleIcon, UserPlusIcon, PlusIcon, PencilIcon
    },

    setup(){

        const gender = ref(null)
        const firstname = ref(null)
        const lastname = ref(null)
        const nationalId = ref(null)
        const usertype_name = ref(null)
        const dob = ref(null)
        const place_residence = ref(null)
        //const address = ref(null)
        const usertype = ref("Employee")
        const phonenumber = ref(null)
        const email = ref(null)
        const institution_id = ref(null)

        
        
        const institution = ref([])
        const route = useRoute()
        const institutionId = route.params.id

        const loading = ref(false)
        const is_loading = ref(false)


        const create_institution_admin = ()=>{

          console.log("user type "+usertype_name.value)
           if(!firstname.value || !lastname.value || !usertype_name.value ||
             !dob.value || !gender.value || !email.value){
                Swal.fire({
                    text:"Please fill in all required fields!",
                    icon:"warning",
                    dangerMode: true
                })  
            }else{
                loading.value = true
                axios
                   .post(`${config.API_URL}/register`, 
                   {
                    // nationalId: nationalId.value,
                    firstname: firstname.value,
                    lastname: lastname.value,
                    gender: gender.value,
                    email: email.value,
                    phonenumber: phonenumber.value,
                    dob: dob.value,
                    place_residence: place_residence.value,
                    institutionId: institutionId,
                    usertype_name: usertype_name.value,
                    usertype: usertype.value,
                   }
                ).then((response)=>{
                    if(response.status === 201){
                    
                        Swal.fire({
                            title:"Information",
                            text: response.data.message,
                            icon: "success"
                        }).then((ok)=>{
                             loading.value = false
                             if(ok){
                                router.push({path:"/institution_admin_list"})
                             }
                        })
                    }else if(response.status === 200){
                       Swal.fire({
                          title:"Information",
                          text: response.data.message,
                          icon: "success"
                      })
                  }
                }).catch((error)=>{
                    loading.value = false
                    const{status} = error.response
                    if(status === 404){
                        Swal.fire({
                                title:"Information",
                                text: error.response.data.message,
                                icon: "error",
                             })
                        
                    }else{
                        Swal.fire({
                                title:"Information",
                                text: "Check your network connection!",
                                icon: "warning",
                             })
                    }

                })
            }
        }

         onMounted(()=>{
            console.log("institution id is"+institutionId)
         })


        return{
            gender,usertype_name, firstname, lastname, nationalId,
            dob, place_residence, 
            //address, 
            usertype, phonenumber, loading,email,
            institution_id, is_loading, institution, create_institution_admin, institutionId

        }
    }
}

</script>