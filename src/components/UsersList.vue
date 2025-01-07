<template>
    <template v-if="loadingUsers">
        <p>Loading Users...</p>
    </template>
    <template v-else>
        <ErrorComponent v-if="usersError" :error="usersError" />
        <template v-else>
            <table v-if="users.length">
                <thead>
                    <tr>
                        <th class="p-4">Name</th>
                        <th class="p-4">Email</th>
                        <th class="p-4">Phone</th>
                        <th class="p-4">Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td class="px-4">{{ user.name }}</td>
                        <td class="px-4">{{ user.email}}</td>
                        <td class="px-4">{{ user.phone }}</td>
                        <td class="flex items-center gap-2 px-4">
                            <template v-for="(item, key) in menu" :key="key">
                                <router-link v-if="item.slug" :to="`${item.path}/${user.id}`">
                                    {{ item.slug }}
                                </router-link>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <template v-else>
                <p>No Users to Show.</p>
            </template>
        </template>
    </template>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getUsers } from '../axios/axiosInstance';
import { menu } from '../constants/menu';
import { errorMessages } from '../constants/errorMessages';
import ErrorComponent from './ErrorComponent.vue';

const users = reactive([]);
const loadingUsers = ref(true);
const usersError = ref(null);

onMounted(async () => {
    try {
        const data = await getUsers();
        users.push(...data);
        usersError.value = null;
    } catch (error) {
        usersError.value = errorMessages.errorFetchingUsers;
    } finally {
        loadingUsers.value = false;
    }
})
</script>