<template>
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Nedavne kupovine</h2>
    <div v-if="purchases?.length" class="space-y-3">
      <div
        v-for="purchase in purchases"
        :key="purchase.courseId"
        class="p-4 border rounded-lg bg-white shadow"
      >
        <p class="text-lg font-medium">{{ purchase.title }}</p>
        <p class="text-sm text-gray-600">Kupljeno: {{ formatDate(purchase.purchasedAt) }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500">Nema nedavnih kupovina.</p>
  </section>
</template>

<script setup lang="ts">
import type { PurchasePreview } from '@/types/PurchasePreview';

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