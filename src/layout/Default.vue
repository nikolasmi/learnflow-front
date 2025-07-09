<template>
    <div class="flex">
      <TheSidebar class="md:block hidden" />
      <div class="md:ml-64 w-full">
        <TheHeader />
        <div class="px-9 pt-9">
          <slot />
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>
  
<style scoped></style>
  