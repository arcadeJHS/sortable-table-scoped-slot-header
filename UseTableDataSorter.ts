import { watchEffect, ref } from 'vue';

type TableDataSorterProps<T> = {
  data: T[];
  field: keyof T;
  order: 'asc' | 'desc';
};

const sortedData = ref([]);
const sortField = ref();
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortDataByField = <T>({ data, field, order }: TableDataSorterProps<T>) => {
  const _data = data.concat([]);

  _data.sort((a, b) => {
    const paramA = (a[field] as string) || '';
    const paramB = (b[field] as string) || '';
    return paramA.toString().localeCompare(paramB.toString(), 'en', { numeric: true }) * (order === 'asc' ? 1 : -1);
  });

  return {
    _sortedData: _data,
    _sortField: field,
    _sortOrder: order
  };
};

const sortByField = <T>(column: keyof T) => {
  const order = column === sortField.value && sortOrder.value === 'asc' ? 'desc' : 'asc';
  
  const { _sortedData, _sortField, _sortOrder } = sortDataByField({
    data: sortedData.value,
    field: column,
    order,
  });

  sortField.value = _sortField;
  sortOrder.value = _sortOrder;
  sortedData.value = _sortedData;
};

export const UseTableDataSorter = <T>({ data, field, order }: TableDataSorterProps<T>) => {
  watchEffect(() => {
    const { _sortedData, _sortField, _sortOrder } = sortDataByField({ data, field, order });

    sortedData.value = _sortedData;
    sortField.value = _sortField;
    sortOrder.value = _sortOrder;
  });

  return {
    sortedData, 
    sortField, 
    sortOrder,
    sortByField
  };
}