<template>
  <table-content
    :typeForInputs="typeInputs"
    :styleForColumns="styleColumns"
    :rows="gridData"
    :columns="gridColumns"
    :nameTable ="nameTable">
  </table-content>
</template>

<script>
import tableContent from '../content-table/content-table'
export default {
    name: 'add-disciplines',
    title: 'Додати дисципліни',
    components: {
        tableContent
    },
    data() {
        return {
            nameTable: 'disciplines',
            gridColumns: ['Назва дисципліни', 'Курс', 'Група', 'Лекції', 'Лабораторні', 'Практичні'],
            styleColumns: {
                'Назва дисципліни': {width: "18%"},
                'Курс': {width: "8%"},
                'Група': {width: "15%"},
                'Лекції': {width: "9%"},
                'Лабораторні': {width: "9%"},
                'Практичні': {width: "9%"}

            },
            typeInputs: {
                'Назва дисципліни': 'text',
                'Курс': 'number',
                'Група': 'select',
                'Лекції': 'number',
                'Лабораторні': 'number',
                'Практичні': 'number'

            },
            gridData: [
                {'Назва дисципліни': "ММДОС", 'Курс': "4", 'Лекції': "2", 'Лабораторні': "2", 'Практичні': "1", 'Група': "1КН-15б 2КН-15б"},
                {'Назва дисципліни': "МСШІ", 'Курс': "4", 'Лекції': "2", 'Лабораторні': "2", 'Практичні': "1", 'Група': "1КН-15б 2КН-15б ЗКН-15б"},
                {'Назва дисципліни': "МЗКІТ", 'Курс': "4", 'Лекції': "2", 'Лабораторні': "2", 'Практичні': "1", 'Група': "1КН-15б 2КН-15б 3КН-15б"},
                {'Назва дисципліни': "ТКП", 'Курс': "4", 'Лекції': "2", 'Лабораторні': "2", 'Практичні': "1", 'Група': "1КН-15б 2КН-15б ЗКН-15б"},
                {'Назва дисципліни': "УІТП", 'Курс': "4", 'Лекції': "2", 'Лабораторні': "2", 'Практичні': "0", 'Група': "1КН-15б 2КН-15б ЗКН-15б"},
                {'Назва дисципліни': "ЕОБ", 'Курс': "4", 'Лекції': "1", 'Лабораторні': "0", 'Практичні': "1", 'Група': "1КН-15б 2КН-15б ЗКН-15б"}
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