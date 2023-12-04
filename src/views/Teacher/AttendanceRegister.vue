<template>
    <div class="container mx-auto m-5 rounded-lg border-1 border-gray-600 px-3">
        <div class="flex flex-row justify-between w-full">
            <h2 class="text-2xl font-bold mb-4">
                Attendance Register
            </h2> 
            <p>
                 
            </p>
        </div>
        <table class="min-w-full bg-slate-100 border border-gray-300">
            <thead>
                <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">Learner code</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">Firstname</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">Lastname</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">Present</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">Absent</th>
                </tr>
        </thead>
        <tbody>
            <tr v-for="(learner, index) in learnerList" :key="learner.userDetails._id"> 
                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ learner.userDetails.username}}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ learner.learnerDocs.firstname}}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ learner.learnerDocs.lastname}}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                    <input
                    type="checkbox"
                    :id="'present_' + index"
                    v-model="learner.attendanceDetails"
                    :true-value="true"
                    :false-value="false"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label :for="'present_' + index" class="ml-2">Present</label>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                    <input
                    type="checkbox"
                    :id="'absent_' + index"
                    v-model="learner.attendanceDetails"
                    :true-value="false"
                    :false-value="true"
                    class="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out"
                    />
                    <label :for="'absent_' + index" class="ml-2">Absent</label>
                </td>
            </tr>
        </tbody>
        </table>
        
               <button
                @click="submitAttendance"
                class="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-emerald active:bg-emerald-800"
                >
                Submit Attendance
                </button>

   </div>

</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import config from '../../../config'
import Swal from 'sweetalert2'
import { DocumentArrowDownIcon, UserPlusIcon, PlusIcon, EyeSlashIcon, EyeIcon, PencilIcon, Cog6ToothIcon, ArchiveBoxArrowDownIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import router from "../../router";
import { useRoute } from 'vue-router';

export default{

    setup(){

        const is_loading = ref(false)
        const learnerList = ref("")
        let institutionId = ref(null)
        let institutionName = ref(null)
        const userId = ref("")

        const attendanceDetails = ref([]);

        onMounted(()=>{
                  institutionId = sessionStorage.getItem('institutionId')
                  institutionName = sessionStorage.getItem('institution_name')
                  console.log("org id is "+institutionId)
                  console.log("org name "+institutionName)
                  read_learner_list()
                 
                })
         
        const read_learner_list = ()=>{
                    is_loading.value = true
                    axios
                      .get(`${config.API_URL}/learners_list_by_institution_id/${institutionId}`)
                      .then((response)=>{
                         learnerList.value = response.data
                         console.log(learnerList.value)
                        //  console.log("user id is "+userId)
                         is_loading.value = false
                      })
        }

        const submitAttendance = ()=>{
            console.log(learnerList.value.length)

            learnerList.value.forEach((learner, index) => {
                     
                     axios
                       .post(`${config.API_URL}/log_student_attendance`,
                       {
                          classId:learner.userDetails.classId,
                          learnerId:learner.userDetails._id,
                          institutionId: learner.institution_id,
                          isPresent: learner.attendanceDetails
                       }).then((response)=>{
                           if(response.status === 201){
                            Swal
                           .fire({
                            title: "Information",
                            text:response.data.message,
                            icon:"success"
                           })
                               .then((ok)=>{
                                  if(ok){
                                    router.push({path:"/attendance_report"})
                                  }     
                               })
                           }
                       }).catch((error)=>{
                        
                       })
                       
                });

        }
    

        return{
            read_learner_list,  learnerList, institutionId, institutionName, userId,
            is_loading, attendanceDetails, submitAttendance, 

        }
    }

}

</script>