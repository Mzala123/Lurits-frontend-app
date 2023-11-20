<template>

    <div class="container mx-auto m-5 rounded-lg border-1 border-gray-600 px-3">
    
    <div class="w-full  flex justify-between">
        <div>
            <button @click="exportUserList" class="rounded-2xl bg-emerald-700 hover:bg-emerald-600 hover:shadow-md w-48 
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
        <EasyDataTable :headers="headers" :items="teacherList" :search-field="searchField" :search-value="searchValue">
            <!-- <template #item-action="{ _id, institution_id }">
    
                <div class="flex">
                    <router-link :to="'/update_institution/' + _id">
                        <PencilIcon class="stroke-blue-600 mr-2 h-5 w-5"></PencilIcon>
                    </router-link>
    
                    <router-link :to="'/add_institution_admin/' + institution_id">
                        <UserPlusIcon class="stroke-gray-600 mr-2 h-5 w-5"></UserPlusIcon>
                    </router-link>
                </div>
    
            </template> -->
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
    import { DocumentArrowDownIcon, UserPlusIcon, EyeSlashIcon, EyeIcon, PencilIcon, ArchiveBoxArrowDownIcon } from '@heroicons/vue/24/outline';
    import jsPDF from 'jspdf'
    import autoTable from 'jspdf-autotable'
    
    export default{
        components:{DocumentArrowDownIcon, UserPlusIcon, EyeSlashIcon, PencilIcon, EyeIcon, ArchiveBoxArrowDownIcon
            },
    
        setup(){
            const is_loading = ref(false)
                const teacherList = ref([])
                const searchField = ref("");
                const searchValue = ref("");
                let institutionId = ref(null)
    
                const headers = ([
                  {text: "Username", value: "userDetails.username", sortable: true },
                  {text: "National Id", value: "learnerDocs.nationalId", sortable: true },
                  {text: "Firstname", value: "learnerDocs.firstname", sortable: true },
                  {text: "Lastname", value: "learnerDocs.lastname", sortable: true },
                  {text: "Gender", value: "learnerDocs.gender", sortable: true },
                  {text: "Place of residence", value: "learnerDocs.place_residence", sortable: true },
                  ]
                )
    
    
                onMounted(()=>{
                  institutionId = sessionStorage.getItem('institutionId')
                  console.log("org id is "+institutionId)
                  read_teacher_list()
    
                })
                const read_teacher_list = ()=>{
                    is_loading.value = true
                    axios
                      .get(`${config.API_URL}/teachers_list_by_institution_id/${institutionId}`)
                      .then((response)=>{
                         teacherList.value = response.data
                         console.log(teacherList.value)
                         is_loading.value = false
                      })
                }
    
                
                return{
                    read_teacher_list,
                    is_loading, searchValue, searchField, institutionId, headers, teacherList
                }
            
        }
    }
    
    </script>