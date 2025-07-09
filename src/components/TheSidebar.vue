<template>
    <nav class="w-64 p-4 fixed h-full dark:bg-dark-secondary" :style="{ backgroundColor: '#222b36' }">
      <ul>
        <li class="py-4">
          <RouterLink
            to="/"
            class="block text-white dark:text-white hover:bg-slate-600 hover:text-white rounded-lg p-3 transition duration-300 ease-in-out"
          >
            Početna
          </RouterLink>
        </li>
        <li class="py-4">
          <RouterLink
            to="/categories"
            class="block text-white dark:text-white hover:bg-slate-600 hover:text-white rounded-lg p-3 transition duration-300 ease-in-out"
          >
            Kategorije
          </RouterLink>
        </li>
        <li class="py-4">
          <RouterLink
            to="/courses"
            class="block text-white dark:text-white hover:bg-slate-600 hover:text-white rounded-lg p-3 transition duration-300 ease-in-out"
          >
            Kursevi
          </RouterLink>
        </li>
        <li class="py-4">
          <RouterLink
            to="/login"
            class="block text-white dark:text-white hover:bg-slate-600 hover:text-white rounded-lg p-3 transition duration-300 ease-in-out"
          >
            Prijava
          </RouterLink>
        </li>
        <li class="py-4">
          <RouterLink
            to="/register"
            class="block text-white dark:text-white hover:bg-slate-600 hover:text-white rounded-lg p-3 transition duration-300 ease-in-out"
          >
            Registracija
          </RouterLink>
        </li>
        <!-- Dodaj druge linkove po potrebi -->
      </ul>
    </nav>
</template>
  
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
  
<style scoped>
</style>
  