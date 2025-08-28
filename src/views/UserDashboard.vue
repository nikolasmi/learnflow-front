<template>
  <div class="max-w-5xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-8 text-center">Moj Dashboard</h1>

    <DashboardStats :stats="dashboard" />
    <RecentPurchase :purchases="dashboard?.recentPurchases" />
    <UserWishlist :courses="userWishlist" @wishlistUpdated="fetchUserWishlist" />
    <MyCourses
      :courses="dashboard?.ownCourses"
      @openCreateModal="isCreateModalOpen = true"
      @openEditModal="openEditModal"
      @deleteCourse="deleteCourse"
      @openEditThumbnailModal="openEditThumbnailModal"
      @openCourseLessons="openCourseLessons"
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

    <EditThumbnailModal
      v-if="isEditThumbnailModalOpen && selectedCourseForThumbnail !== null"
      :course="selectedCourseForThumbnail"
      @close="isEditThumbnailModalOpen = false"
      @updated="fetchDashboard"
    />

    <CourseLessonsModal
      v-if="isLessonsModalOpen && selectedCourseForLessons"
      :course="selectedCourseForLessons"
      @close="isLessonsModalOpen = false"
      @deleteLesson="handleDeleteLesson"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user'
import DashboardStats from '@/components/DashboardStats.vue'
import RecentPurchase from '@/components/RecentPurchase.vue'
import UserWishlist from '@/components/UserWishlist.vue'
import MyCourses from '@/components/MyCourses.vue'
import CreateCourseModal from '@/components/CreateCourseModal.vue'
import EditCourseModal from '@/components/EditCourseModal.vue'
import EditThumbnailModal from '@/components/EditThumbnailModal.vue'
import type { DashboardData } from '@/types/DashboardData'
import CourseLessonsModal from '@/components/CourseLessonsModal.vue'

const dashboard = ref<DashboardData | null>(null)
const userWishlist = ref<Array<any> | null>(null)

const userStore = useUserStore()
const userId = userStore.user?.id

const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isEditThumbnailModalOpen = ref(false)
const isLessonsModalOpen = ref(false)

const selectedCourseForLessons = ref<{ courseId: number; title: string } | null>(null)
const selectedCourse = ref<any>(null)
const selectedCourseForThumbnail = ref<{
  courseId: number
  title: string
  thumbnailUrl: {
    thumbnailId: number
    courseId: number
    imagePath: string
  } | null
} | null>(null)

const fetchDashboard = async () => {
  if (!userId) return
  try {
    const response = await axios.get(`http://localhost:3000/api/user-dashboard/${userId}`)
    dashboard.value = response.data
  } catch (error) {
    toast.error('Greška pri dohvatanju podataka o dashboardu')
  }
}

const fetchUserWishlist = async () => {
  if (!userId) return
  try {
    const response = await axios.get(`http://localhost:3000/api/wishlist/${userId}`)
    userWishlist.value = response.data
  } catch (error) {
    toast.error('Greška pri dohvatanju liste želja')
  }
}

const deleteCourse = async (courseId: number) => {
  if (!confirm('Da li ste sigurni da zelite da obrisete ovaj kurs?')) return
  try {
    await axios.delete(`http://localhost:3000/api/course/${courseId}`)
    toast.success('Kurs je uspešno obrisan')
    await fetchDashboard()
  } catch (error) {
    toast.error('Greška prilikom brisanja kursa')
  }
}

const openEditThumbnailModal = (course: {
  courseId: number
  title: string
  thumbnailUrl: {
    thumbnailId: number
    courseId: number
    imagePath: string
  } | null
}) => {
  selectedCourseForThumbnail.value = course
  isEditThumbnailModalOpen.value = true
}

const openEditModal = (course: any) => {
  selectedCourse.value = {
    courseId: course.courseId,
    title: course.title,
    shortDescription: course.shortDescription ?? '',
    description: course.description ?? '',
    price: course.price ?? '0.00',
    categoryId: course.categoryId ?? 0,
    userId: userId,
  }
  isEditModalOpen.value = true
}

const openCourseLessons = (course: { courseId: number; title: string }) => {
  selectedCourseForLessons.value = { courseId: course.courseId, title: course.title }
  isLessonsModalOpen.value = true
}

const handleDeleteLesson = async (lessonId: number) => {
  if (!confirm('Da li ste sigurni da zelite da obrisete ovu lekciju?')) return
  try {
    if (!selectedCourseForLessons.value?.courseId) return
    await axios.delete(
      `http://localhost:3000/api/lesson/course/${selectedCourseForLessons.value.courseId}/delete-lesson/${lessonId}`
    )
    toast.success('Lekcija je uspešno obrisana.')
    // resetuj modal da se osvezi lista lekcija
    isLessonsModalOpen.value = false
    setTimeout(() => {
      isLessonsModalOpen.value = true
    }, 100)
  } catch (error) {
    toast.error('Greška prilikom brisanja lekcije.')
  }
}

// Ovo prati user objekat i kad se učita ili promeni poziva fetchove
watch(
  () => userStore.user,
  (newUser) => {
    if (newUser?.id) {
      fetchDashboard()
      fetchUserWishlist()
    } else {
      dashboard.value = null
      userWishlist.value = null
    }
  },
  { immediate: true }
)
</script>
