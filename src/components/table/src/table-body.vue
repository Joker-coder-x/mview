<template>
  <table
    :class="'table-body' | prefixClass"
    :style="styleObject"
    cellspacing="0"
    cellpadding="0"
    border="0"
  >
    <colgroup>
      <col v-for="col in columns" :width="setCellWidth(col)" :key="col.prop" />
    </colgroup>
    <tbody>
      <tr
        v-for="row in data"
        :key="row.$idnex"
        :class="[row.rowClassName ? row.rowClassName : '']"
        :data-custom-row-class="row.rowClassName ? 'true' : 'false'"
      >
        <td
          v-for="(col, idx) in columns"
          :key="idx"
          :class="getTdClass(row, col)"
        >
          <table-cell :row="row" :column="col"></table-cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { hasOwn } from "@/utils/index.js";
import { StyleMixin } from "@/mixins/index.js";
import TableMixin from "./mixin.js";

import TableCell from "./table-cell.vue";

export default {
  name: "MtableBody",

  components: {
    TableCell
  },

  mixins: [StyleMixin, TableMixin],

  props: {
    data: Array,
    columns: Array,
    columnsWidth: Object,
    styleObject: [Object, Array]
  },

  methods: {
    getTdClass(row, { prop, className }) {
      const cellClassName = row.cellClassName,
        classList = [];

      if (className.length > 0) {
        classList.push(className);
      }

      if (hasOwn(cellClassName, prop)) {
        const $cellClassName = cellClassName[prop];
        if (typeof $cellClassName === "string" && $cellClassName.length > 0) {
          classList.push($cellClassName);
        }
      }

      return classList;
    }
  }
};
</script>
