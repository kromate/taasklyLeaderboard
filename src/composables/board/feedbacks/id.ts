
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'



export const useFetchBoardFeedbackById = () => {
	const feedback = ref({} as any)
	const loading = ref(false)

		const fetchBoardFeedbackById = async (board_id:string, id:string) => {
		if (feedback.value.length > 0) return
        loading.value = true
        try {
			await getSingleFirestoreSubDocument('boards', board_id, 'feedbacks', id, feedback)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, feedback, fetchBoardFeedbackById }
}

