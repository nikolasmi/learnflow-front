<template>
  <div class="max-w-5xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-8 text-center">Moj Dashboard</h1>

    <DashboardStats :stats="dashboard" />
    <RecentPurchase :purchases="dashboard?.recentPurchases" />
    <MyCourses 
      :courses="dashboard?.ownCourses"
      @openCreateModal="isCreateModalOpen = true"
      @openEditModal="openEditModal"
      @deleteCourse="deleteCourse"
    />

    <CreateCourseModal
      v-if="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @created="fetchDashboard"
    />

    <EditCourseModal
      v-if="isEditModalOpen"
      :course="selectedCourse"
      @close="isEditModalOpen = false"
      @updated="fetchDashboard"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user'
import DashboardStats from '@/components/DashboardStats.vue'
import RecentPurchase from '@/components/RecentPurchase.vue'
import MyCourses from '@/components/MyCourses.vue'
import CreateCourseModal from '@/components/CreateCourseModal.vue'
import EditCourseModal from '@/components/EditCourseModal.vue'
import type { DashboardData } from '@/types/DashboardData'

const dashboard = ref<DashboardData | null>(null)
const userStore = useUserStore()
const userId = userStore.user?.id

const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedCourse = ref<any>(null)

const fetchDashboard = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/user-dashboard/${userId}`)
    dashboard.value = response.data
  } catch (error) {
    toast.error('Greška pri dohvatanju podataka o dashboardu')
  }
}

const deleteCourse = async (courseId: number) => {
  try {
    await axios.delete(`http://localhost:3000/api/course/${courseId}`)
    toast.success('Kurs je uspešno obrisan')
    await fetchDashboard()
  } catch (error) {
    toast.error('Greška prilikom brisanja kursa')
  }
}

const openEditModal = (course: any) => {
  selectedCourse.value = {
    courseId: course.courseId,
    title: course.title,
    shortDescription: course.shortDescription ?? '',
    description: course.description ?? '',
    price: course.price ?? '0.00',
    categoryId: course.categoryId ?? 1,
    userId: userId,
  }
  isEditModalOpen.value = true
}

fetchDashboard()
</script>