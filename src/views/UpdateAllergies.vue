<template>
    <UpdateAllergiesContainer :id="id" />
</template>

<script setup>
import UpdateAllergiesContainer from '../components/UpdateAllergiesContainer.vue';
defineProps(['id']);
</script>