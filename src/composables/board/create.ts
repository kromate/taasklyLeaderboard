import { v4 as uuidv4 } from 'uuid'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'


const createBoardForm = {
    title: ref(''),
    desc: ref(''),
    created_at: ref(new Date().toISOString()),
    updated_at: ref(new Date().toISOString())
}


const resetForm = () => {
    createBoardForm.title.value = ''
    createBoardForm.desc.value = ''
}


export const useCreateBoard = () => {
    const { id: user_id, username, user, isLoggedIn, userProfile } = useUser()
    const loading = ref(false)


    const create = async () => {
            const id = uuidv4()
        loading.value = true
        const sentData = {
            ...convertObjWithRefToObj(createBoardForm),
            id,
            user: {
                id: user_id.value,
                phone: user.value?.phoneNumber || null,
                email: user.value?.email || null
            },
            user_id: user_id.value,
            userProfile: userProfile.value

        }

        try {
            loading.value = true
            const res = await setFirestoreDocument('boards', id, sentData)

            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Board Created successfully' })
            useRouter().push(`/dashboard/${id}`)
            resetForm()
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { create, loading, createBoardForm }
}
