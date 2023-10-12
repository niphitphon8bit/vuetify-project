<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-img max-height="100px"
              max-width="100px"
      src="/src/assets/Chula_logo_with_namestyle.svg.png">

      </v-img>
    </v-app-bar-title>
    <home-button/>
    <paper-research-button/>
    <theme-toggler/>
  </v-app-bar>
</template>

<script setup>
import ThemeToggler from '@/components/ThemeToggler.vue'
import HomeButton from '@/components/HomeButton.vue'
import PaperResearchButton from '@/components/PaperResearchButton.vue'
</script>
