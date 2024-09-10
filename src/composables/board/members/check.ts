import { callFirebaseFunction } from '@/firebase/functions'
import { useCreateBoardMember } from './create'
import { useIP } from '@/composables/core/ip'


export const useCheckIfBoardMemberExists = () => {

    const { createBoardMemberForm } = useCreateBoardMember()

    const boardId = ref('')
    const isNameAvailable = ref(true)
    const isPhoneAvailable = ref(true)
    const nameLoading = ref(false)
    const phoneLoading = ref(false)
    const checkName = async () => {
        nameLoading.value = true
        createBoardMemberForm.name.value = createBoardMemberForm.name.value.replace(/ /g, '').toLowerCase()
        const { exists } = await callFirebaseFunction('checkBoardMemberExist', { name: createBoardMemberForm.name.value, type: 'NAME', customLink: boardId.value }) as any
        if (exists) {
            isNameAvailable.value = false
        } else {
            isNameAvailable.value = true
        }
        nameLoading.value = false
    }

    const checkPhone = async () => {
        phoneLoading.value = true
        createBoardMemberForm.phone.value = createBoardMemberForm.phone.value.replace(/ /g, '').toLowerCase()
        const { exists } = await callFirebaseFunction('checkBoardMemberExist', { phone: createBoardMemberForm.phone.value, type: 'PHONE', customLink: boardId.value }) as any
        if (exists) {
            isPhoneAvailable.value = false
        } else {
            isPhoneAvailable.value = true
        }
        phoneLoading.value = false
    }

    

    watchDebounced(createBoardMemberForm.name, checkName, { debounce: 500 })
    watchDebounced(createBoardMemberForm.phone, checkPhone, { debounce: 500 })

    return { isNameAvailable, isPhoneAvailable, nameLoading, phoneLoading, boardId }
}