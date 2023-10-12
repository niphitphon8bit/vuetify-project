<template>
  <v-btn @click="scrollTo('firstSection')">
    Paper Research
  </v-btn>
</template>

<script setup>
function scrollTo(n){
  const element = document.getElementById(n);
element.scrollIntoView({
  behavior: "smooth",
  block: 'center'
});
}
</script>
