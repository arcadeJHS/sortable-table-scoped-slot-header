<script setup>
import { UseStore } from './UseStore.ts';
import { UseTableDataSorter } from './UseTableDataSorter';

const props = defineProps({
  fields: []
});

const items = UseStore();

const { sortedData, sortField, sortOrder, sortByField } = UseTableDataSorter({
  data: items.value,
  field: 'level',
  order: 'asc'
});
</script>

<template>
  <table>
    <thead>
      <tr>

        <slot name="thead" v-bind="{ fields: props.fields, sortField, sortOrder, sortByField }">
          <th v-for="(field, index) in fields" :key="index">
            <span v-html="`DEFAULT - ${field.label}`"></span>
          </th>
        </slot>

      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedData" :key="item.id">
        <td v-for="(field, index) in props.fields" :key="index">
          {{ item[field.fieldname] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
  table thead tr {
    background: #eee;
  }
  table tbody tr {
    background: #fafafa;
  }
  table th,
  table td {
    padding: 2px 10px;
    text-align: left;
  }
</style>