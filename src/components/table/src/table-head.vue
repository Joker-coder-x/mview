<template>
  <table
    :class="'table-head' | prefixClass"
    cellspacing="0"
    cellpadding="0"
    border="0"
  >
    <colgroup>
      <col v-for="col in columns" :width="setCellWidth(col)" :key="col.prop" />
      <col
        v-if="tableInstance.isShowScrollYBar"
        :width="tableInstance.scrollYBarWidth"
      />
    </colgroup>
    <thead>
      <tr>
        <th v-for="item in columns" :key="item.prop">
          <table-cell :column="item" renderType="head"></table-cell>
        </th>
        <th v-if="tableInstance.isShowScrollYBar"></th>
      </tr>
    </thead>
  </table>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";
import TableMixin from "./mixin.js";
import TableCell from "./table-cell.vue";

export default {
  name: "MTableHead",

  mixins: [StyleMixin, TableMixin],

  components: {
    TableCell
  },

  inject: ["tableInstance"],

  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnsWidth: Object,
    styleObject: [Object, Array]
  }
};
</script>
