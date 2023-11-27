<template>
     

     <!-- <div class=""> -->
      <div class="w-full lg:w-6/12 px-4 mt-2">
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h1 class="flex items-center text-xl font-semibold px-4 pt-6">
            INSTITUTION DETAILS
          </h1>
          <h1 class="text-gray-600 font-semibold flex items-center ml-4 text-sm">Note: The red star refers to mandatory</h1>
          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label
                class="block text-gray-600 text-sm"
              >
               Institution Name <span class="text-red-500">*</span> 
              </label>
              <input
                v-model="institution_name"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
  

          <div class="w-full lg:w-12/12 px-4 pt-6">
            <div class="relative w-full mb-3">
              <label class="block text-gray-600 text-sm">
             Institution Code <span class="text-red-500">*</span> 
              </label>
              <input
                v-model="institution_code"
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
                 v-model="institution_zone_name"
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
               Institution contact number <span class="text-red-500">*</span> 
              </label>
              <input
                 v-model="institution_contact_no"
                type="text"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div class="w-full lg:w-12/12 px-4">
              <div class="relative w-full mb-3">
                  <label class="block text-gray-600 text-sm mb-2">
                   Select district <span class="text-red-500">*</span> </label>
                  <select v-model="institution_district" class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1
                  bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
                      <option v-for="district in districts" :key="district.id" :value="district.name">{{ district.name }}</option>
                  </select>
              </div>
          </div>
  
  
          <div class="w-full lg:w-12/12 px-4">
            <label
              class="block text-gray-600 text-sm"
            >
            Institution Address <span class="text-red-500">*</span> 
            </label>
            <textarea
              rows="4"
              v-model="institution_address"
              class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
            ></textarea>
          </div>

         
             <div class="relative w-full mb-3 mt-6 flex justify-end px-4">

                <button @click="" class="rounded-lg bg-red-600 mr-5 px-3 py-3 text-white w-48 hover:bg-red-700">
                     Cancel
                </button>

                <button @click="add_institution" :disabled="loading" class="flex justify-center items-center rounded-lg 
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
import {ref} from 'vue'
import { DocumentArrowDownIcon, TrashIcon, EyeSlashIcon, EyeIcon,PencilIcon, PlusCircleIcon,PlusIcon,ArchiveBoxArrowDownIcon } from '@heroicons/vue/24/outline';
import config from '../../../config'
import Swal from  'sweetalert2'
import axios from 'axios'
import router from "../../router";


export default{
    components:{DocumentArrowDownIcon, TrashIcon, EyeSlashIcon, PencilIcon, EyeIcon, ArchiveBoxArrowDownIcon, PlusIcon
        },
    setup(){

        const loading = ref(false)
        const institution_name = ref(null)
        const institution_address = ref(null)
        const institution_zone_name = ref(null)
        const institution_contact_no = ref(null)
        const institution_code = ref(null)

        const institution_district = ref(null)
        const districts = ref([
          {id:1, name:'Lilongwe'},
          {id:2, name:'Dowa'},
          {id:3, name:'Mzimba'},
          {id:4, name:'Blantyre'},
          {id:5, name:'Zomba'}
        ])

        const add_institution = ()=>{
            if(!institution_name.value || !institution_address.value || !institution_contact_no.value || !institution_district.value || !institution_code.value){
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
                  .post(`${config.API_URL}/institution`,
                  {
                    institution_name : institution_name.value,
                    institution_address : institution_address.value,
                    institution_zone_name : institution_zone_name.value,
                    institution_contact_no : institution_contact_no.value,
                    institution_code: institution_code.value,
                    institution_district:institution_district.value
                  }).then((response)=>{
                    if(response.status === 201){
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
                                text: "Failed to create an Institution record!",
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

        return{
            loading, institution_name, institution_address, institution_contact_no, institution_zone_name, institution_code,
            add_institution, institution_district, districts

        }
    }
}
</script>