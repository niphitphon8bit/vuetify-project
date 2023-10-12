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
          :items="papers"
          :search="search"
        >
          <!-- Use the item slot to customize row rendering -->
          <template v-slot:item="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td> <!-- Display row number -->
              <td><a :href="item.filepath" download>{{ item.filename }}</a></td>
              <td>{{ item.upload_date }}</td>
              <!-- Add a download button at the end of each row -->
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
import { ref,onMounted } from 'vue';
// import { formatDate } from 'vuetify/lib/util/helpers'
import axios from 'axios';

const papers = ref([]);

//mock data
// import { mockPapers } from "@/mockPapers.js";
// const papers = mockPapers;

const search = ref('');

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

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/list-papers');  // Replace with your backend endpoint
     // Format the upload_date for each paper
     papers.value = response.data.map(paper => ({
      ...paper,
      upload_date: formatDate(paper.upload_date)
    }));

    console.log('response', response);
    // papers.value = response.data;  // Assuming the backend returns an array of papers
  } catch (error) {
    console.error("Error fetching papers:", error);
  }
});
</script>
