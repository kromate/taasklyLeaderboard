<template>
	<section class="w-full">
		<main v-if="!loading" class=" md:h-[calc(100vh-170px)] h-full  px-5  md:!max-w-[2800px] flex justify-center w-full">
			<div class="w-full flex flex-col md:flex-row gap-24 md:py-12 py-6 justify-center">
				<div class="flex flex-col gap-9 w-full max-w-md">
					<h1 class="flex flex-col md:flex-row items-start gap-4 w-full max-w-full">
						<Undo2 class="border border-dark p-1 rounded-md cursor-pointer !min-w-[32px] !max-h-[32px] hover:btn_shadow transite " :size="32" @click="useRouter().back()" />
						<div class="flex flex-col w-full">
							<span class="text-3xl font-bold">{{ board.title }}</span>
							<span class="text-base ">{{ board.desc }}</span>
							<div class="field mt-4 items-start gap-4">
								<ProfilePhoto v-if="board" :photo-url="board.photo_url" :folder-name="`leaderboard//${board.custom_link}`" @update="updatePhoto($event, board.id)" />
								<label for="link" class="text-lg">Public link</label>
								<div class="input-field w-full py-4 flex items-center justify-between gap-5">
									<div class="select-all  text-base w-full" @click="copyBoardLink(board.custom_link)">
										{{ truncateString(`${host}/b/${board.custom_link}`, 20) }}
									</div>

									<div class="gap-2 flex">
										<Copy class="cursor-pointer border border-dark p-1 rounded" :size="28" @click="copyBoardLink(board.custom_link)" />
										<a :href="`http://${host}/b/${board.custom_link}`" target="_blank">
											<MoveUpRight class="cursor-pointer border border-dark p-1 rounded" :size="28" />
										</a>
									</div>
								</div>
								<div class="w-full mt-8">
									<label for="instructions" class="text-lg mb-2" />
									<label for="email" class="w-full flex items-center justify-between">
										Leaderboard Instructions
										<button
											:disabled="disabled"
											class="text-sm btn py-1 px-3"
											@click="handleUpdateInstructions"
										>
											{{ is_editing ? 'Update' : 'Edit' }}
										</button>

									</label>
									<TiptapEditor
										:content="board.instructions || ''"
										:on-update="updateInstructions"
										:editable="is_editing"
									/>
								</div>
								<button class="btn btn-primary w-full gap-2 mt-12" @click="setDeleteBoardId(board.id)">
									Delete
								</button>
							</div>
						</div>
					</h1>
				</div>
				<div v-if="!membersLoading" class="max-w-2xl flex flex-col gap-4 w-full">
					<div class="flex w-full justify-between">
						<span class="text-3xl font-bold">{{ members.length }} Members</span>
						<button class="btn btn-primary  gap-2  px-4 py-2 text-sm" @click="copyBoardInviteLink(board.custom_link)">
							Copy invite link
						</button>
					</div>

					<div v-if="members.length" class="flex flex-col gap-4 w-full">
						<DashboardAdminLeaderboardCard v-for="(player, index) in members" :key="player.id" :data="player" :index="index" />
					</div>
					<div v-else class="flex flex-col items-center text-center py-12">
						<PenLine :size="64" class="mx-auto" />
						<h1 class="text-xl font-semibold">
							No leaderboard members yet
						</h1>
						<p class="text-base italic">
							Share your leaderboard invite link to your contestants to start collecting their scores.
						</p>
						<button class="btn btn-primary w-full gap-2 mt-12 max-w-[200px]" @click="copyBoardInviteLink(board.custom_link)">
							Copy invite link
						</button>
					</div>
				</div>
				<Skeleton v-else height="500px" radius="8px" />
			</div>
		</main>
		<Skeleton v-else height="500px" />
	</section>
</template>

<script setup lang="ts">
import { Copy, Undo2, MoveUpRight, PenLine } from 'lucide-vue-next'
import { truncateString } from '@/composables/utils/formatter'
import { useFetchUserDoashboardBoardById } from '@/composables/board/id'
import { useCopyToClipboard } from '@/composables/utils/share'
import { useDeleteBoard } from '@/composables/board/delete'
import { useFetchBoardMembers } from '@/composables/board/members/fetch'
import { useEditBoard } from '@/composables/board/edit'


const { loading: editLoading, instructions, is_editing, isCustomLinkAvailable, updateInstruction } = useEditBoard()

const { board, fetchUserBoardById, loading, updatePhoto } = useFetchUserDoashboardBoardById()
const { members, fetchBoardMembers, loading: membersLoading } = useFetchBoardMembers()
const { setDeleteBoardId } = useDeleteBoard()




const updateInstructions = (content: string) => {
  instructions.value = content
}

const disabled = computed(() => {
	if (!is_editing.value) return false
	return instructions.value === board.value.instructions || editLoading.value
})

const handleUpdateInstructions = async () => {
	if (is_editing.value) {
		if (board.value && board.value.id) {
			await updateInstruction(board.value.id, instructions.value)
			is_editing.value = false
		}
	} else {
		is_editing.value = true
	}
}

const id = useRoute().params.id as string


fetchUserBoardById(id)
fetchBoardMembers(id)

// onMounted(async () => {

// 	await fetchUserBoardById(id)
// 	await fetchBoardMembers(id)
// })

const host = computed(() => {
	return location.host
})
const { copyData } = useCopyToClipboard()


const copyBoardLink = (id: string) => {
	copyData({ info: `${host.value}/b/${id}`, msg: 'Link copied to clipboard' })
}
const copyBoardInviteLink = (id: string) => {
	copyData({ info: `${host.value}/invite/${id}`, msg: 'Link copied to clipboard' })
}






definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped></style>
