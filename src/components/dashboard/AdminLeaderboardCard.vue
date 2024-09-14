<template>
	<div class="flex items-center justify-between p-3 pl-7 rounded-md  hover:btn_shadow transition-colors border border-dark bg-light relative" :class="positionClass">
		<div class="flex items-center gap-4 ">
			<span class="font-bold text-lg  text-center border border-dark rounded-md p-2 absolute h-7 w-7 center -left-3 bg-light" :class="positionClass">{{ position }}</span>
			<Avatar :name="data.name" />
			<div class="flex flex-col">
			<span class="font-semibold">{{ data.name }}</span>
			<span class="text-sm text-gray-500 truncate w-20">{{ data.phone }}</span>
			</div>
			
		</div>
		<div class="flex gap-1 md:gap-2 items-center">
		<span class="font-bold text-3xl">{{ data.points ?? 0 }}</span>
		<button class="icon center" @click="increasePoint(data.board_id, data.id)"><CircleArrowUp/></button>
		<button class="icon center" @click="decreasePoint(data.board_id, data.id)"><CircleArrowDown/></button>
		<button class="btn px-3.5 py-1 text-sm " @click='setDeleteBoardMemberId(data)'>Delete</button>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { CircleArrowUp, CircleArrowDown } from 'lucide-vue-next';
import { useDeleteBoardMember } from '@/composables/board/members/delete';
import { useUpdateBoardMemberPoint } from '@/composables/board/members/point'

const { setDeleteBoardMemberId } = useDeleteBoardMember()

const { increasePoint, decreasePoint } = useUpdateBoardMemberPoint()


const props = defineProps<{
	data: Record<string, any>
	index: number
}>()

const position = computed(() => props.index + 1)

const positionClass = computed(() => {
	switch (position.value) {
		case 1:
			return '!bg-yellow-200'
		case 2:
			return '!bg-gray-200'
		case 3:
			return '!bg-orange-200'
		default:
			return ''
	}
})
</script>

<style scoped>
.icon{
	@apply w-6 h-6 md:w-8 md:h-8 
}
</style>