import type { Profile } from '@/types/Profile'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile | null>(null)
    const isLoaing = ref(false)
    const setProfile = (p: Profile) => {
        profile.value = p
    }

    const getProfile = async () => {
        isLoaing.value = true
        try {
            //const { data } = await axios.get<Profile>(`http://localhost:3000/api/user/${id}`)
        } catch (e) {

        } finally {
            isLoaing.value = false
        }
    }

    return { profile, setProfile, getProfile, isLoaing }
})