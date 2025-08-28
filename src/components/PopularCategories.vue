<template>
  <section class="my-16" v-if="categories?.length">
    <h2 class="text-3xl font-semibold text-center mb-8">Popularne Kategorije</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="category in categories"
        :key="category.categoryId"
        :to="{ path: '/courses', query: { categoryId: category.categoryId } }"
        class="bg-gray-200 p-6 rounded-lg shadow-md cursor-pointer block hover:shadow-lg transition dark:text-black"
      >
        <h3 class="text-2xl text-center font-semibold mb-4">{{ category.name }}</h3>
      </RouterLink>
    </div>
    <div class="flex justify-center">
      <RouterLink to="/categories">
        <button class="mt-8 text-slate-900 text-xl py-2 px-4 border-2 rounded-xl bg-slate-300">
          Pogledaj sve
        </button>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from '@/types/Category'
defineProps<{ categories: Category[] | null }>()
</script>
