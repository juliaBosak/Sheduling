<template>
    <div id="Table">

  <table-content
    :typeForInputs="typeInputs"
    :styleForColumns="styleColumns"
    :rows="gridData"
    :columns="gridColumns">
  </table-content>
</div>
</template>

<script>
import tableContent from './table-content'
export default {
    name: 'table-root',
    components: {
        tableContent
    },
    data() {
        return {
            gridColumns: ['discipline', 'course', 'group', 'lectures', 'labs', 'practices'],
            styleColumns: {
                'discipline': {width: "20%"},
                'course': {width: "12%"},
                'group': {width: "12%"},
                'lectures': {width: "12%"},
                'labs': {width: "12%"},
                'practices': {width: "12%"}

            },
            typeInputs: {
                'discipline': 'text',
                'course': 'number',
                'group': 'number',
                'lectures': 'number',
                'labs': 'number',
                'practices': 'number'

            },
            gridData: [
                    { discipline: 'Computer networks', course: 4, group: 1, lectures: 2, labs: 2, practices: 1 },
                    { discipline: 'Computer design', course: 4, group: 1, lectures: 2, labs: 2, practices: 2, },
                    {discipline: 'Systems of artificial intelligence', course: 4, group: 1, lectures: 1, labs: 1, practices: 1}
      
            ]
        }
    }
}
</script>

<style>

</style>
