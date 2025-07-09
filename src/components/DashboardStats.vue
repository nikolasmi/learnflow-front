<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
    <div class="bg-white p-6 rounded-lg shadow text-center">
      <p class="text-2xl font-bold text-blue-600">{{ stats?.totalPurchases ?? 0 }}</p>
      <p class="text-gray-700 mt-2">Kupljenih kurseva</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow text-center">
      <p class="text-2xl font-bold text-green-600">${{ stats?.totalSpent ?? '0.00' }}</p>
      <p class="text-gray-700 mt-2">Ukupno potrošeno</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow text-center">
      <p class="text-2xl font-bold text-purple-600">{{ stats?.createdCoursesCount ?? 0 }}</p>
      <p class="text-gray-700 mt-2">Moji kursevi</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow text-center">
      <p class="text-2xl font-bold text-red-600">{{ stats?.comments ?? 0 }}</p>
      <p class="text-gray-700 mt-2">Komentari</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow text-center">
      <p class="text-2xl font-bold text-yellow-600">${{ stats?.totalEarned ?? '0.00' }}</p>
      <p class="text-gray-700 mt-2">Zarada od kurseva</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DashboardData } from '@/types/DashboardData'

defineProps<{
  stats: DashboardData | null
}>()
</script>