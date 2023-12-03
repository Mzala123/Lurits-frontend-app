<template>
    <div v-if="is_loading"
                  class="mt-10 bg-slate-50/50 flex justify-center items-center w-full h-full"
                  >
                  <div class="h-10 w-10 border-2 animate-spin bg-blue"></div>
    </div>

    <div class="w-full lg:w-6/12 px-4 mt-2">
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 class="flex items-center text-xl font-semibold px-4 pt-6 uppercase">
           Edit Learner or Teacher details
        </h1>

        <div class="w-full lg:w-12/12 px-4 pt-6">
          <div class="relative w-full mb-3">
            <label class="block text-gray-600 text-sm">
               Firstname
            </label>
            <input
              v-model="person.firstname"
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
              v-model="person.lastname"
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
            Phonenumber
            </label>
            <input
              v-model="person.phonenumber"
              type="text"
              class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>


        <div class="w-full lg:w-12/12 px-4">
          <div class="relative w-full mb-3">
              <label class="block text-gray-600 text-sm mb-2">
              Gender</label>
              <select v-model="person.gender" class="px-2.5 py-3 placeholder-black text-gray-700 border border-black border-1
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
                  <input v-model="formattedDob " type="date" class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1
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
              v-model="person.place_residence"
              type="text"
              class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm  w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

              

           <div class="relative w-full mb-3 mt-6 flex justify-end px-4">
              <button @click="" class="rounded-lg bg-red-600 mr-5 px-3 py-3 text-white w-48 hover:bg-red-700">
                   Cancel
              </button>

              <button @click="update_user_person_details" :disabled="loading" class="flex justify-center items-center rounded-lg 
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

import {ref, onMounted, computed, watchEffect} from 'vue'
import { PlusCircleIcon, UserPlusIcon, PlusIcon, PencilIcon} from '@heroicons/vue/24/outline'
import config from '../../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from "../../router";
import { useRoute } from 'vue-router';


export default{
    components:{
      PlusCircleIcon, UserPlusIcon, PlusIcon, PencilIcon
    },
    setup(){
        const loading = ref(false)
        const is_loading = ref(false)
        const usertype_name = ref("")
        const personId = ref("")
        const person = ref({
            firstname : null,
            lastname : null,
            gender : null,
            phonenumber : null,
            dob : null,
            address : null,
            place_residence : null
            }
        )
 
        const route = useRoute()

        const read_one_user_details = (id)=>{
          is_loading.value = true
           axios
             .get(`${config.API_URL}/read_one_user_details/${id}`)
             .then((response)=>{
                 person.value = response.data.adminDocs
                 usertype_name.value = response.data.usertype_name
                 personId.value = response.data.personId
                 console.log(person.value)
                 console.log(usertype_name.value)
                 is_loading.value = false
             }).catch((error)=>{
                is_loading.value = false
             })
        }

        const formattedDob = computed(() => {
            const date = new Date(person.value.dob);
            return date.toISOString().split('T')[0]; // "yyyy-MM-dd" format
          });

          // Log the formatted date whenever it changes (for debugging purposes)
          watchEffect(() => {
            console.log('Formatted Date:', formattedDob.value);
          });


        const update_user_person_details =()=>{
          console.log("hehehe tafika"+usertype_name.value)
          if(!person.value.firstname || !person.value.lastname || !person.value.gender){
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
                .put(`${config.API_URL}/update_user/${personId.value}`,
                {
                  firstname: person.value.firstname,
                  lastname: person.value.lastname,
                  gender: person.value.gender,
                  dob: person.value.dob,
                  phonenumber: person.value.phonenumber,
                  address: person.value.address,
                  place_residence: person.value.place_residence
                }).then((response)=>{
                  if(response.status === 200){
                    Swal.fire({
                            title:"Information",
                            text: response.data.message,
                            icon: "success"
                        }).then((ok)=>{
                             loading.value = false
                             if(ok){
                            if(usertype_name.value === "Learner"){
                                router.push({path:"/learner_list"})
                              }else if(usertype_name.value === "Teacher"){
                                router.push({path:"/teacher_list"})
                              }
                           }   
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
            read_one_user_details(route.params.id)
            console.log(route.params.id)
            console.log(usertype_name.value)
        })


        return{
         loading, is_loading, person, 
         read_one_user_details, update_user_person_details, formattedDob, usertype_name, personId
         
        }
    }

}

</script>