<template>

        <div v-if="is_loading"
                    class="mt-10 bg-slate-50/50 flex justify-center items-center w-full h-full"
                    >
                    <div class="h-10 w-10 border-2 animate-spin bg-blue"></div>
        </div>

     
     <div class="w-full lg:w-6/12 px-4 mt-2">
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h1 class="flex items-center text-xl font-semibold px-4 pt-6">
            UPDATE INSTITUTION DETAILS
          </h1>
          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
               Institution Name
              </label>
              <input
                v-model="institution.institution_name"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
  

          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label class="block text-gray-600 text-sm">
             Institution Code
              </label>
              <input
                v-model="institution.institution_code"
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
               Institution Zone Name
              </label>
              <input
                 v-model="institution.institution_zone_name"
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
               Institution contact number
              </label>
              <input
                 v-model="institution.institution_contact_no"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
  
  
          <div class="w-full lg:w-12/12 px-4">
            <label
              class="block text-gray-600 text-sm"
            >
            Institution Address
            </label>
            <textarea
              rows="4"
              v-model="institution.institution_address"
              class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
            ></textarea>
          </div>

         
             <div class="relative w-full mb-3 mt-6 flex justify-end px-4">

                <button @click="" class="rounded-lg bg-red-600 mr-5 px-3 py-3 text-white w-48 hover:bg-red-700">
                     Cancel
                </button>

                <button @click="update_institution" :disabled="loading" class="flex justify-center items-center rounded-lg 
                bg-emerald-700 px-3 py-3 text-white w-48 hover:bg-emerald-600">
                    
                    <span v-if="loading" class="flex justify-items-center">
                        <svg class="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
                            <circle class="opacity-25 bg-white" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75 bg-white" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6H6c0 4.411 3.589 8 8 8z"></path>
                        </svg>
                        Loading...
                    </span>
                    <span v-else class="flex justify-items-center">
                    <PencilIcon class="h-6 w-6 mr-3"/>
                    <p>   Update </p>
                    </span>

                </button>
            </div> 
         
        </div>
      </div>
    <!-- </div> -->

</template>

<script>
import {ref, onMounted} from 'vue'
import {PlusCircleIcon, UserPlusIcon, PencilIcon} from '@heroicons/vue/24/outline'
import config  from '../../../config'
import axios from 'axios';
import Swal from 'sweetalert2';
import router from "../../router";
import { useRoute } from 'vue-router';

export default{

    components:{
        UserPlusIcon, PlusCircleIcon, PencilIcon
    },
    setup(){

        const loading = ref(false)
        const is_loading = ref(false)
        const institution =ref({
         institution_name : ref(null),
         institution_address : ref(null),
         institution_zone_name : ref(null),
         institution_contact_no : ref(null),
         institution_code : ref(null)
       })



         const route = useRoute()
         
         const read_one_institution_by_id = (id)=>{
            is_loading.value = true
              axios 
                .get(`${config.API_URL}/read_one_institution/${id}`)
                .then((response)=>{
                    institution.value = response.data
                    console.log(institution.value)
                    is_loading.value = false
                }).catch((error)=>{
                    is_loading.value = false
                })

         }

         const update_institution = ()=>{
            if(!institution.value.institution_name || !institution.value.institution_address || !institution.value.institution_contact_no){
                loading.value = true
                Swal.fire({
                    text:"Please fill in all required fields!",
                    icon:"warning",
                    dangerMode: true
                })
                loading.value = false
            }else{
                loading.value = true
                axios
                  .put(`${config.API_URL}/update_institution/${route.params.id}`,
                  {
                    institution_name : institution.value.institution_name,
                    institution_address : institution.value.institution_address,
                    institution_zone_name : institution.value.institution_zone_name,
                    institution_contact_no : institution.value.institution_contact_no,
                    institution_code: institution.value.institution_code

                  }).then((response)=>{
                    if(response.status === 200){
                        Swal.fire({
                            title:"Information",
                            text: response.data.message,
                            icon: "success"
                        }).then((ok)=>{
                             loading.value = false
                             if(ok){
                                router.push({path:"/institution_list"})
                             }
                        })
                    }
                  }).catch((error)=>{
                    const{status} = error.response
                    if(status === 404){
                        Swal.fire({
                                title:"Information",
                                text: "Failed to update an Institution record!",
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
            read_one_institution_by_id(route.params.id)
         })

        return{
            loading, read_one_institution_by_id, institution, update_institution, is_loading

        }
    }
}

</script>