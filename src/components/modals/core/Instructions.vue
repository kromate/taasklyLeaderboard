
<template>
	<Modal
		modal="$atts.modal"
		title="Leaderboard Instructions"
		:is-full-height="true"

	>
		<section class="text-dark tiptap ProseMirror !p-0 !m-0">
			<div v-html="board.instructions" />
		</section>


		<div class="grid grid-cols-1 gap-4 mt-6">
			<button class="modal-btn !bg-dark">
				Done
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useFetchBoardById } from '@/composables/board/id'


const { board } = useFetchBoardById()

</script>

<style>
@import '@/assets/css/tipTapEditor.css'
</style>
