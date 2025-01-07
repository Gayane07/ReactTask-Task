<template>
    <UpdatePhoneContainer :id="id" />
</template>

<script setup>
import UpdatePhoneContainer from '../components/UpdatePhoneContainer.vue';
defineProps(['id']);
</script>