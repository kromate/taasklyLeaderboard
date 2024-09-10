import { increment, arrayUnion, arrayRemove } from 'firebase/firestore'
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'
import { useUser } from '@/composables/auth/user'




export const useUpdateBoardMemberPoint = () => {
	const feedback = ref({} as any)
    const loading = ref(false)
    const { currentUserId } = useUser()

    const increasePoint = async (board_id: string, member_id: string) => {
        loading.value = true
        await updateFirestoreSubDocument('boards', board_id, 'members', member_id, { points: increment(1), updated_at: new Date().toISOString() })
        loading.value = false
    }
    
    const decreasePoint = async (board_id: string, member_id: string) => {
        loading.value = true
        await updateFirestoreSubDocument('boards', board_id, 'members', member_id, { points: increment(-1), updated_at: new Date().toISOString() })
        loading.value = false
    }



	return { loading, feedback, increasePoint, decreasePoint }
}