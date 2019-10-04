<template>
	<main role="main" class="col-md-9  ml-sm-auto col-lg-10">
		<div class="container">
			<div v-if="generated" class=" display-table table mt-2 my-table-hover">
				<div class="table-head table-thead-dark">
					<div class="table-tr border-thead">
						<div class="table-td"
						     v-for="(key, i) in columns"
						     v-bind:style="styleForColumns[key]"
						     :key="i">
							{{ key }}
						</div>
					</div>
				</div>
				<div class="table-body">
					<div class="table-tr border-tr"
					     v-for="(item, index) in rows"
					     :key="index">
						<div class="table-td border-td" v-for="(key, i) in columns"
						     :key="i">
							<span>{{ item[key] === true ? '&#10003;' :	item[key] === false ? '&#10007;' : item[key]}}</span>
						</div>
					</div>
				</div>
			</div>
			<div  v-if="showParams"  class="params p-3 mt-3">
				<form @submit.prevent id="params-form" class="mt-2">
					<h4 class="mt-2 pb-4 text-center"> Параметри розкладу</h4>
					<div class="row">
						<div class="col-6 mb-2">
							<label class="inp">
								<input form="params-form"
								       placeholder=" "
								       required
								       min="1"
								       max="7"
								       class="form-control form-control-sm  form-input"
								       v-model="daysNumber"
								       >
								<span class="label big-label">Кількість навчальних днів в тиждень</span>
								<span class="border"></span>
							</label>
						</div>
						<div class="col-6">
							<label class="inp">
								<input form="params-form"
								       placeholder=" "
								       required
								       min="1"
								       max="10"
								       class="form-control form-control-sm  form-input"
								       v-model="lessonsNumber"
								>
								<span class="label big-label">Кількість уроків/пар в день</span>
								<span class="border"></span>
							</label>
						</div>
					</div>
				</form>
			</div>
			<div class="my-3 mx-3 text-right">
				<button form="params-form" @click=" generate()" class=" gen-btn btn btn-primary">Сформувати</button>
				<button v-if="showParamsButton" @click="showParams = true; generated=false; showParamsButton=false" class=" btn btn-primary ml-3">Змінити параметри</button>
			</div>
			<popup-loading v-bind:class="{ 'is-active': showLoadingModal }"></popup-loading>
			<popup-errors v-if="showError"></popup-errors>
			<popup-errors v-if="showError" @close="showError = false"> </popup-errors>
			</div>
	</main>
</template>
<script>
	import generateSchedule from './generateSchedule';
	import popupLoading from '../popup/popup-loading';
	import popupErrors from '../popup/popup-errors'

	export default {
		name: 'view-schedule',
		title: 'Розклад',
		components: {
			popupLoading,
			popupErrors
		},
		data() {
			return {
				nameTable: 'schedule',
				editIndex: null,
				originalData: null,
				columns: this.getColumns(),
				generated: false,
				showLoadingModal: false,
				showParams: true,
				showParamsButton: false,
				showError: false,
				daysNumber: 5,
				lessonsNumber: 6,
				rows: [],
				styleForColumns: {
					'День': {width: "5%"},
					'Урок': {width: "5%"}
				},
			}
		},
		methods: {
			generateSched: generateSchedule,
			getColumns() {
				let columns = ['День', 'Урок'];
				JSON.parse(localStorage.getItem('groups')).forEach(elem => columns.push(elem['Група']));
				return columns;
			},
			generate() {
				if(this.daysNumber && this.lessonsNumber) {
					this.showLoadingModal = true;
					this.generated = false;
					try {
						let result = this.generateSched(JSON.parse(localStorage.getItem('groups')), JSON.parse(localStorage.getItem('teachers')), JSON.parse(localStorage.getItem('disciplines')), JSON.parse(localStorage.getItem('rooms')), [1, +this.daysNumber, +this.lessonsNumber], true);
						this.rows = this.printSchedule(result);
						setTimeout(() => {
							this.showParams = false;
							this.showLoadingModal = false;
							this.showParamsButton = true;
							this.generated = true;
						}, 3000);
					}
					catch {
						this.showLoadingModal = false;
						this.showError = true;
					}

				}
			},
			printSchedule(schedule) {
				let rows = [];
				let itemSchedule = {};
				this.columns.forEach(key => itemSchedule[key] = '');
				let count = -1;
				let daysName = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
				schedule.forEach((weeks) => {
						weeks.forEach((days, dayIndex) => {
							days.forEach((lessons, lessonIndex) => {
								count++;
								rows[count] = Object.assign({}, itemSchedule);
								rows[dayIndex * days.length]['День'] = daysName[dayIndex];
								for (let auditory in lessons) {
									if (lessons[auditory] !== null) {
										for (let prop in  rows[count]) {
											lessons[auditory].groupForPart.forEach(elem => {
													if (elem.nameGroup === prop) {
														rows[count]['Урок'] = lessonIndex + 1;
														let typeSubj;
														switch (lessons[auditory].typeSubj) {
															case 'lab':
																typeSubj = 'лаб.'
																break;
															case 'practice':
																typeSubj = 'практ.'
																break;
															case 'lecture':
																typeSubj = 'лекц.'
																break;
														}
														rows[count][prop] = `${lessons[auditory].subjectName} ${typeSubj} ${lessons[auditory].teacherForPart.nameTeacher} ${auditory}`;
													}
												}
											)
										}

									}
								}
							})
						})
					}
				);
				return rows;
				}
			},
		watch: {
			rows: {
				handler() {
					localStorage.setItem(this.nameTable, JSON.stringify(this.rows))
				}
			}
		},
		mounted() {
			if (localStorage.getItem(this.nameTable)) this.rows = JSON.parse(localStorage.getItem(this.nameTable))
		}
	}
</script>

