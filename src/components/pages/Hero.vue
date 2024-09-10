<template>
	<main class=" h-full container grid md:grid-cols-2 gap-12 items-center  md:py-32 py-10">
		<section class="text-start px-4">
			<h1 class="md:text-7xl text-5xl font-extrabold mb-4 pathway leading-[1.2]">
				Leaderboard Simplified
			</h1>
			<p class="md:text-2xl text-lg font-medium md:font-normal text-dark mb-8 ">
				Create, share, and manage dynamic leaderboards with ease. Boost engagement, track progress, and celebrate achievements in your community or organization.
			</p>
			<div class="flex gap-4 items-center">
				<nuxt-link to="/dashboard" class="bg-black text-white md:py-4 py-3 md:px-10 px-8 rounded-md md:text-xl">
					Create Leaderboard
				</nuxt-link>
				<!-- <a class="md:text-xl font-semibold underline " href="#" target="_blank" rel="noopener noreferrer">Watch a Demo</a> -->
			</div>
		</section>

		<section class="flex center items-start h-full">
			<div class="flex flex-col max-w-lg w-full gap-4 max-h-[410px] overflow-auto hide-scrollbar px-4 md:p-5 ">
				<h2 class="text-2xl font-semibold bg-light p-2 px-4  rounded-md border border-dark">
					Sweetest Kids Leaderboard
				</h2>
				<section class='flex flex-col gap-4'>
					<DashboardLeaderboardCard v-for="(player, index) in leaderboardData" :key="player.id" :name="player.name" :points="player.points" :index="index" />
				</section>

			</div>
		</section>
	</main>
</template>

<script lang='ts' setup>

const leaderboardData = [

	{ id: 1, name: 'Anthony', points: 100 },
	{ id: 2, name: 'Afomachukwu', points: 90 },
	{ id: 3, name: 'Zainab', points: 80 },
	{ id: 4, name: 'Ijeoma', points: 70 },
	{ id: 5, name: 'Eniola', points: 60 },
	{ id: 6, name: 'Sebastian', points: 50 },
	{ id: 7, name: 'Grace', points: 40 },
	{ id: 8, name: 'Hank', points: 30 },
	{ id: 9, name: 'Ivy', points: 20 },
	{ id: 10, name: 'Jack', points: 10 }

]
</script>
