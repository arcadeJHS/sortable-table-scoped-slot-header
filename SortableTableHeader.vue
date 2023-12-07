<script setup lang="ts">
type Field = {label: string, fieldname: string, sortable?: boolean};

const props = withDefaults(
  defineProps<{
    fields: Field[];
    sortField: string;
    sortOrder: 'asc' | 'desc';
  }>(),
  {
    fields: () => [],
    sortOrder: 'asc'
  }
);

const emit = defineEmits<{
  (e: 'click', field: keyof Field): void;
}>();

const trySorting = (field: Field) => {
  if (!field.sortable) { return; }
  emit('click', field.fieldname as keyof Field);
};

const showSortIcon = (field: Field) => {
  return field.sortable && props.sortField && props.sortField === field.fieldname;
};

const icons = {
  'asc': '&#8595;',
  'desc': '&#8593;'
};
</script>

<template>
  <th 
    v-for="(field, index) in props.fields" 
    :key="index" @click="trySorting(field)"
    :class="{'sortable': field.sortable}">
    <span v-html="field.label"></span>
    <i v-if="showSortIcon(field)" v-html="icons[props.sortOrder]" />
  </th>
</template>

<style>
th {
  cursor: pointer;
}
th.sortable:hover {
  text-decoration: underline;
}
th i {
  margin-left: 0.5rem;
}
</style>
