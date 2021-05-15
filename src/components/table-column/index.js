import TableColumn from "../table/src/table-column.vue";

TableColumn.install = function(Vue) {
  Vue.component(TableColumn.name, TableColumn);
};

export default TableColumn;