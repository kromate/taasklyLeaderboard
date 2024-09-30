import { watchDebounced } from '@vueuse/core'
import { useCreateBoard } from './create'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)

const is_editing = ref(false)
const instructions = ref()

export const useEditBoard = () => {
    const { createBoardForm } = useCreateBoard()
    const isCustomLinkAvailable = ref(true)

    const updateInstruction = async (id: string, content: string) => {
        try {
            loading.value = true
            is_editing.value = false
            await updateFirestoreDocument('boards', id, { instructions: content })
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Instructions updated successfully', addrs: 'updateInstruction' })
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: `Error updating instructions: ${e.message}`, addrs: 'updateInstruction' })
        } finally {
            loading.value = false
        }
    }
    const updateCustomLink = (id: string) => {
        if (createBoardForm.custom_link.value === '') {
            is_editing.value = false
            return
        }
        try {
        loading.value = true
        updateFirestoreDocument('boards', id, { custom_link: createBoardForm.custom_link.value })
        is_editing.value = false
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Updated successfully', addrs: 'updateCustomLink' })
        loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'updateCustomLink' })
        }
    }
    const checkCustomLink = async () => {
		loading.value = true
		createBoardForm.custom_link.value = createBoardForm.custom_link.value.replace(/ /g, '').toLowerCase()
        const exists = ref([])

			await getFirestoreCollectionWithWhereQuery('boards', exists, { name: 'custom_link', operator: '==', value: createBoardForm.custom_link.value })


		if (exists.value.length > 0) {
			isCustomLinkAvailable.value = false
		} else {
			isCustomLinkAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(createBoardForm.custom_link, checkCustomLink, { debounce: 500 })

    return { updateCustomLink, loading, is_editing, isCustomLinkAvailable, updateInstruction, instructions }
}


