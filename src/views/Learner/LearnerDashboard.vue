<template>

<div class="container mx-auto mt-8">
        <div class="grid grid-cols-1.5 lg:grid-cols-1.5 gap-4 mt-8 px-4">

            <div class="bg-slate-100 rounded-lg mb-6 shadow-md">
                <p class="items-center text-lg my-4 mx-4 text-black">Graph representing learners grades</p>
                <div id="chart1" class="chart-container">
                <apexchart
                    type="bar"
                    :options="learnerGradeChartOptions"
                    :series="learner_grades_series"
                ></apexchart>
                </div>
            </div>


            <!-- <div class="bg-slate-100 rounded-lg mb-6 shadow-md">
                <p class="items-center text-lg my-4 mx-4 text-black">Graph representing total number of teachers at the institution and categorised based on gender</p>
                <div id="chart1" class="chart-container">
                <apexchart
                    type="bar"
                    :options="teacherChartOptions"
                    :series="teacher_series"
                ></apexchart>
                </div>
            </div> -->

        </div>
    </div>
 
 </template>
 
 <script>
import {HomeIcon, UserGroupIcon, UserIcon, UserCircleIcon, UsersIcon} from '@heroicons/vue/24/outline'
import {onMounted, ref, registerRuntimeCompiler} from 'vue'
import config  from '../../../config'
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts'
import { useUserStore } from '../../stores/store';
 export default{

    components:{
        apexchart: VueApexCharts
    },
 
     setup(){

        const is_loading = ref(false)
        const learner_grades = ref([])
        const learner_grades_series = ref([])
        

       
        let institutionId = ref(null)
        let institutionName = ref(null)

        const userId = ref("")
        const userStore = useUserStore()
        const learnerId = userStore.getUserId

        const learnerGradeChartOptions = {
             chart: {
                    type: 'bar',
                    height: 300
                    },
                    title: {
                    text: 'Graphical analysis of student grades!',
                    align: 'center',
                    },
                    dataLabels: {
                    enabled: true
                    },
                    grid: {
                    row: {
                        colors: ['#d1fae5', 'transparent'],
                        opacity: 0.5,
                    },
                    }
        }

        const get_list_subjects_class_learner = ()=>{
            is_loading.value = true
                    axios
                      .get(`${config.API_URL}/get_list_subjects_class_learner/${institutionId}/${learnerId}`)
                      .then((response)=>{
                         //learnerList.value = response.data
                          if(response.status === 200){
                             learner_grades.value = [...response.data[0].grades]
                             let _data = []
                             learner_grades.value.forEach(grades=>{
                                _data.push({
                                    y:grades.score,
                                    x:grades.subjectName
                                })
                             })
                             learner_grades_series.value =[
                                {
                                    name: 'score',
                                    data: _data
                                }
                             ]
                          }
                     
                      })
        }

        onMounted(()=>{
            institutionId = sessionStorage.getItem('institutionId')
            institutionName = sessionStorage.getItem('institution_name')
            console.log("org id is "+institutionId)
            console.log("org name "+institutionName)
            console.log("Learner id"+learnerId)
            get_list_subjects_class_learner()
        })


        return{
            is_loading, learner_grades_series, userId, institutionId, institutionName, learnerId,
            learner_grades, learnerGradeChartOptions

        }
         
     }
 
 }
 
 </script>