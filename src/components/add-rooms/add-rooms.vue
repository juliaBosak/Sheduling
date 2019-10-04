<template>
  <table-content
    :typeForInputs="typeInputs"
    :styleForColumns="styleColumns"
    :rows="gridData"
    :columns="gridColumns"
    :attributes="attributes1"
    :nameTable="nameTable" >
  </table-content>
</template>

<script>
import tableContent from '../content-table/content-table'
export default {
    name: 'add-rooms',
    title: 'Додати аудиторії',
    components: {
        tableContent
    },
    data() {
        return {
            nameTable: 'rooms',
            gridColumns: ['Номер аудиторії', 'Лекція', 'Практика', 'Лабораторна', 'Кількість місць'],
            styleColumns: {
                'Номер аудиторії': {width: "18%"},
                'Кількість місць': {width: "18%"},
                'Лекція': {width: "12%"},
                'Практика': {width: "12%"},
                'Лабораторна': {width: "12%"}
                
           },
            typeInputs: {
                'Номер аудиторії': 'number',
                'Кількість місць': 'number',
                'Лекція': 'checkbox',
                'Практика': 'checkbox',
                'Лабораторна': 'checkbox'
            },
            attributes1: {
            },
            gridData: [
                    { 'Номер аудиторії': "101", 'Кількість місць': "50", 'Лекція': true, 'Практика': false, 'Лабораторна': false},
                    { 'Номер аудиторії': "102", 'Кількість місць': "30", 'Лекція': false, 'Практика': true, 'Лабораторна': false},
                    { 'Номер аудиторії': "103", 'Кількість місць': "15", 'Лекція': false, 'Практика': false, 'Лабораторна': true},
                    { 'Номер аудиторії': "104", 'Кількість місць': "25", 'Лекція': false, 'Практика': false, 'Лабораторна': true},
                    { 'Номер аудиторії': "105", 'Кількість місць': "25", 'Лекція': false, 'Практика': false, 'Лабораторна': true},
                    { 'Номер аудиторії': "106", 'Кількість місць': "15", 'Лекція': false, 'Практика': false, 'Лабораторна': true},
                    { 'Номер аудиторії': "107", 'Кількість місць': "50", 'Лекція': true, 'Практика': false, 'Лабораторна': false},
                    { 'Номер аудиторії': "108", 'Кількість місць': "30", 'Лекція': false, 'Практика': true, 'Лабораторна': false},
                    { 'Номер аудиторії': "109", 'Кількість місць': "30", 'Лекція': false, 'Практика': true, 'Лабораторна': false},
                    { 'Номер аудиторії': "110", 'Кількість місць': "50", 'Лекція': true, 'Практика': false, 'Лабораторна': false}

            ]
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
        localStorage.setItem(this.nameTable, JSON.stringify(this.gridData));
        if (localStorage.getItem(this.nameTable)) this.gridData = JSON.parse(localStorage.getItem(this.nameTable))
    },
}
</script>