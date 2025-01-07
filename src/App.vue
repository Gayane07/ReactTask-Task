<template>
  <router-link v-if="$route.fullPath !== '/'" to="/" class="p-2">
    Go back to Menu
  </router-link>
  
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { getAllergies } from './axios/axiosInstance';
import { useStore } from 'vuex';

const store = useStore();

onMounted(async() => {
  const allergies = [];
  const data = await getAllergies();
  allergies.push(...data);
  store.commit('setAllergies', allergies);
})
</script>
