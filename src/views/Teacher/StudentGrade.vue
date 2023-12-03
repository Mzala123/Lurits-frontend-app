<template>
      <div v-if="is_loading"
                  class="mt-10 bg-slate-50/50 flex justify-center items-center w-full h-full"
                  >
                  <div class="h-10 w-10 border-2 animate-spin bg-blue"></div>
      </div>

   <!-- <div class> </div> -->

   <div class="w-full lg:w-6/12 px-4 mt-2">
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
         <h1 class="flex items-center text-xl font-semibold px-4 pt-6 uppercase">
            Enter Grades for {{ firstname }} {{ lastname }}
         </h1>

        <div class="w-full lg:w-12/12 px-4 pt-6">
            <div v-for="subject in subject_data" :key="subject.subjectId" class="relative w-full mb-3">
            <label :for="`subject-${subject.subjectId}`" class="block text-gray-600 text-sm">
                {{ subject.SubjectName }} 
            </label>
            <input
                v-model="subjectScores[subject.subjectId]"
                :id="`subject-${subject.subjectId}`"
                type="number"
                class="px-3 py-3 placeholder-black text-gray-700 border border-black border-1 focus:outline-none rounded text-sm shadow-sm w-full ease-linear transition-all duration-150"
            />
            </div>
        </div>

         <!-- <div>
            <h2>Scores:</h2>
            <ul>
                <li v-for="(score, subjectId) in subjectScores" :key="subjectId">
                {{ subject_data.find(subject => subject.subjectId === subjectId).SubjectName }}: {{ score }}
                </li>
            </ul>
         </div> -->


           <div class="relative w-full mb-3 mt-6 flex justify-end px-4">

              <button @click="add_grades" :disabled="loading" class="flex justify-center items-center rounded-lg 
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
import {ref, onMounted, reactive, computed} from 'vue'
import {PlusCircleIcon, UserPlusIcon, PlusIcon, PencilIcon} from '@heroicons/vue/24/outline'
import config  from '../../../config'
import axios from 'axios';
import Swal from 'sweetalert2';
import router from "../../router";
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/store';

export default{
    components:{
        PlusIcon
    },
    setup(){

        const route = useRoute();
        const userId = ref('');
        const classId = ref('');

        const subject_data = ref([])
        const firstname = ref('')
        const lastname = ref('')
        const learner = ref({})
        const score = ref("")

        const loading = ref(false)
        const is_loading = ref(false)

        userId.value = route.params.userId
        classId.value = route.params.classId

        const subjectScores = ref({})
//classSubjectId

        const userStore = useUserStore()
        const teacherId = userStore.getUserId

        const read_subjects_classes_to_add_grades = ()=>{
            axios
              .get(`${config.API_URL}/read_subjects_classes_to_add_grades/${teacherId}/${route.params.classId}`)
              .then((response)=>{
                   subject_data.value = response.data
                   console.log(subject_data.value)
              })
        }


        const add_grades = ()=>{
            //loading.value = true
            for (const [subjectId, score] of Object.entries(subjectScores.value)) {
                axios
                   .post(`${config.API_URL}/add_learner_subject_grade`,
                   {
                      subjectId: subjectId,
                      userId: userId.value,
                      classId: classId.value,
                      teacherId: teacherId,
                      score: score                      
                   }).then((response)=>{
                      if(response.status === 201){
                          Swal
                           .fire({
                            title: "Information",
                            text:response.data.message,
                            icon:"success"
                           }).then((ok)=>{
                              if(ok){
                                router.push({path:"/teacher_learner_list"})
                              }     
                           })
                      } 
                   })
                  console.log(subjectId+" "+score); // Log the response from the server
                }
        }


        const read_one_user_details = ()=>{
            axios
              .get(`${config.API_URL}/read_one_user_details/${userId.value}`)
              .then((response)=>{
                  learner.value = response.data.adminDocs
                  firstname.value = learner.value.firstname
                  lastname.value = learner.value.lastname
                  console.log(learner.value)
                  console.log(firstname.value+" "+lastname.value)
              })
        }


        onMounted(()=>{
            console.log(classId.value)
            console.log(userId.value),
            read_subjects_classes_to_add_grades()
            read_one_user_details()

            add_grades()
        })


        return{
            read_subjects_classes_to_add_grades,
            userId, classId, subject_data, teacherId, read_one_user_details, lastname, firstname
            ,learner, loading, is_loading, add_grades, score, subjectScores, 
        }

    }
}

</script>