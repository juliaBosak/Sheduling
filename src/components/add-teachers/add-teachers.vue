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
    name: 'add-teachers',
    title: 'Додати викладачів',
    components: {
        tableContent
    },
    data() {
        return {
            nameTable: 'teachers',
            gridColumns: ['ПІБ викладача', 'Дисципліна', 'Лекції', 'Практичні',  'Лабораторні'],
            styleColumns: {
                'ПІБ викладача': {width: "18%"},
                'Дисципліна': {width: "15%"},
                'Лекції': {width: "12%"},
                'Практичні': {width: "12%"},
                'Лабораторні': {width: "12%"}
                
           },
            typeInputs: {
                'ПІБ викладача': 'text',
                'Дисципліна': 'select',
                'Лекції': 'checkbox',
                'Практичні': 'checkbox',
                'Лабораторні': 'checkbox'
            },
            attributes1: {
                'Лекції': {
                    'id': 'lecture'
                    },
                'Практичні': {
                    'id': 'practice'
                },
                'Лабораторні': {
                    'id': 'lab'
                }
            },
            gridData: [
                { 'ПІБ викладача': 'Месюра В. І.', 'Дисципліна': 'МСШІ', 'Лекції': true, 'Практичні': true, 'Лабораторні': false},
                { 'ПІБ викладача': 'Крилик Л. В.', 'Дисципліна': 'МЗКІТ', 'Лекції': true, 'Практичні': true, 'Лабораторні': true},
                { 'ПІБ викладача': 'Ольшанська О. В.', 'Дисципліна': 'ТКП', 'Лекції': false, 'Практичні': true, 'Лабораторні': true},
              { 'ПІБ викладача': 'Петришин С. І.', 'Дисципліна': 'ТКП', 'Лекції': false, 'Практичні': true, 'Лабораторні': true},
              { 'ПІБ викладача': 'Савчук Т. О.', 'Дисципліна': 'ТКП', 'Лекції': true, 'Практичні': false, 'Лабораторні': false},
              { 'ПІБ викладача': 'Іванчук Я. В.', 'Дисципліна': 'УІТП', 'Лекції': false, 'Практичні': false, 'Лабораторні': true},
              { 'ПІБ викладача': 'Месюра В. І.', 'Дисципліна': 'УІТП', 'Лекції': true, 'Практичні': false, 'Лабораторні': false},
              { 'ПІБ викладача': 'Причепа І. В.', 'Дисципліна': 'ЕОБ', 'Лекції': true, 'Практичні': true, 'Лабораторні': false},
              { 'ПІБ викладача': 'Крилик Л. В.', 'Дисципліна': 'ММДОС', 'Лекції': true, 'Практичні': true, 'Лабораторні': true},
              { 'ПІБ викладача': 'Вахоська Л. М.', 'Дисципліна': 'МСШІ', 'Лекції': false, 'Практичні': false, 'Лабораторні': true}







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