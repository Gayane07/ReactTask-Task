<template>
    <nav class="p-2">
        <ul>
            <li>
                <router-link :to="menu.addUser.path">{{ menu.addUser.name }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { menu } from '../constants/menu';
</script>