
import { deleteFirestoreSubCollectionDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'

import { useConfirmationModal } from '@/composables/core/confirmation'

const selected_member = ref()

export const useDeleteBoardMember  = () => {
	const loading = ref(false)


	const setDeleteBoardMemberId = (data:any) => {
		selected_member.value = data

		useConfirmationModal().openAlert({ type: 'ERROR', desc: `Are you sure you want to delete ${selected_member.value.name} from this board ?`, title: 'Delete Board Member', call_function: deleteBoardMember, loading })
	}

    const deleteBoardMember = async () => {
        console.log(selected_member.value);
		loading.value = true
		try {
			await deleteFirestoreSubCollectionDocument('boards', selected_member.value.board_id, 'members', selected_member.value.id)
			loading.value = false
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Member Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	return { loading, deleteBoardMember, setDeleteBoardMemberId }
}
