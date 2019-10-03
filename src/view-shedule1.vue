<template>
	<main role="main" class="col-md-9  ml-sm-auto col-lg-10">
		<div class="container">
			<div class="row">
				<table class="table  table-bordered mt-2  table-hover">
					<thead class="thead-dark">
					<tr>
						<th scope="col"
						    v-for="(key, i) in columns"
						    v-bind:style="styleColumns[key]"
						    :key="i">
							{{ key }}
						</th>
					</tr>
					</thead>
					<tbody>
					<tr
							v-for="(item, index) in rows"
							:key="index">
						<td
								v-for="(key, i) in columns"
								:key="i">
							<span v-if="editIndex !== index">{{item[key]}}</span>
						</td>
						<!-- <td>
							 <span v-if="editIndex !== index">
								 <button @click="edit(item, index)" class="table-btn btn btn-sm btn-outline-secondary mr-2 mb-1">Редагувати</button>
								 <button @click="remove(item, index)" class="table-btn btn btn-sm btn-outline-secondary mr-2 mb-1">Видалити</button>
							 </span>
							 <span v-else>
								 <button class="table-btn btn btn-sm btn-outline-secondary mr-2" @click="cancel(item)">Відмінити</button>
								 <button class=" table-btn btn btn-sm btn-outline-secondary mr-2" form="form-table" @click="save(item)">Зберегти</button>
							 </span>
						 </td>
						 -->
					</tr>
					</tbody>
				</table>
				<div class="col-3 offset-9 text-right my-2">
					<button v-show="!editIndex" @click="generate" class=" gen-btn btn btn-dark mr-3">Сформувати</button>
				</div>

			</div>
		</div>
	</main>
</template>

<script>
	import generateSchedule from './components/create-schedule/generateSchedule'

	export default {
		name: 'view-schedule',
		title: 'Розклад',
		data() {
			return {
				nameTable: 'schedule1',
				editIndex: null,
				originalData: null,
				columns: this.getColumns(),
				rows: [],
				rows1: [
					{
						'День': 'Пн',
						'Урок': '1',
						'1КН-15б': 'ММДОС лекц Крилик Л. В. 105',
						'2КН-15б': 'ММДОС лекц Крилик Л. В. 105',
						'ЗКН-15б': 'ТКП лаб Петришин С. В. 109'
					},
					{
						'День': '',
						'Урок': '2',
						'1КН-15б': 'ММДОС лекц Крилик Л. В. 105',
						'2КН-15б': 'ММДОС лекц Крилик Л. В. 105',
						'ЗКН-15б': 'ТКП лаб Петришин С. В. 109'
					},
					{
						'День': '',
						'Урок': '3',
						'1КН-15б': 'МCШІ лекц Месюра В. І. 101',
						'2КН-15б': 'МCШІ лекц Месюра В. І. 101',
						'ЗКН-15б': 'МCШІ лекц Месюра В. І. 101'
					},
					{
						'День': '',
						'Урок': '4',
						'1КН-15б': 'МCШІ лекц Месюра В. І. 101',
						'2КН-15б': 'МCШІ лекц Месюра В. І. 101',
						'ЗКН-15б': 'МCШІ лекц Месюра В. І. 101'
					},
					{
						'День': '',
						'Урок': '5',
						'1КН-15б': 'МЗКІТ практ Крилик Л. В.  111',
						'2КН-15б': 'ТКП практ Петришин С. В. 104',
						'ЗКН-15б': 'МССЕП практ Скорина Л. М. 112'
					},
					{'День': '', 'Урок': '6', '1КН-15б': '', '2КН-15б': '', 'ЗКН-15б': ''},
					{
						'День': 'Вт',
						'Урок': '1',
						'1КН-15б': 'УІТП лекц Месюра В. І. 102',
						'2КН-15б': 'УІТП лекц Месюра В. І. 102',
						'ЗКН-15б': 'УІТП лекц Месюра В. І. 102'
					},
					{
						'День': '',
						'Урок': '2',
						'1КН-15б': 'УІТП лекц Месюра В. І. 102',
						'2КН-15б': 'УІТП лекц Месюра В. І. 102',
						'ЗКН-15б': 'УІТП лекц Месюра В. І. 102'
					},
					{
						'День': '',
						'Урок': '3',
						'1КН-15б': 'МЗКІТ лаб Крилик Л. В.  108',
						'2КН-15б': 'ТКП лаб Ольшанська О. В. 111',
						'ЗКН-15б': 'МCШІ лаб Ваховська Л. М. 109'
					},
					{
						'День': '',
						'Урок': '4',
						'1КН-15б': 'МЗКІТ лаб Крилик Л. В.  108',
						'2КН-15б': 'ТКП лаб Ольшанська О. В. 111',
						'ЗКН-15б': 'МCШІ лаб Ваховська Л. М. 109'
					},
					{
						'День': '',
						'Урок': '5',
						'1КН-15б': 'МСШІ практ Месюра В. І. 104',
						'2КН-15б': 'МЗКІТ практ Крилик Л. В. 104',
						'ЗКН-15б': 'ЕОБ пакт Причепа І. В. 114'
					},
					{'День': '', 'Урок': '6', '1КН-15б': '', '2КН-15б': '', 'ЗКН-15б': ''},
					{
						'День': 'Ср',
						'Урок': '1',
						'1КН-15б': 'МЗКІТ лекц Крилик Л. В. 101',
						'2КН-15б': 'МЗКІТ лекц Крилик Л. В. 101',
						'ЗКН-15б': 'РЕЕБД лекц Козачко О. М. 107'
					},
					{
						'День': '',
						'Урок': '2',
						'1КН-15б': 'МЗКІТ лекц Крилик Л. В. 101',
						'2КН-15б': 'МЗКІТ лекц Крилик Л. В. 101',
						'ЗКН-15б': 'РЕЕБД лекц Козачко О. М. 107'
					},
					{
						'День': '',
						'Урок': '3',
						'1КН-15б': 'ММДОС практ Крилик Л. В. 104',
						'2КН-15б': 'МСШІ практ Месюра В. І. 111',
						'ЗКН-15б': 'МССЕП лекц Скорина Л. М. 102'
					},
					{
						'День': '',
						'Урок': '4',
						'1КН-15б': 'МСШІ лаб Ваховська Л. М. 108',
						'2КН-15б': 'ММДОС лаб Крилик Л. В. 110',
						'ЗКН-15б': 'МССЕП лекц Скорина Л. М. 102'
					},
					{
						'День': '',
						'Урок': '5',
						'1КН-15б': 'МСШІ лаб Ваховська Л. М. 108',
						'2КН-15б': 'ММДОС лаб Крилик Л. В. 110',
						'ЗКН-15б': 'МСШІ практ Месюра В. І. 103'
					},
					{'День': '', 'Урок': '6', '1КН-15б': '', '2КН-15б': '', 'ЗКН-15б': ''},
					{
						'День': 'Чт',
						'Урок': '1',
						'1КН-15б': 'ТКП лекц Савчук Т. О. 102',
						'2КН-15б': 'ТКП лекц Савчук Т. О. 102',
						'ЗКН-15б': 'ТКП лекц Савчук Т. О. 102'
					},
					{
						'День': '',
						'Урок': '2',
						'1КН-15б': 'ТКП лекц Савчук Т. О. 102',
						'2КН-15б': 'ТКП лекц Савчук Т. О. 102',
						'ЗКН-15б': 'ТКП лекц Савчук Т. О. 102'
					},
					{
						'День': '',
						'Урок': '3',
						'1КН-15б': 'ММДОС лаб Крилик Л. В. 110',
						'2КН-15б': 'УІТП лаб Іванчук Я. В. 115',
						'ЗКН-15б': 'РЕЕБД лаб Козачко О. М. 113'
					},
					{
						'День': '',
						'Урок': '4',
						'1КН-15б': 'ММДОС лаб Крилик Л. В. 110',
						'2КН-15б': 'УІТП лаб Іванчук Я. В. 115',
						'ЗКН-15б': 'РЕЕБД лаб Козачко О. М. 113'
					},
					{
						'День': '',
						'Урок': '5',
						'1КН-15б': 'УІТП лаб Іванчук Я. В. 113',
						'2КН-15б': 'МСШІ лаб Ваховська Л. М. 110',
						'ЗКН-15б': 'УІТП лаб Іванчук Я. В. 115'
					},
					{
						'День': '',
						'Урок': '6',
						'1КН-15б': 'УІТП лаб Іванчук Я. В. 113',
						'2КН-15б': 'МСШІ лаб Ваховська Л. М. 110',
						'ЗКН-15б': 'УІТП лаб Іванчук Я. В. 115'
					},
					{
						'День': 'Пт',
						'Урок': '1',
						'1КН-15б': 'ЕОБ лекц Причепа І. В. 107',
						'2КН-15б': 'ЕОБ лекц Причепа І. В. 107',
						'ЗКН-15б': 'ЕОБ лекц Причепа І. В. 107'
					},
					{
						'День': '',
						'Урок': '2',
						'1КН-15б': 'ЕОБ практ Причепа І. В. 104',
						'2КН-15б': 'МЗКІТ лаб Крилик Л. В. 108',
						'ЗКН-15б': 'МССЕП лаб Скорина Л. М. 113'
					},
					{
						'День': '',
						'Урок': '3',
						'1КН-15б': 'ТКП лаб Ольшанська О. В. 110',
						'2КН-15б': 'МЗКІТ лаб Крилик Л. В. 108',
						'ЗКН-15б': 'МССЕП лаб Скорина Л. М. 113'
					},
					{
						'День': '',
						'Урок': '4',
						'1КН-15б': 'ТКП лаб Ольшанська О. В. 110',
						'2КН-15б': 'ММДОС практ Крилик Л. В. 104',
						'ЗКН-15б': 'РЕЕБД практ Козачко О. М. 111'
					},
					{
						'День': '',
						'Урок': '5',
						'1КН-15б': 'ТКП практ Ольшанська О. В. 104',
						'2КН-15б': 'ЕОБ практ Причепа І. В. 111',
						'ЗКН-15б': ''
					},
					{'День': '', 'Урок': '6', '1КН-15б': '', '2КН-15б': '', 'ЗКН-15б': ''},

				],
				styleColumns: {
					'День': {width: "5%"},
					'Урок': {width: "5%"}
				},
				typeInputs: {
					'День': 'text',
					'Урок': 'number'
				},
			}
		},
		methods: {
			generateSched: generateSchedule,
			getItemsFromLocalStorage(name) {
				return JSON.parse(localStorage.getItem(name))
			},
			setItemsToLocalStorage(name) {
				localStorage.setItem(name, JSON.stringify(this.rows))
			},
			getColumns() {
				let columns = ['День', 'Урок'];
				this.getItemsFromLocalStorage('groups').forEach(elem => columns.push(elem['Група']));
				return columns;
			},
			add() {
				this.originalData = null
				this.rows.push({})
				this.editIndex = this.rows.length - 1

			},
			generate() {
				let result = this.generateSched(JSON.parse(localStorage.getItem('groups')), JSON.parse(localStorage.getItem('teachers')), JSON.parse(localStorage.getItem('disciplines')), JSON.parse(localStorage.getItem('rooms'), [1, 5, 6], true))
				localStorage.setItem('schedule', JSON.stringify(result));
				this.rows = this.printSchedule(result);
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
			},
			edit(item, index) {
				this.originalData = Object.assign({}, item)
				this.editIndex = index
			},
			cancel(item) {
				this.editIndex = null
				if (!this.originalData) {
					this.rows.splice(this.rows.indexOf(item), 1)
					return
				}
				Object.assign(item, this.originalData)
				this.originalData = null
			},
			remove(item, index) {
				this.rows.splice(index, 1)
			},
			save(item) {
				if (this.validate(item)) {
					this.originalData = null
					this.editIndex = null
					this.setItemsToLocalStorage(this.nameTable)
				} else {
					alert('fill in all the fields')
				}
			}
		},
		watch: {
			gridData: {
				handler() {
					localStorage.setItem(this.nameTable, JSON.stringify(this.gridData))
				}
			}
		},
		mounted() {
			if (localStorage.getItem(this.nameTable)) this.gridData = JSON.parse(localStorage.getItem(this.nameTable))
		}
	}
</script>


