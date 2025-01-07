<template>
    <h3>{{ menu.updateAllergies.name }}</h3>
    <template v-if="loadingUser">
        <p>Loading User...</p>
    </template>
    <template v-else>
        <ErrorComponent v-if="errorFetchingUser" :error="errorFetchingUser" />
        <template v-else>
            <form @submit.prevent="handleSubmit" novalidate>
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
                <button type="submit" class="m-2">{{ menu.updateAllergies.name }}</button>
            </form>
            <ErrorComponent v-if="errorUpdatingAllergies" :error="errorUpdatingAllergies" />
        </template>
    </template>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { getUserById, updateUserAllergies } from '../axios/axiosInstance';
import { menu } from '../constants/menu';
import { errorMessages } from '../constants/errorMessages';
import ErrorComponent from './ErrorComponent.vue';

const store = useStore();
const props = defineProps(['id']);

const user = ref(null);
const loadingUser = ref(true);
const errorFetchingUser = ref(null);
const errorUpdatingAllergies = ref(null);

const handleSubmit = async () => {
    try {
        await updateUserAllergies(props.id, { allergies: user.value.allergies });
        errorUpdatingAllergies.value = null;
    } catch (error) {
        errorUpdatingAllergies.value = errorMessages.errorUpdatingAllergies;
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