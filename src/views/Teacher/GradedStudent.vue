
  
  <template>
    <div class="container mx-auto m-5 rounded-lg border-1 border-gray-600 px-3">
      <div class="w-full flex justify-between">
        <div>
          <button
            @click="exportToPDF"
            class="rounded-2xl bg-emerald-700 hover:bg-emerald-600 hover:shadow-md w-48 flex items-center text-white py-2 px-2"
          >
            <DocumentArrowDownIcon class="h-6 w-6 mr-3"></DocumentArrowDownIcon>
            <p class="text-sm">Export to pdf</p>
          </button>
        </div>
        <div class="relative w-96 mb-6">
          <input
            type="text"
            v-model="searchValue"
            placeholder="Find"
            class="px-3 py-3 placeholder-black text-gray-700 border border-gray-700 bg-white rounded text-sm shadow-sm focus:outline-none w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
  
      <div v-if="!is_loading">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                First Name
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                Grades
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider">
                Teacher Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in learnerList" :key="item.learnerUsername" class="bg-white">
              <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ item.learnerUsername }}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ item.learnerFirstName }}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ item.learnerLastName }}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">
                <div v-for="grade in item.grades" :key="grade.subjectName">
                  <p>{{ grade.subjectName }}: {{ grade.score }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b text-xs border-gray-200">{{ getTeacherName(item) }}</td>
            </tr>
          </tbody>
        </table>
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
import { DocumentArrowDownIcon, UserPlusIcon, PlusIcon, EyeSlashIcon, EyeIcon, PencilIcon, Cog6ToothIcon, ArchiveBoxArrowDownIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default{

    components:{
        DocumentArrowDownIcon, UserPlusIcon, PlusIcon, EyeSlashIcon, EyeIcon, PencilIcon, Cog6ToothIcon, ArchiveBoxArrowDownIcon, PencilSquareIcon, PlusCircleIcon
    },

    setup(){
                const is_loading = ref(false)
                const learnerList = ref([])
                const searchField = ref("");
                const searchValue = ref("");
                let institutionId = ref(null)
                let institutionName = ref(null)
    
                const userId = ref("")

                const headers = [
                    // Define your headers as needed
                    { text: 'Learner code number', value: 'learnerUsername' },
                    { text: 'Learner Name', value: 'learnerFirstName' }, 
                    { text: 'Learner Name', value: 'learnerLastName' }, 
                    { text: 'Grades', value: 'grades' }, // Add these lines
                    { text: 'Teacher Name', value: 'teacherName' },
                    ];

                    const getTeacherName = (item) => {
                    const teacherNames = item.grades.map((grade) => `${grade.teacherFirstname} ${grade.teacherLastname}`);
                    return teacherNames.join(', ');
                    };



                 const exportToPDF = ()=>{
                        const doc = new jsPDF();

                        // Set document properties
                        doc.setProperties({
                            title: 'Graded Learners Report',
                        });

                        // Add a header to the PDF
                        doc.text(`Graded Learners Report - ${institutionName}`, 20, 20);

                        // Extract data from the table
                        const data = learnerList.value.map(item => {
                            const grades = item.grades.map(grade => `${grade.subjectName}: ${grade.score}`).join(', ');
                            return [
                            item.learnerUsername,
                            item.learnerFirstName,
                            item.learnerLastName,
                            grades,
                            getTeacherName(item),
                            ];
                        });

                        // Add the table to the PDF
                        autoTable(doc, {
                            head: [headers.map(header => header.text)],
                            body: data,
                            startY: 30, // Adjust the starting Y position as needed
                        });

                        // Save the PDF or open in a new tab
                        doc.save('graded_learners_report.pdf');
                }


                const read_graded_learner = ()=>{
                    is_loading.value = true
                     axios
                       .get(`${config.API_URL}/read_student_deatils_with_grades/${institutionId}`)
                       .then((response)=>{
                          //learnerList.value = response.data
                          learnerList.value = response.data.map((item) => ({
                                ...item,
                                teacherName: getTeacherName(item),
                            }));
                          console.log(learnerList.value)
                          is_loading.value = false
                       })
                }

                onMounted(()=>{
                    institutionId = sessionStorage.getItem('institutionId')
                    institutionName = sessionStorage.getItem('institution_name')
                    console.log("org id is "+institutionId)
                    console.log("org name "+institutionName)
                    read_graded_learner()
                })

         

        return{
            searchField, searchValue, institutionId, institutionName, learnerList, userId
                ,is_loading, read_graded_learner, headers, getTeacherName, exportToPDF
        }

    }
}
</script>