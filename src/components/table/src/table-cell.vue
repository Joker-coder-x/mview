<template>
  <div :class="'table-cell' | prefixClass" :style="getCellStyle">
    <template v-if="renderType === RENDER_TYPE_LIST[0]">
      <span>{{ row[column.prop] }}</span>
    </template>
    <template v-else-if="renderType === RENDER_TYPE_LIST[1]">
      <span>{{ column.label }}</span>
    </template>
  </div>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";

const RENDER_TYPE_LIST = ["nomal", "head"];

export default {
  name: "MTableCell",

  inject: ["tableInstance"],

  mixins: [StyleMixin],

  props: {
    row: Object,
    column: Object,
    renderType: {
      type: String,
      default: RENDER_TYPE_LIST[0]
    }
  },

  data() {
    return {
      RENDER_TYPE_LIST
    };
  },

  computed: {
    getCellStyle() {
      return {
        padding: this.tableInstance.cellpadding
      };
    }
  }
};
</script>
