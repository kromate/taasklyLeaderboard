<template>
	<div class="flex items-center justify-between p-3 rounded-md cursor-pointer hover:btn_shadow transition-colors border border-dark bg-light" :class="positionClass">
		<div class="flex items-center gap-4">
			<span class="font-bold text-lg w-8 text-center">{{ position }}</span>
			<span class="font-semibold">{{ name }}</span>
		</div>
		<span class="font-bold">{{ points }}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	name: string
	points: number
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
