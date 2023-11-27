<template>

    <div class="container mx-auto mt-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 px-4">

            <div class="bg-slate-100 rounded-lg mb-6 shadow-md">
                <p class="items-center text-lg my-4 mx-4 text-black">Graph representing total number of learners at the institution and categorised based on gender</p>
                <div id="chart1" class="chart-container">
                <apexchart
                    type="bar"
                    :options="learnerChartOptions"
                    :series="learner_series"
                ></apexchart>
                </div>
            </div>


            <div class="bg-slate-100 rounded-lg mb-6 shadow-md">
                <p class="items-center text-lg my-4 mx-4 text-black">Graph representing total number of teachers at the institution and categorised based on gender</p>
                <div id="chart1" class="chart-container">
                <apexchart
                    type="bar"
                    :options="teacherChartOptions"
                    :series="teacher_series"
                ></apexchart>
                </div>
            </div>

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
        const userStore = useUserStore.getUserId
        const learner_gender = ref([])
        const learner_series = ref([])
        const teacher_gender = ref([])
        const teacher_series = ref([])
        let institutionId = ref([])

        const learnerChartOptions = {
            chart: {
                    type: 'bar',
                    height: 300
                    },
                    title: {
                    text: 'Graphical Analysis of all learners at the institution by gender!',
                    align: 'center',
                    },
                    dataLabels: {
                    enabled: true
                    },
                    grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5,
                    },
                    }
        }

        const teacherChartOptions = {
            chart: {
                    type: 'bar',
                    height: 300
                    },
                    title: {
                    text: 'Graphical Analysis of all teachers at the institution by gender!',
                    align: 'center',
                    },
                    dataLabels: {
                    enabled: true
                    },
                    grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5,
                    },
                    }
        }

        const learners_by_gender_by_institution_id = ()=>{
            axios
              .get(`${config.API_URL}/learners_by_gender_by_institution_id/${institutionId}`)
              .then((response)=>{
                if(response.status === 200){
                    learner_gender.value = [...response.data.genderCounts]
                    console.log(learner_gender)
                    let _data = []
                    learner_gender.value.forEach(learner=>{
                        _data.push({
                            y: learner.count,
                            x: learner.gender
                        })
                    })
                    learner_series.value = [
                        {
                            name:'count',
                            data: _data
                        }
                    ]
                     
                }
              })
        }

        const teachers_by_gender_by_institution_id =()=>{
            axios
             .get(`${config.API_URL}/teachers_by_gender_by_institution_id/${institutionId}`)
             .then((response)=>{
                if(response.status === 200){
                    teacher_gender.value =[...response.data.genderCounts]
                    console.log(teacher_gender)
                    let _data = []
                    teacher_gender.value.forEach(teacher=>{
                        _data.push({
                            y:teacher.count,
                            x:teacher.gender
                        })
                    })
                    teacher_series.value = [
                        {
                            name:'count',
                            data:_data
                        }
                    ]
                }
             })

        }



        onMounted(()=>{
            institutionId = sessionStorage.getItem('institutionId')
            learners_by_gender_by_institution_id(),
            teachers_by_gender_by_institution_id()
        })

        return {
            learner_gender,institutionId,
            learners_by_gender_by_institution_id, learnerChartOptions, learner_series,
            teachers_by_gender_by_institution_id, teacher_gender, teacher_series,
            teacherChartOptions
        }



    }
}
</script>