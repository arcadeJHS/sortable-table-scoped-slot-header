<script setup lang="ts">
import Table from './Table.vue';
import SortableTableHeader from './SortableTableHeader.vue';

const fields = [
  {
    label: 'Job Family',
    fieldname: 'jobFamily',
    sortable: false
  },
  {
    label: 'Level',
    fieldname: 'level',
    sortable: true
  },
  {
    label: 'Skills Level',
    fieldname: 'skillsLevel',
    sortable: true
  }
];
</script>

<template>
  <Table :fields="fields">

    <template #thead="{ fields, sortField, sortOrder, sortByField }">
      <SortableTableHeader 
        :fields="fields" 
        :sortField="sortField" 
        :sortOrder="sortOrder" 
        @click="sortByField" 
      />
    </template>

  </Table>
</template>