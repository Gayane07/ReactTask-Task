<template>
    <h3>{{ menu.updateEmail.name }}</h3>
    <template v-if="loadingUser">
        <p>Loading User...</p>
    </template>
    <template v-else>
        <ErrorComponent v-if="errorFetchingUser" :error="errorFetchingUser" />
        <template v-else>
            <form @submit.prevent="handleSubmit" novalidate class="flex flex-col justify-center items-center gap-2 m-2 w-80">
                <label for="email">Email</label>
                <input
                    v-model="user.email"
                    type="email" 
                    name="email" 
                    id="email"
                    class="w-full p-2 rounded-md"
                    @blur="validateField('email')"
                >
                <span class="text-red-500 text-xs text-end h-4 flex-wrap">{{ errors.email }}</span>
                <button type="submit" class="m-2">{{ menu.updateEmail.name }}</button>
            </form>
            <ErrorComponent v-if="errorUpdatingEmail" :error="errorUpdatingEmail" />
        </template>
    </template>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { getUserById, updateUserEmail } from '../axios/axiosInstance';
import { menu } from '../constants/menu';
import { errorMessages } from '../constants/errorMessages';
import { validate } from '../utils/validation';
import ErrorComponent from './ErrorComponent.vue';

const props = defineProps(['id']);
const user = ref(null);
const errors = reactive({ email: null });
const loadingUser = ref(true);
const errorUpdatingEmail = ref(null);
const errorFetchingUser = ref(null);

const validateField = (field) => {
  errors[field] = validate(field, user.value);
};

const validateForm = () => {
  Object.keys(errors).forEach((field) => {
    validateField(field);
  });
  return Object.values(errors).every((value) => value === null);
};

const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
        await updateUserEmail(props.id, { email: user.value.email });
        user.value.email = null;
        errorUpdatingEmail.value = null;
    } catch (error) {
        errorUpdatingEmail.value = errorMessages.errorUpdatingEmail;
    }
}

onMounted(async () => {
    try {
        user.value = await getUserById(props.id);
        errorFetchingUser.value = null;
    } catch (error) {
        errorFetchingUser.value = errorMessages.errorFetchingUser;
    } finally {
        loadingUser.value = false;
    }
})
</script>