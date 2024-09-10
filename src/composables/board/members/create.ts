import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { v4 as uuidv4 } from 'uuid'
import { useAlert } from '@/composables/core/notification'
import { callFirebaseFunction } from '@/firebase/functions'


const createBoardMemberForm = {
    name: ref(''),
    phone: ref(''),
    created_at: ref(new Date().toISOString()),
}

export const useCreateBoardMember = () => { 

    const loading = ref(false)
    const phoneNumError = ref()

    	watch(createBoardMemberForm.phone, (val) => {
		if (val && val.length < 10) {
			phoneNumError.value = 'Invalid Phone Number'
		} else {
			phoneNumError.value = null
		}
	})


    const create = async (boardCustomLink:string) => { 
        loading.value = true
        const boardId = await getBoardIdByCustomLink(boardCustomLink)

        const id = uuidv4()
        const sent_data = {
            ...convertObjWithRefToObj(createBoardMemberForm),
            board_id: boardId,
            id
        }

        const res = await callFirebaseFunction('createBoardMember', sent_data) as any

        if (res.code === 200) { 
            useRouter().push(`/b/${boardCustomLink}`)
            useAlert().openAlert({type: 'SUCCESS', msg: 'You have joined the leaderboard'})
        }else{
            useAlert().openAlert({type: 'ERROR', msg: res.msg})
        }
    

        loading.value = false

    }

    return { create, loading, createBoardMemberForm, phoneNumError  }
}


const getBoardIdByCustomLink = async (customLink: string) => { 
    const boards = ref([] as any[])      
    await getFirestoreCollectionWithWhereQuery('boards', boards, { name: 'custom_link', operator: '==', value: customLink })
    return boards.value[0].id
}