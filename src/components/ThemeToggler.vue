<template>
  <v-btn :prepend-icon="themeIcon" @click="toggle">
    <span v-if="showText">toggle theme</span>
  </v-btn>
</template>

<script setup>
import { useTheme, useDisplay } from 'vuetify/lib/framework.mjs';
import { ref } from 'vue';

const theme = useTheme();
const display = useDisplay();

const selectedTheme = ref(theme.global.current.value.dark ? 'dark' : 'light');
const themeIcon = ref(selectedTheme.value === 'dark' ? 'mdi-power-sleep' : 'mdi-white-balance-sunny');
const showText = ref(display.mdAndUp);

function toggle() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
