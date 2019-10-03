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
    name: 'add-groups',
    title: 'Додати групи',
    components: {
        tableContent
    },
    data() {
        return {
            nameTable: 'groups',
            gridColumns: ['Курс', 'Група', 'Кількість студентів'],
            styleColumns: {
                'Курс': {width: "20%"},
                'Група': {width: "20%"},
                'Кількість студентів': {width: "20%"},

                
           },
            typeInputs: {
                'Курс': 'number',
                'Група': 'text',
                'Кількість студентів': 'number',
            },
            attributes1: {
            },
            gridData: [
                {'Курс': "4", 'Група': "1КН-15б", 'Кількість студентів': "22"},
                {'Курс': "4", 'Група': "2КН-15б", 'Кількість студентів': "12"},
                {'Курс': "4", 'Група': "ЗКН-15б", 'Кількість студентів': "15"}
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
        if (localStorage.getItem(this.nameTable)) this.gridData = JSON.parse(localStorage.getItem(this.nameTable))
    }
}
</script>