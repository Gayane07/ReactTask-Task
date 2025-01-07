<template>
    <UpdateEmailContainer :id="id" />
</template>

<script setup>
import UpdateEmailContainer from '../components/UpdateEmailContainer.vue';
defineProps(['id']);
</script>