<template>
    <h1 class="text-5xl font-semibold text-center mb-16">Sve kategorije</h1>
    <div class="flex">
        <input
            type="text"
            v-model="searchInput"
            placeholder="Pretrazi kategoriju..."
            class="border border-black rounded-full p-2 text-lg w-64 focus:outline-none focus:ring-2 focus:ring-black"
        />
    </div>
    <section class="my-8" v-if="categories?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="category in searchCategorie"
          :key="category.categoryId"
          class="bg-gray-200 p-6 rounded-lg shadow-md cursor-pointer"
          @click="goToCategory(category.categoryId)"
        >
          <h3 class="text-2xl text-center font-semibold mb-4">{{ category.name }}</h3>
        </div>
      </div>
    </section>
    <p v-else>Ucitavanje kategorija...</p>
</template>

<script setup lang="ts">
import type { Category } from '@/types/Category';
import axios from 'axios';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const categories = ref<Category[] | null>(null)
const searchInput = ref('')
const loading = ref(false)
const router = useRouter()

const fetchAllCategories = async () => {
    try{
        loading.value = true
        const { data } = await axios.get<Category[]>('http://localhost:3000/api/category')
        categories.value = data
    } catch (e) {
        toast.error('greska prilikom dohvatanja kategorija')        
    } finally {
        loading.value = false
    }
}

const searchCategorie = computed(() => {
    return (categories.value || []).filter((category) => category.name.toLowerCase().includes(searchInput.value.toLowerCase()))
})

const goToCategory = (categoryId: number) => {
  router.push({ path: '/courses', query: { categoryId } })
}

fetchAllCategories()
</script>