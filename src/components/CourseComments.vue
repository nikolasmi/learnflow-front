<template>
  <section class="max-w-5xl mx-auto mt-12 mb-12">
    <h2 class="text-3xl font-bold mb-8 text-center">Komentari</h2>

    <div class="flex justify-end mb-6">
      <button
        :disabled="!isCoursePurchased()"
        @click="tryOpenAddCommentModal"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Dodaj komentar
      </button>
    </div>

    <AddCommentModal
      v-if="showModal"
      :courseId="courseId"
      :userId="userId"
      @close="showModal = false"
      @commentAdded="fetchComments"
    />

    <EditCommentModal
      v-if="showEditModal && commentToEdit"
      :commentToEdit="commentToEdit"
      @close="showEditModal = false"
      @commentEdited="() => { showEditModal = false; fetchComments(); }"
    />

    <div v-if="loading" class="text-center text-gray-500">Učitavanje komentara...</div>

    <div v-else-if="comments.length === 0" class="text-center text-gray-500">
      Još nema komentara za ovaj kurs.
    </div>

    <ul v-else class="space-y-6">
      <li
        v-for="comment in comments"
        :key="comment.commentId"
        class="border border-gray-300 rounded-lg p-4 shadow bg-white"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="font-semibold text-gray-800">{{ comment.user.name }}</span>
            <span class="text-gray-500 text-sm ml-2">
              ({{ formatDate(comment.createdAt) }})
            </span>
          </div>
          <div class="text-yellow-500 font-bold text-lg">
            ★ {{ comment.rating }}
          </div>
        </div>

        <p class="text-gray-700 mb-4">{{ comment.comment }}</p>

        <div v-if="comment.user.userId === userId" class="flex gap-3 justify-end">
          <button
            class="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
            @click="() => openEditModal(comment)"
          >
            Izmeni
          </button>
          <button
            class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            @click="deleteComment(comment.commentId)"
          >
            Obriši
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user'
import type { Comment } from '@/types/Comment'
import AddCommentModal from '@/components/AddCommentModal.vue'
import EditCommentModal from './EditCommentModal.vue'

interface Props {
  courseId: number
}

const props = defineProps<Props>()

const comments = ref<Comment[]>([])
const loading = ref(false)
const showModal = ref(false)
const showEditModal = ref(false)
const commentToEdit = ref<{ commentId: number; comment: string; rating: number } | null>(null)

const userStore = useUserStore()
const userId = userStore.user?.id ?? 0
const userPurchases = ref<number[]>([])

const fetchUserPurchases = async () => {
  if (!userId) {
    userPurchases.value = []
    return
  }
  try {
    const res = await axios.get(`http://localhost:3000/api/user-dashboard/${userId}`)
    userPurchases.value = res.data.recentPurchases.map((p: any) => Number(p.courseId))
  } catch {
    userPurchases.value = []
  }
}

const isCoursePurchased = () => {
  return userPurchases.value.includes(props.courseId)
}

const tryOpenAddCommentModal = () => {
  if (!isCoursePurchased()) {
    toast.warning('Morate kupiti kurs da biste dodali komentar.')
    return
  }
  showModal.value = true
}

const fetchComments = async () => {
  loading.value = true
  try {
    const response = await axios.get(`http://localhost:3000/api/comment/course/${props.courseId}`)
    comments.value = response.data
  } catch (err) {
    comments.value = []
  } finally {
    loading.value = false
  }
}

const openEditModal = (comment: Comment) => {
  commentToEdit.value = {
    commentId: comment.commentId,
    comment: comment.comment,
    rating: comment.rating
  }
  showEditModal.value = true
}

const deleteComment = async (commentId: number) => {
  if (!confirm('Da li ste sigurni da želite da obrišete ovaj komentar?')) return
  try {
    await axios.delete(`http://localhost:3000/api/comment/${commentId}`)
    toast.success('Komentar je uspešno obrisan.')
    fetchComments()
  } catch (error) {
    toast.error('Greška pri brisanju komentara.')
  }
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('sr-RS', { year: 'numeric', month: 'long', day: 'numeric' })
}

(async () => {
  await fetchUserPurchases()
  await fetchComments()
})()

watch(() => props.courseId, async () => {
  await fetchUserPurchases()
  await fetchComments()
})
</script>
