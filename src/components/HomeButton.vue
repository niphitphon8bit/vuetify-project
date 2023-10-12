<template>
  <v-btn @click="handleClick">
    Home
  </v-btn>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const handleClick = () => {
  if (route.path === '/') {
    scrollTo('firstSection'); // Replace 'targetElementId' with the ID of the element you want to scroll to
  } else {
    router.push('/');
  }
}

function scrollTo(n) {
  const element = document.getElementById(n);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: 'center'
    });
  }
}
</script>
