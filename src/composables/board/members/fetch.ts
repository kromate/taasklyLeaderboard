import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'


export const useFetchBoardMembers = () => {
	const members = ref([] as any)
	const loading = ref(false)

	const fetchBoardMembers = async (boardId:string) => {
		loading.value = true

			try {
				await getFirestoreSubCollection('boards', boardId, 'members', members)
				loading.value = false
			} catch (e: any) {
				loading.value = false
				useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchBoardMembers' })
			}
	}
	return { loading, members, fetchBoardMembers }
}
