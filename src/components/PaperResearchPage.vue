<template>
  <v-responsive>
    <v-container>
      <v-card>
        <v-card-title>
          Paper Research
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items-length="totalItems"
          :items="allItems"
          :search="search"
          class="elevation-1"
          item-value="filename"
          :loading="loading"
        >
          <template v-slot:item="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>
              <td><a :href="item.filepath" download>{{ item.filename }}</a></td>
              <td>{{ formatDate(item.upload_date) }}</td>
              <td>
                <v-btn small color="primary" :href="item.filepath" download>Download</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-responsive>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// import axios from 'axios';
// const apiUrl = import.meta.env.VITE_BACKEND_URL;

const allItems = ref([
  { filename: 'ebook.pdf', filepath: '/uploads/research_papers/ebook.pdf', upload_date: '2023-10-21' },
  { filename: 'webpage-2105676 Instrumentation in Chemical Process Course Syllabus-oct18.docx', filepath: '/uploads/research_papers/webpage-2105676 Instrumentation in Chemical Process Course Syllabus-oct18.docx', upload_date: '2023-10-21' },
  { filename: 'webpage-2105472 Process Dynamics and Control Course Syllabus-oct18.docx', filepath: '/uploads/research_papers/webpage-2105472 Process Dynamics and Control Course Syllabus-oct18.docx', upload_date: '2023-10-21' },
  { filename: 'webpage-2102435 Industrial Automation Course Syllabus-oct18.docx', filepath: '/uploads/research_papers/webpage-2102435 Industrial Automation Course Syllabus-oct18.docx', upload_date: '2023-10-21' },
  { filename: 'webpage-2102435 Industrial Automation Course Syllabus.docx', filepath: '/uploads/research_papers/webpage-2102435 Industrial Automation Course Syllabus.docx', upload_date: '2023-10-15' },
  { filename: 'webpage-2105472 Process Dynamics and Control Course Syllabus.docx', filepath: '/uploads/research_papers/webpage-2105472 Process Dynamics and Control Course Syllabus.docx', upload_date: '2023-10-10' },
  { filename: 'webpage-2105676 Instrumentation in Chemical Process Course Syllabus.docx', filepath: '/uploads/research_papers/webpage-2105676 Instrumentation in Chemical Process Course Syllabus.docx', upload_date: '2023-10-05' },
  { filename: 'webpage-Accreditation.docx', filepath: '/uploads/research_papers/webpage-Accreditation.docx', upload_date: '2023-09-25' },
  { filename: 'webpage-Center of Excellence.docx', filepath: '/uploads/research_papers/webpage-Center of Excellence.docx', upload_date: '2023-09-20' },
  { filename: 'webpage-Courses Lab (CPP-Internships2).docx', filepath: '/uploads/research_papers/webpage-Courses Lab (CPP-Internships2).docx', upload_date: '2023-09-15' },
  { filename: 'webpage-ECTI DAMT and NCON 2023.docx', filepath: '/uploads/research_papers/webpage-ECTI DAMT and NCON 2023.docx', upload_date: '2023-09-10' },
  { filename: 'webpage-Inaugural Day.docx', filepath: '/uploads/research_papers/webpage-Inaugural Day.docx', upload_date: '2023-09-05' },
  { filename: 'webpage-Lists of Publications.docx', filepath: '/uploads/research_papers/webpage-Lists of Publications.docx', upload_date: '2023-09-01' },
  { filename: 'webpage-MOU.docx', filepath: '/uploads/research_papers/webpage-MOU.docx', upload_date: '2023-08-28' },
  { filename: 'webpage-Promoting new Curriculum.docx', filepath: '/uploads/research_papers/webpage-Promoting new Curriculum.docx', upload_date: '2023-08-25' },
  { filename: 'webpage-Round TableECTI ICA-SYMP 2023.docx', filepath: '/uploads/research_papers/webpage-Round TableECTI ICA-SYMP 2023.docx', upload_date: '2023-08-20' },
  { filename: 'webpage-Second Training in Asia at CU (PPP-Train2).docx', filepath: '/uploads/research_papers/webpage-Second Training in Asia at CU (PPP-Train2).docx', upload_date: '2023-08-15' },
  { filename: 'webpage-Seminar for CU (CPP-Seminar2).docx', filepath: '/uploads/research_papers/webpage-Seminar for CU (CPP-Seminar2).docx', upload_date: '2023-08-10' },
  { filename: 'webpage-Teaching Done by EU (Seminar 1) on April 8,22,2021.docx', filepath: '/uploads/research_papers/webpage-Teaching Done by EU (Seminar 1) on April 8,22,2021.docx', upload_date: '2023-08-05' },
  { filename: 'webpage-Training in EU at the University (PPP-Train1) on March 5-April 22022.docx', filepath: '/uploads/research_papers/webpage-Training in EU at the University (PPP-Train1) on March 5-April 22022.docx', upload_date: '2023-08-01' },
  { filename: 'webpage-Vocational (VPP-Training).docx', filepath: '/uploads/research_papers/webpage-Vocational (VPP-Training).docx', upload_date: '2023-07-28' },
  { filename: 'webpage-aug22.pptx', filepath: '/uploads/research_papers/webpage-aug22.pptx', upload_date: '2023-07-25' },
  ]);
const search = ref('');
const totalItems = computed(() => allItems.value?.length || 0);
const loading = ref(false);

const headers = [
  {
    align: 'left',
    key: 'rowNumber',
    sortable: false,
    title: 'No.',
    width: '100px'
  },
  {
    key: 'filename',
    sortable: true,
    title: 'Filename',
    width: '300px'
  },
  {
    key: 'upload_date',
    sortable: true,
    title: 'Upload Date',
    width: '200px'
  },
  {
    key: 'download',
    title: 'Download',
    sortable: false, // Ensure the download button column is not sortable
    width: '150px'
  }
];
// Create a function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

// const loadItems = async () => {
//   try {
//     loading.value = true;
//     const response = await axios.get(apiUrl + '/list-papers');
//     allItems.value = response.data.items || [];
//     loading.value = false;
//     totalItems.value = allItems.value.length;
//   } catch (error) {
//     console.error("Error fetching papers:", error);
//   }
// };

// let pollingInterval;

onMounted(() => {
  // Load items immediately on component mount
  // loadItems();
  // pollingInterval = setInterval(loadItems, 10000); // Poll every 10 seconds
});

// onUnmounted(() => {
  // clearInterval(pollingInterval); // Clear the interval when the component is destroyed
// });

</script>
