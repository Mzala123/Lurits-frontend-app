<template>
       <div v-if="is_loading"
                  class="mt-10 bg-slate-50/50 flex justify-center items-center w-full h-full"
                  >
                  <div class="h-10 w-10 border-2 animate-spin bg-blue"></div>
      </div>
      <div class="w-full lg:w-6/12 px-4 mt-2">
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
         <h1 class="flex items-center text-xl font-semibold px-4 pt-6 uppercase">
           Assign Teacher to class and subjects
         </h1>


          <div class="w-full lg:w-12/12 px-4 pt-6">
              <div class="relative w-full mb-3">
                  <label class="block text-gray-600 text-sm mb-2">
                  Select Class</label>
                  <select v-model="classId" class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1
                  bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
                      <option v-for="classItem in class_list" :key="classItem._id" :value="classItem._id">
                        {{ classItem.className }}
                    </option>
                  </select>
              </div>
          </div>


          <div class="w-full lg:w-12/12 px-4 pt-2">
              <div class="relative w-full mb-3">
                  <label class="block text-gray-600 text-sm mb-2">
                  Select Class</label>
                  <select v-model="subjectId" class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1
                  bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
                      <option v-for="subject in subject_list" :key="subject._id" :value="subject._id">
                        {{ subject.subjectName }}
                    </option>
                  </select>
              </div>
          </div>



           <div class="relative w-full mb-3 mt-8 flex justify-end px-4">

              <!-- <button @click="" class="rounded-lg bg-red-600 mr-5 px-3 py-3 text-white w-48 hover:bg-red-700">
                   Cancel
              </button> -->

              <button @click="assign_teacher_class_subject" :disabled="loading" class="flex justify-center items-center rounded-lg 
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

</template>

<script>

import {ref, onMounted, computed} from 'vue'
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

        const is_loading = ref(false)
        const class_list = ref([])
        const subject_list = ref([])
        const classId = ref(null);
        const subjectId = ref(null)
        const loading = ref(false)


        const route = useRoute()

        const read_list_classes = ()=>{
            is_loading.value = true
            axios
             .get(`${config.API_URL}/read_list_classes`)
             .then((response)=>{
              
                class_list.value = response.data
                console.log(class_list.value)
                is_loading.value = false
             })
        }

        const read_list_subjects =()=>{
            is_loading.value = true
            axios
              .get(`${config.API_URL}/read_list_subjects`)
              .then((response)=>{
                subject_list.value = response.data
                console.log(subject_list.value)
                is_loading.value = false
                 
              })
        }

        const assign_teacher_class_subject = ()=>{
              console.log(subjectId.value)
              console.log(classId.value)
              if(!subjectId.value || !classId.value){
                Swal.fire({
                        text:"Please fill in the required fields!",
                        icon:"warning",
                        dangerMode: true
                    })  
              }else{
                 loading.value = true
                 axios
                  .post(`${config.API_URL}/assign_class_to_teacher/${route.params.id}`,
                  {
                    classId: classId.value,
                    subjectId: subjectId.value

                  }).then((response)=>{
                    if(response.status === 200){
                        Swal.fire({
                                title: "Information",
                                text: response.data.message,
                                icon:"success"
                              }).then((ok)=>{
                                loading.value = false
                                if(ok){
                                    router.push({path:"/teacher_list"})
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
                  })
                }
        }


        onMounted(()=>{
            read_list_classes()
            read_list_subjects()
            console.log(route.params.id)
        })

        return {
            is_loading, class_list, classId, loading, subject_list,
            assign_teacher_class_subject, read_list_classes, read_list_subjects, subjectId
        }
    }

}


</script>