<template>
	<main role="main" class="col-md-9  ml-sm-auto col-lg-10">
		<div class="container">
			<div class="row">
				<table class="table mt-2 table-bordered table-hover">
					<thead class="thead-dark">
					<tr>
						<th scope="col"
						    v-for="(key, i) in columns"
						    v-bind:style="styleForColumns[key]"
						    :key="i">
							{{ key }}
						</th>
						<th width="20%"></th>
					</tr>
					</thead>
					<tbody>
					<tr
							v-for="(item, index) in rows"
							:key="index">
						<td v-for="(key, i) in columns"
						    :key="i">
							<span v-if="editIndex !== index">{{ item[key] === true ? '&#10003;' :	item[key] === false ? '&#10007;' : item[key]}}</span>
							<div v-if="editIndex === index">
								<select class="form-control form-control-sm" required
								        v-if="nameTable === 'teachers' && typeForInputs[key] === 'select'"
								        v-model="selected">
									<option v-for="(option, i) in getItemsFromLocalStorage('disciplines')"
									        v-bind:key="i" v-bind:value="option['Назва дисципліни']">
										{{ option['Дисципліна'] }}
									</option>
								</select>
								<select class="form-control form-control-sm" multiple required
								        v-else-if="nameTable === 'disciplines' && typeForInputs[key] === 'select'"
								        v-model="multiSelected">
									<option v-for="(option, i) in getItemsFromLocalStorage('groups')" v-bind:key="i"
									        v-bind:value="option['Група']">
										{{ option['Група']}}
									</option>
								</select>
								<label v-else-if="typeForInputs[key] === 'checkbox'" class="container-checkbox">
									<input required class="form-control form-control-sm"
									       v-bind:type="typeForInputs[key]" v-model="item[key]">
									<span class="checkmark"></span>
								</label>
								<input required v-else class="form-control form-control-sm"
								       v-bind:type="typeForInputs[key]" v-model="item[key]">
							</div>
						</td>
						<td>
                                <span v-if="editIndex !== index">
                                    <button @click="edit(item, index)"
                                            class="table-btn btn btn-sm btn-outline-secondary mr-2 mb-1">Редагувати</button>
                                    <button @click="remove(item, index)"
                                            class="table-btn btn btn-sm btn-outline-secondary mr-2 mb-1">Видалити</button>
                                </span>
							<span v-else>
                                    <button class="table-btn btn btn-sm btn-outline-secondary mr-2"
                                            @click="cancel(item)">Відмінити</button>
                                    <button class=" table-btn btn btn-sm btn-outline-secondary mr-2"
                                            @click="save(item)">Зберегти</button>
                                </span>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="col-3 offset-9 text-right my-2">
					<button v-show="!editIndex" @click="add" class=" table-btn btn btn-dark mr-3">Додати</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	import generateSchedule from './components/create-schedule/generateSchedule'

	export default {
		name: 'table-content',
		props: {
			rows: Array,
			columns: Array,
			styleForColumns: Object,
			typeForInputs: Object,
			attributes: Object,
			nameTable: String
		},
		data() {
			return {
				selected: '',
				multiSelected: [],
				editIndex: null,
				originalData: null,

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
			add() {
				this.originalData = null
				if (this.nameTable === 'teachers') this.rows.push({
					['Лекції']: false,
					['Практичні']: false,
					['Лабораторні']: false
				})
				else {
					this.rows.push({})
				}
				this.editIndex = this.rows.length - 1
				//let result = this.generateSched(JSON.parse(localStorage.getItem('groups')), JSON.parse(localStorage.getItem('teachers')), JSON.parse(localStorage.getItem('disciplines')), JSON.parse(localStorage.getItem('rooms')))
				//localStorage.setItem('room', JSON.stringify(result))

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
					if (this.multiSelected.length !== 0) item['Група'] = this.multiSelected.join('\n')
					if (this.selected) item['Дисципліна'] = this.selected
					this.setItemsToLocalStorage(this.nameTable)
					this.selected = ''
					this.multiSelected = []
				} else {
					alert('fill in all the fields')
				}
			},
			validate(item) {
				return true;
			}
		}
	}
</script>

<style>
	#form-table {
		width: 100%;
	}

	.display-table {
		display: table
	}

	.table-tr {
		display: table-row
	}

	.table-td {
		display: table-cell
	}

	.table-head {
		display: table-header-group
	}

	.table-body {
		display: table-row-group
	}

	main {
		margin-left: 150px;
	}

	.table-btn {
		width: 90px;
	}

	.container-checkbox {
		display: block;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 22px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.container-checkbox input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkmark {
		position: absolute;
		top: -10px;
		left: 0;
		height: 25px;
		width: 25px;
		border: 1px solid #7f91a5;
	}

	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	.container-checkbox input:checked ~ .checkmark:after {
		display: block;
	}

	.container-checkbox .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid #7f91a5;
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
