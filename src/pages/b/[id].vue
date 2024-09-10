<template>
    <section class="container  min-h-screen flex flex-col items-center gap-4 py-12 px-4 pl-6 md:px-0">
        <header class="flex flex-col gap-3 items-center">
            <img :alt="board.title" class="aspect-square rounded-xl w-24 h-24 min-w-24 min-h-24 border border-line" :src="board.photo_url ?? '/filler.svg'">
            <h1 class="text-2xl font-bold">{{ board.title }}</h1>
            <p class="text-sm text-gray-500">{{ board.desc }}</p>
            <nuxt-link :to='`/invite/${board.custom_link}`' class="btn btn-primary">Join Board</nuxt-link>
        </header>


        <section class='flex flex-col gap-4 w-full'>
            <DashboardLeaderboardCard v-for="(player, index) in data" :key="player.id" :name="player.name" :points="player.points ?? 0" :index="index" />
        </section>

    </section>
</template>

<script setup lang='ts'>
import { useCustomHead } from '@/composables/core/head'
import { useFetchBoardById } from '@/composables/board/id';
import { useAPI } from '@/api_factory';



const { board, fetchUserBoardById, } = useFetchBoardById()

const custom_link = useRoute().params.id as string

await fetchUserBoardById(custom_link)

const { data, error } = await useAPI('/getLeaderboardMembers', {
    method: 'GET',
    query: { custom_link }
}) as { data: Ref<any>, error: any }


definePageMeta({
    layout: 'public'
})

useCustomHead({
    title: board.value?.title ?? 'Leaderboard',
    desc: board.value?.desc ?? 'Leaderboard',
    img: board.value?.photo_url ?? '/filler.svg'
})
</script>

<style lang="scss" scoped></style>