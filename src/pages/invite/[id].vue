<template>
    <div class="mx-auto max-w-3xl w-full px-4 py-24">
        <div class="flex flex-col items-center gap-4 mb-8 text-center">
            <img :alt="board.title" class="aspect-square rounded-full w-24 h-24 min-w-24 min-h-24 border border-line" :src="board.photo_url ?? '/filler.svg'">


            <h1 class=" text-lg md:text-2xl">
                You have been invited to join the <span class="underline font-semibold"> {{ board.title }} </span> leaderboard
            </h1>
            <div class="field mt-5">
                <form class="auth-form " @submit.prevent="create(custom_link)">

                    <div class="field relative">
                        <label for="username">Name* <span class="text-xs text-gray-500"> (as displayed on the leaderboard)</span></label>
                        <input id="username" v-model="createBoardMemberForm.name.value" type="text" class="input-field !bg-white" autocomplete="additional-name2" :class="[isNameAvailable ? '' : '!border-rose-500']" required>
                        <Spinner v-if="nameLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-9" />
                        <span v-if="!isNameAvailable" class="text-rose-500 font-bold">This name is taken</span>
                    </div>


                    <div class="field relative">
                        <PhoneInput v-model="createBoardMemberForm.phone.value" class='!bg-white' :class="[phoneNumError ? '!border-rose-500' : '']" label="Phone No (whatsapp preferred)" />
                        <Spinner v-if="phoneLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-9" />
                        <span v-if="phoneNumError || !isPhoneAvailable" class="text-rose-500 font-bold">{{ phoneNumError || 'This phone number is already in use' }}</span>
                    </div>



                    <button class="btn bg-dark text-light w-full mt-4" :disabled="disabled">
                        <span v-if="!loading"> Join Leaderboard</span>
                        <Spinner v-else />
                    </button>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCustomHead } from '@/composables/core/head'
import { useFetchBoardById } from '@/composables/board/id';
import { useCreateBoardMember } from '@/composables/board/members/create';
import { useCheckIfBoardMemberExists } from '@/composables/board/members/check';


const { board, fetchUserBoardById, } = useFetchBoardById()
const { create, loading, createBoardMemberForm, phoneNumError } = useCreateBoardMember()
const { isNameAvailable, isPhoneAvailable, nameLoading, phoneLoading, boardId } = useCheckIfBoardMemberExists()

const custom_link = useRoute().params.id as string
boardId.value = custom_link



await fetchUserBoardById(custom_link)

const disabled = computed(() => {
    return !isNameAvailable.value || !isPhoneAvailable.value || nameLoading.value || phoneLoading.value || phoneNumError.value || loading.value
})

definePageMeta({
    layout: 'public-with-bg'
})

useCustomHead({
    title: `Leaderboard Invite - ${board.value.title}`,
    desc: `You have been invited to join the ${board.value.title} leaderboard`,
    img: '/filler.svg'
})
</script>
