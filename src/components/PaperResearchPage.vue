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
        ></v-data-table>
      </v-card>
    </v-container>
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue';
import { mockPapers } from "@/mockPapers.js";

const search = ref('');
const papers = mockPapers;

const headers = [
  { text: 'ID', value: 'id', align: 'start', sortable: true },
  { text: 'Filename', value: 'filename' },
  { text: 'Upload Date', value: 'upload_date' },
];
</script>
