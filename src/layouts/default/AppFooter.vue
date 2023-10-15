<template>
  <v-footer dark padless>
    <v-card flat tile class="secondary white--text text-center">
      <v-card-text>
        <v-row no-gutters>
          <v-col
            v-for="(image, index) in images"
            :key="index"
            class="d-flex justify-center align-center"
          >
            <v-img :max-height="image.maxHeight" :max-width="image.maxWidth" :src="image.src"></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Address: Room 402, Boonrod Binson Bldg. Department of Electrical Engineering Faculty of Engineering, Chulalongkorn University 254 Phayathai Road, Wangmai, Pathumwan, Bangkok 10330 Thailand
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ currentYear }} — <strong>FACTORI 4.0 Eramus +</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style scoped>
.v-card {
  width: 100%;
}
</style>

<script setup>
import { ref } from 'vue';

// Import images
import factori4Image from '@/assets/factori4-removebg-preview.png';
import icapsImage from '@/assets/ICAPS-01-removebg-preview.png';
import logoImage from '@/assets/logoEEnewForWeb2.png';
import nineImage from '@/assets/9-removebg-preview.png';
import eggImage from '@/assets/pngegg.png';

const images = ref([
  {
    src: factori4Image,
    maxHeight: "100px",
    maxWidth: "200px"
  },
  {
    src: icapsImage,
    maxHeight: "100px",
    maxWidth: "200px"
  },
  {
    src: logoImage,
    maxHeight: "100px",
    maxWidth: "200px"
  },
  {
    src: nineImage,
    maxHeight: "100px",
    maxWidth: "100px"
  },
  {
    src: eggImage,
    maxHeight: "100px",
    maxWidth: "200px"
  }
]);

const currentYear = new Date().getFullYear();
</script>

