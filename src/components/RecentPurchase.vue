<template>
  <section class="mb-12">
    <h2 class="text-3xl font-semibold text-center mb-8">Nedavne kupovine</h2>

    <div v-if="purchases?.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="purchase in purchases"
        :key="purchase.courseId"
        class="bg-white shadow-lg p-4 rounded-lg transition hover:shadow-xl flex flex-col"
      >
        <img
          :src="purchase.thumbnail?.imagePath
            ? `http://localhost:3000/assets/thumbnails/${purchase.thumbnail.imagePath}`
            : '/default-video.webp'"
          alt="Thumbnail kursa"
          class="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <h3 class="text-xl font-semibold">{{ purchase.title }}</h3>
        <p class="text-gray-600 mb-4">Kupljeno: {{ formatDate(purchase.purchasedAt) }}</p>

        <RouterLink
          :to="`/courses/${purchase.courseId}/lessons`"
          class="mt-auto bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition"
        >
          Pogledaj kurs
        </RouterLink>
      </div>
    </div>

    <p v-else class="text-gray-500 text-center">Nema nedavnih kupovina.</p>
  </section>
</template>

<script setup lang="ts">
import type { PurchasePreview } from '@/types/PurchasePreview'

defineProps<{
  purchases: PurchasePreview[] | undefined
}>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>
