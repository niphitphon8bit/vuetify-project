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
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const allItems = ref([]);
const search = ref('');
const totalItems = computed(() => allItems.value?.length || 0);
const loading = ref(true);

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

const loadItems = async () => {
  try {
    loading.value = true;
    console.log(apiUrl);
    const response = await axios.get(apiUrl + '/list-papers');
    allItems.value = response.data.items || [];
    loading.value = false;
    totalItems.value = allItems.value.length;
    console.log(allItems.value);
  } catch (error) {
    console.error("Error fetching papers:", error);
  }
};

onMounted(loadItems);

</script>
