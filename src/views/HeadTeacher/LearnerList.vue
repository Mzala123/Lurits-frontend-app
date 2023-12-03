<template>

<div class="container mx-auto m-5 rounded-lg border-1 border-gray-600 px-3">

<div class="w-full  flex justify-between">
    <div>
        <button @click="exportLearnersList" class="rounded-2xl bg-emerald-700 hover:bg-emerald-600 hover:shadow-md w-48 
flex items-center text-white py-2 px-2">
            <DocumentArrowDownIcon class="h-6 w-6 mr-3"></DocumentArrowDownIcon>
            <p class="text-sm">Export Archived</p>
        </button>
    </div>
    <div class="relative w-96 mb-6">
        <!-- <label class="block text-gray-600 text-sm font-semibold mb-2">
Employee Id</label> -->
        <input type="text" v-model="searchValue" placeholder="Find" class="px-3 py-3 placeholder-black text-gray-700 border border-gray-700
bg-white rounded text-sm  shadow-sm focus:outline-none w-full ease-linear transition-all duration-150">
    </div>
</div>

<div v-if="!is_loading">
    <EasyDataTable :headers="headers" :items="learnerList" :search-field="searchField" :search-value="searchValue">
        <template #item-action="{userDetails }">
            <div class="flex">
                <router-link :to="'/update_user/'+userDetails._id">
                    <PencilSquareIcon class="stroke-blue-600 mr-2 h-5 w-5"></PencilSquareIcon>
                </router-link>
<!-- 
                <router-link :to="'/assign_class_learner/'+userDetails._id">
                    <Cog6ToothIcon class="stroke-gray-600 mr-2 h-5 w-5"></Cog6ToothIcon>
                </router-link> -->
            </div>
        </template>
    </EasyDataTable>
</div>
<div v-else class="animate-pulse text-center py-16 text-sm">
    Fetching data...
</div>
</div>

</template>

<script>

import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import config from '../../../config'
import Swal from 'sweetalert2'
import { DocumentArrowDownIcon, UserPlusIcon, EyeSlashIcon, EyeIcon, PencilIcon, Cog6ToothIcon, ArchiveBoxArrowDownIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default{
    components:{DocumentArrowDownIcon, UserPlusIcon, EyeSlashIcon, PencilIcon, EyeIcon, ArchiveBoxArrowDownIcon, Cog6ToothIcon, PencilSquareIcon
        },

    setup(){
        const is_loading = ref(false)
            const learnerList = ref([])
            const searchField = ref("");
            const searchValue = ref("");
            let institutionId = ref(null)
            let institutionName = ref(null)

            const userId = ref("")

            const headers = ([
              {text: "Learner code", value: "userDetails.username", sortable: true },
              {text: "National Id", value: "learnerDocs.nationalId", sortable: true },
              {text: "Firstname", value: "learnerDocs.firstname", sortable: true },
              {text: "Lastname", value: "learnerDocs.lastname", sortable: true },
              {text: "Gender", value: "learnerDocs.gender", sortable: true },
              {text: "Place of residence", value: "learnerDocs.place_residence", sortable: true },
              {text: "Actions", value: "action", sortable: true}
              ]
            )

            const exportLearnersList = ()=>{
                const doc = new jsPDF()
                const rows = []
                learnerList.value.forEach(list=>{
                    const temp = [list.userDetails.username,list.learnerDocs.nationalId, list.learnerDocs.firstname+' '+list.learnerDocs.lastname,
                     list.learnerDocs.gender, list.learnerDocs.place_residence]
                    rows.push(temp)
                })
                doc.text(institutionName+" Institution",10, 10)
                doc.text('All learners list', 10, 20)
                doc.line(0,35,400,35)
                autoTable(doc, {
                    head: [['Learner code number', 'National Id', 'Name of learner', 'Gemder', 'Place of residence']],
                    margin:{top:50},
                    body:[...rows]
                })
               doc.save(institutionName+' Learners list.pdf')

            }


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
                     console.log("user id is "+userId)
                     is_loading.value = false
                  })
            }

            
            return{
                read_learner_list,
                learnerList, is_loading, searchValue, searchField, institutionId, headers,
                exportLearnersList, institutionName, userId
            }
        
    }
}

</script>