<template>
    <h3>{{ menu.updatePhone.name }}</h3>
    <template v-if="loadingUser">
        <p>Loading User...</p>
    </template>
    <template v-else>
        <ErrorComponent v-if="errorFetchingUser" :error="errorFetchingUser" />
        <template v-else>
            <form @submit.prevent="handleSubmit" novalidate class="flex flex-col justify-center items-center gap-2 m-2 w-80">
                <label for="phone">Phone</label>
                <input
                    v-model="user.phone"
                    type="phone" 
                    name="phone" 
                    id="phone"
                    class="w-full p-2 rounded-md"
                    @blur="validateField('phone')"
                >
                <span class="text-red-500 text-xs text-end h-4 flex-wrap">{{ errors.phone }}</span>
                <button type="submit" class="m-2">{{ menu.updatePhone.name }}</button>
            </form>
            <ErrorComponent v-if="errorUpdatingPhone" :error="errorUpdatingPhone" />
        </template>
    </template>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { getUserById, updateUserPhone } from '../axios/axiosInstance';
import { menu } from '../constants/menu';
import { errorMessages } from '../constants/errorMessages';
import { validate } from '../utils/validation';
import ErrorComponent from './ErrorComponent.vue';

const props = defineProps(['id']);
const user = ref(null);
const errors = reactive({ phone: null });
const loadingUser = ref(true);
const errorUpdatingPhone = ref(null);
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
        await updateUserPhone(props.id, { phone: user.value.phone });
        user.value.phone = null;
        errorUpdatingPhone.value = null;
    } catch (error) {       
        errorUpdatingPhone.value = errorMessages.errorUpdatingPhone;
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