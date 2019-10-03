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
                            <th width="15%"></th>
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
                                <div v-if="editIndex === index">
                                  <input required  class="form-control form-control-sm" v-bind:type="typeInputs[key]" v-model="item[key]">
                                </div>
                            </td>
                            <td>
                                <span v-if="editIndex !== index">
                                    <button @click="edit(item, index)" class="table-btn btn btn-sm btn-outline-secondary mr-2 mb-1">Редагувати</button>
                                    <button @click="remove(item, index)" class="table-btn btn btn-sm btn-outline-secondary mr-2 mb-1">Видалити</button>
                                </span>
                                <span v-else>
                                    <button class="table-btn btn btn-sm btn-outline-secondary mr-2" @click="cancel(item)">Відмінити</button>
                                    <button class=" table-btn btn btn-sm btn-outline-secondary mr-2" form="form-table" @click="save(item)">Зберегти</button>
                                </span>
                            </td>
                        </tr>  
                    </tbody>
                </table>
            </div>
        </div>
</main>
</template>

<script>
export default {
    name: 'add-params',
    title: 'Додати параметри',
    data() {
    return {
        nameTable: 'schedule',
        editIndex: null,
        originalData: null,
        columns: ['Критерій', 'Значення'],
        rows: [
            {'Критерій': 'Кількість навчальних годин на тиждень', 'Значення': '30'},
            {'Критерій': 'Кількість робочих днів', 'Значення': '5'},
            {'Критерій': 'Кількість годин в день', 'Значення': '6'},
            {'Критерій': 'Кількість тижнів', 'Значення': '1'},
            {'Критерій': 'Потокові заняття', 'Значення': '✓'},
            {'Критерій': 'Поділ на підгрупи', 'Значення': '⮾'},
            {'Критерій': 'Поділ пари на уроки', 'Значення': '✓'},
            {'Критерій': 'Критерії генерації', 'Значення': ''},
            {'Критерій': 'Розмір початкової популяції', 'Значення': '100'},
            {'Критерій': 'Розмір вибірки кращих особин', 'Значення': '10'},
            {'Критерій': 'Значення похибки', 'Значення': '0,001'}
          ],
        styleColumns: {
                'Критерій': {width: "20%"},
                'Значення': {width: "20%"},
        },
        typeInputs: {
                'Критерій': 'text',
                'Значення': 'text'
        },
    }
  },
  methods: {
    getItemsFromLocalStorage(name) {
      return JSON.parse(localStorage.getItem(name))
    },
    setItemsToLocalStorage(name) {
      localStorage.setItem(name, JSON.stringify(this.rows))
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
      if(this.validate(item)) {
      this.originalData = null
      this.editIndex = null
      this.setItemsToLocalStorage(this.nameTable)
      }
      else {
        alert('fill in all the fields')
      }
    },
    validate(item) {
      let keys = Object.keys(item);
      return true;
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

<style>
#form-table {
  width: 100%;
}
.display-table {
  display: table
}
.table-tr {
  display:table-row
}
.table-td {
  display:table-cell
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
