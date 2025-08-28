<template>
  <div
    class="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
      <button
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        aria-label="Close modal"
      >
        ✕
      </button>

      <h3 class="text-2xl font-semibold mb-4">Izmeni komentar</h3>

      <form @submit.prevent="submitEdit" class="space-y-4">
        <div>
          <label for="comment" class="block mb-1 font-medium">Komentar</label>
          <textarea
            id="comment"
            v-model="comment"
            required
            rows="4"
            class="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label for="rating" class="block mb-1 font-medium">Ocena (1-5)</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            v-model.number="rating"
            required
            class="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Otkaži
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sačuvaj
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

interface Props {
  commentToEdit: {
    commentId: number
    comment: string
    rating: number
  }
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'commentEdited'])

const comment = ref(props.commentToEdit.comment)
const rating = ref(props.commentToEdit.rating)

watch(
  () => props.commentToEdit,
  (newVal) => {
    comment.value = newVal.comment
    rating.value = newVal.rating
  },
  { immediate: true }
)

const closeModal = () => emit('close')

const submitEdit = async () => {
  if (rating.value < 1 || rating.value > 5) {
    toast.error('Оцена мора бити између 1 и 5')
    return
  }

  try {
    await axios.put(`http://localhost:3000/api/comment/${props.commentToEdit.commentId}`, {
      comment: comment.value,
      rating: rating.value,
    })
    toast.success('Komentar je uspešno izmenjen')
    emit('commentEdited')
    closeModal()
  } catch (err) {
    toast.error('Greška pri izmenama komentara')
  }
}
</script>
