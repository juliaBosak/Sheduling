<template>
	<div class="container-fluid" id="app">
		<header-app url='#' title='Scheduling'></header-app>
		<div class=" main-container row">
			<nav class=" col-2 col-xl-2 pt-2 sidebar">
					<ul class="nav flex-column">
						<li
								v-for="tab in tabs"
								:key="tab.name"
								:class="['nav-item', 'nav-link', 'hover-border-effect',{ active: currentTab.name === tab.name }]"
								@click="currentTab = tab">
							{{ tab.title }}
						</li>
					</ul>
			</nav>
			<transition name="component-fade" mode="out-in">
				<component
						v-bind:is="currentTab"
						class="tab col-10"
				></component>
			</transition>
		</div>
	</div>
</template>
<style src="./styles/content-table-style/content-table.css"> </style>
<style src="./styles/sidebar-style/sidebar.css"></style>
<style src="./styles/popup-style/popup-errors.css"> </style>
<style src="./styles/loader-ball.css"></style>
<style src="./styles/style.css"></style>
<style src="./styles/header-style/header.css"></style>
<script>
	import headerApp from './components/header/header.vue'
	import addDisciplines from './components/add-disciplines/add-disciplines'
	import addTeachers from './components/add-teachers/add-teachers'
	import addRooms from './components/add-rooms/add-rooms'
	import addGroups from './components/add-groups/add-groups'
	import viewSchedule from './components/create-schedule/view-shedule'
	window.onbeforeunload = function() {
		localStorage.clear();
		return '';
	};

	let tabs = [addGroups, addDisciplines, addTeachers, addRooms, viewSchedule];

	export default {
		name: 'app',
		components: {
			headerApp,
			addDisciplines,
			addTeachers,
			addRooms,
			addGroups,
			viewSchedule
		},
		data() {
			return {
				tabs: tabs,
				currentTab: tabs[0]
			}
		}
	}
</script>



