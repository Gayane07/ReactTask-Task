<template>
    <h3>{{ menu.addUser.name }}</h3>
    <form @submit.prevent="handleSubmit" novalidate class="flex flex-col justify-center items-center gap-2">
        <div class="relative flex flex-col justify-center items-start gap-1 w-1/2">
            <label for="name">Name</label>
            <input
                v-model="user.name"
                type="text" 
                name="name" 
                id="name"
                class="w-full p-2 rounded-md"
                @blur="validateField('name')"
            >
            <span class="absolute top-1 right-0 text-red-500 text-xs text-end">{{ errors.name }}</span>
        </div>

        <div class="relative flex flex-col justify-center items-start gap-1 w-1/2">
            <label for="email">Email</label>
            <input
                v-model="user.email"
                type="email" 
                name="email" 
                id="email"
                class="w-full p-2 rounded-md"
                @blur="validateField('email')"
            >
            <span class="absolute top-1 right-0 text-red-500 text-xs text-end">{{ errors.email }}</span>
        </div>
        
        <div class="relative flex flex-col justify-center items-start gap-1 w-1/2">
            <label for="phone">Phone</label>
            <input
                v-model="user.phone"
                type="text" 
                name="phone" 
                id="phone" 
                class="w-full p-2 rounded-md"
                @blur="validateField('phone')"
            >
            <span class="absolute top-1 right-0 text-red-500 text-xs text-end">{{ errors.phone }}</span>
        </div>
        <div class="grid grid-cols-4 gap-2 m-2">
            <span 
                v-for="allergy in store.state.allergies"
                :key="allergy"
                class="flex gap-1"
            >
                <label :for="allergy" class="cursor-pointer">{{ allergy }}</label>
                <input
                    v-model="user.allergies"
                    type="checkbox"
                    :name="allergy"
                    :id="allergy"
                    :value="allergy"
                    class="cursor-pointer"
                >
            </span>
        </div>
        <button type="submit">Add User</button>
    </form>
    <ErrorComponent v-if="errorAddingUser" :error="errorAddingUser" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { addUser } from '../axios/axiosInstance';
import { validate } from '../utils/validation';
import { menu } from '../constants/menu';
import { errorMessages } from 'vue/compiler-sfc';
import ErrorComponent from './ErrorComponent.vue';

const store = useStore();

const user = reactive({
    name: null,
    email: null,
    phone: null, 
    allergies: []
});
const errors = reactive({
    name: null,
    email: null,
    phone: null
});
const errorAddingUser = ref(null);

const validateField = (field) => {    
  errors[field] = validate(field, user);
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
        await addUser(user);
        errorAddingUser.value = null;
        user.name = null;
        user.email = null;
        user.phone = null;
        user.allergies = [];
    } catch (error) {
        errorAddingUser.value = errorMessages.errorAddingUser;
    }
}
</script>