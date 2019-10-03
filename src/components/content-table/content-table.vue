<template>
	<main role="main" class="col-md-9  ml-sm-auto col-lg-10">
		<div class="container">
			<div class="display-table table mt-3 my-table-hover">
				<div class="table-head">
					<div class="table-tr">
						<div class="table-td"
						     v-for="(key, i) in columns"
						     v-bind:style="styleForColumns[key]"
						     :key="i">
							{{ key }}
						</div>
						<div class="table-td" width="20%"></div>
					</div>
				</div>
				<div class="table-body">
					<div class="table-tr"
					     v-for="(item, index) in rows"
					     :key="index">
						<form v-bind:id="index"
						      class="table-form"
						      @submit.prevent
						      @keypress.enter.prevent>
							<div class="table-td" v-for="(key, i) in columns"
							     :key="i">
								<span v-if="editIndex !== index">{{ item[key] === true ? '&#10003;' :	item[key] === false ? '&#10007;' : item[key]}}</span>
								<div v-if="editIndex === index">
									<select v-bind:form="index"
									        class="form-control form-control-sm form-input"
									        v-if="nameTable === 'teachers' && typeForInputs[key] === 'select'"
									        v-model="selected">
										<option disabled value="">Дисципліна</option>
										<option v-for="(option, i) in getItemsFromLocalStorage('disciplines')"
										        v-bind:key="i" v-bind:value="option['Назва дисципліни']">
											{{ option['Назва дисципліни'] }}
										</option>
									</select>
									<select v-bind:form="index" class="form-control form-control-sm form-input"
									        multiple
									        v-else-if="nameTable === 'disciplines' && typeForInputs[key] === 'select'"
									        v-model="multiSelected">
										<option v-for="(option, i) in getItemsFromLocalStorage('groups')" v-bind:key="i"
										        v-bind:value="option['Група']">
											{{ option['Група']}}
										</option>
									</select>
									<label v-else-if="typeForInputs[key] === 'checkbox'" class="container-checkbox">
										<input v-bind:form="index"
										       class="form-control form-control-sm"
										       v-bind:type="typeForInputs[key]"
										       v-model="item[key]">
										<span class="checkmark"></span>
									</label>
									<span v-else-if="typeForInputs[key] === 'number' && key !== 'Номер аудиторії' && key !== 'Кількість місць'">
									<label class="inp">
										<input :form="index"
										       :type="typeForInputs[key]"
										       required
										       min="0"
										       max="100"
										       class="form-control form-control-sm form-input"
										       placeholder=" "
										       v-model="item[key]">
										<span class="label">{{key}}</span>
										<span class="border"></span>
									</label>
								</span>
									<span v-else>
									<label class="inp">
										<input v-bind:form="index"
										       v-bind:type="typeForInputs[key]"
										       placeholder=" "
										       required
										       maxlength="100"
										       class="form-control form-control-sm  form-input"
										       v-model="item[key]">
										<span class="label">{{key}}</span>
										<span class="border"></span>
									</label>
								</span>

								</div>
							</div>
							<div class="table-td ">
                                <span v-if="editIndex !== index">
                                    <button @click="edit(item, index)"
                                            class="table-btn btn btn-sm btn-outline mr-2 mb-1">Редагувати</button>
                                    <button @click="remove(item, index)"
                                            class="table-btn btn btn-sm btn-outline mr-2 mb-1">Видалити</button>
                                </span>
								<span v-else>
                                    <button class="table-btn btn btn-sm btn-outline mr-2"
                                            @click="cancel(item)">Відмінити</button>
                                    <button type="submit" v-bind:form="index" class=" table-btn btn btn-sm btn-outline mr-2"
                                            @click="save(item, index)">Зберегти</button>
                                </span>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="text-right my-2 mx-3">
				<button v-show="!editIndex" @click="add" class="table-btn btn btn-primary">Додати</button>
			</div>
		</div>
	</main>
</template>
<script>
	import generateSchedule from '../create-schedule/generateSchedule';


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
				this.originalData = null;
				if (this.nameTable === 'teachers') this.rows.push({
					['Лекції']: false,
					['Практичні']: false,
					['Лабораторні']: false
				});
				else {
					this.rows.push({})
				}
				this.editIndex = this.rows.length - 1;
				//let result = this.generateSched(JSON.parse(localStorage.getItem('groups')), JSON.parse(localStorage.getItem('teachers')), JSON.parse(localStorage.getItem('disciplines')), JSON.parse(localStorage.getItem('rooms')));
				//localStorage.setItem('shedule', JSON.stringify(result));

			},
			edit(item, index) {
				this.originalData = Object.assign({}, item);
				this.editIndex = index;
			},
			cancel(item) {
				this.editIndex = null;
				if (!this.originalData) {
					this.rows.splice(this.rows.indexOf(item), 1);
					return
				}
				Object.assign(item, this.originalData);
				this.originalData = null;
			},
			remove(item, index) {
				this.rows.splice(index, 1);
			},
			save(item, index) {
				if(document.getElementById(index).checkValidity()) {
					this.originalData = null;
					this.editIndex = null;
					if (this.multiSelected.length !== 0) item['Група'] = this.multiSelected.join(' ');
					if (this.selected) item['Дисципліна'] = this.selected;
					this.setItemsToLocalStorage(this.nameTable);
					this.selected = '';
					this.multiSelected = [];
					return true;
				} else {
					return false;
				}
			},
		}
	}
</script>
