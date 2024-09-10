<template>
	<form class="flex flex-col gap-5 bg-light p-7 rounded-md border border-dark w-full max-w-sm" @submit.prevent="create">
		<h2 class="font-bold text-2xl mb-8">
			Create a leaderboard
		</h2>
		<div class="field">
			<label for="email">Title</label>
			<input id="title" v-model="createBoardForm.title.value" placeholder="Enter a Board title" type="text" class="input-field" autocomplete="off" required>
		</div>
		<div class="field">
			<label for="email">Description</label>
			<textarea id="desc" v-model="createBoardForm.desc.value" placeholder="Enter a Board description (Optional)" type="text" class="input-textarea resize-none" autocomplete="off" rows="3" />
		</div>
		<div class="field relative">
			<label for="email" class="w-full flex items-center justify-between">
				Custom link
			</label>
			<input id="custom_link" v-model="createBoardForm.custom_link.value" placeholder="Custom board link" type="text" class="input-field" autocomplete="off" required>
			<Spinner v-if="editLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-[38px]" />
			<span v-if="!isCustomLinkAvailable" class="text-rose-500 font-bold">This custom link is taken</span>
		</div>
		<button class="btn-primary" :disabled="loading" type="submit">
			<Spinner v-if="loading" />
			<span v-else>Create Board</span>
		</button>
	</form>
</template>

<script setup lang="ts">
import { useCreateBoard } from '@/composables/board/create'
import { useEditBoard } from '@/composables/board/edit'



const { create, createBoardForm, loading } = useCreateBoard()
const { loading: editLoading, is_editing, isCustomLinkAvailable } = useEditBoard()

const disabled = computed(() => {
	// if (custom_link.value === board.value.custom_link) {
	// 	return false
	// }
	if (is_editing.value) {
		return !isCustomLinkAvailable.value || editLoading.value
	} else {
		return false
	}
})
</script>

<style scoped></style>
