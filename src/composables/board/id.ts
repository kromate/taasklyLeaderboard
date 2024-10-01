
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'

	const board = ref({} as any)
	const boardArr = ref([])
	const loading = ref(false)


export const useFetchBoardById = () => {
	const fetchUserBoardById = async (id: string) => {
		loading.value = true
		try {
			await getFirestoreCollectionWithWhereQuery('boards', boardArr, { name: 'custom_link', operator: '==', value: id })
				if (boardArr.value.length > 0) {
					board.value = boardArr.value[0]
			} else {
				throw createError({ statusCode: 404, statusMessage: 'Board Not Found' })
			}
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchUserBoardById' })
		}
	}
	return { loading, board, fetchUserBoardById }
}

export const useFetchUserDoashboardBoardById = () => {
		const fetchUserBoardById = async (id:string) => {
		if (board.value.length > 0) return
        loading.value = true
        try {
			await getSingleFirestoreDocument('boards', id, board)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchUserBoardById' })
		}
		}

	const updatePhoto = async (url: string, boardId: string) => {
        try {
            loading.value = true
            await updateFirestoreDocument('boards', boardId, {
                photo_url: url ?? null
            })
            board.value.photo_url = url

            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Image updated successfully' })
            fetchUserBoardById(boardId)
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'updatePhoto' })
        }
    }
	return { loading, board, fetchUserBoardById, updatePhoto }
}

