<template>
  <div :class="PREFIX | prefixClass" :style="getCellStyle">
    <template v-if="renderType === RENDER_TYPE_LIST[0]">
      <span>{{ row[column.prop] }}</span>
    </template>
    <template v-else-if="renderType === RENDER_TYPE_LIST[1]">
      <span>{{ column.label }}</span>
      <span v-if="column.sortable" :class="`${PREFIX}__sort` | prefixClass">
        <icon
          name="sort-asc"
          :class="[
            'asc',
            {
              'sort-active':
                tableInstance.sortColumn === column.prop &&
                tableInstance.sortType === 'asc'
            }
          ]"
          @click="handleIconClick('asc')"
        ></icon>
        <icon
          name="sort-desc"
          :class="[
            'desc',
            {
              'sort-active':
                tableInstance.sortColumn === column.prop &&
                tableInstance.sortType === 'desc'
            }
          ]"
          @click="handleIconClick('desc')"
        ></icon>
      </span>
    </template>
  </div>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";
import Icon from "../../icon/index.js";

const RENDER_TYPE_LIST = ["nomal", "head", "sortable"],
  PREFIX = "table-cell";

export default {
  name: "MTableCell",

  components: { Icon },

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
      RENDER_TYPE_LIST,
      PREFIX
    };
  },

  computed: {
    getCellStyle() {
      return {
        padding: this.tableInstance.cellpadding
      };
    }
  },

  methods: {
    handleIconClick(orderType) {
      const tableInstance = this.tableInstance;
      orderType === "asc"
        ? tableInstance.handleSortByAsc(this.column)
        : tableInstance.handleSortByDesc(this.column);
    }
  }
};
</script>
