<template>

        <div class="container mx-auto m-5 rounded-lg border-1 border-gray-600 px-3 overflow-auto">
                <div class="flex flex-row justify-between w-full">
                    <h2 class="text-2xl font-semibold mb-4">
                        Attendance Report
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
                           
                            <!-- <th v-for="attendance in attendanceList[0].details" :key="attendance.attendanceDate" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                                {{ attendance.attendanceDate }}
                            </th> -->

                            <template v-if="attendanceList.length > 0">
                            <th v-for="attendanceDate in attendanceList[0].details" :key="attendanceDate" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                            {{ attendanceDate.attendanceDate }}
                            </th>
                              </template>
                           
                            </tr>
                    </thead>
                        <!-- <tbody>
                            <tr v-for="(attendance, index) in attendanceList" :key="attendance.learnerId"> 
                               <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ attendance.learnerCode}}</td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ attendance.firstname}}</td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ attendance.lastname}}</td>

                                <td v-for="attendance in attendanceList[0].details" :key="attendance" class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ attendance.status }}
                               </td>

                            </tr>
                        </tbody> -->
                        <tbody>
                            <template v-if="attendanceList.length > 0">
                            <tr v-for="(learner, learnerIndex) in attendanceList" :key="learnerIndex">
                                <td v-if="learner.learnerCode" class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ learner.learnerCode }}
                                </td>
                                <td v-if="learner.firstname" class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ learner.firstname }}
                                </td>
                                <td v-if="learner.lastname" class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                {{ learner.lastname }}
                                </td>
                                <!-- Loop through details for each learner -->
                                <template v-if="learner.details">
                                <td v-for="(detail, detailIndex) in learner.details" :key="detailIndex" class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                                    {{ detail.isPresent ? 'Present' : 'Absent' }}
                                </td>
                                </template>
                            </tr>
                            </template>
                        </tbody>

                </table>



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

export default{

    setup(){

        const is_loading = ref(false)
        const attendanceList = ref("")
        let institutionId = ref(null)
        let institutionName = ref(null)
        const details = ref("")
        const userId = ref("")

        const attendance_list = ()=>{
              axios
                 .get(`${config.API_URL}/attendance_list/${institutionId}`)
                 .then((response)=>{
                    attendanceList.value = response.data
                    // details.value = attendanceList[0].value.details
                    console.log(attendanceList.value)
                    console.log(details.value)
                 })
        }


        onMounted(()=>{
                  institutionId = sessionStorage.getItem('institutionId')
                  institutionName = sessionStorage.getItem('institution_name')
                  console.log("org id is "+institutionId)
                  console.log("org name "+institutionName)
                  attendance_list()
             
                })

        return{
            is_loading, attendanceList,
            institutionId, institutionName, userId, attendance_list, details
        }
    }

}

</script>