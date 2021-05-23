<template>
  <div
    :class="PREFIX | prefixClass"
    :style="getCellStyle"
    @click="handleCellClick"
  >
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
                tableRoot.sortColumn === column.prop &&
                tableRoot.sortType === 'asc'
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
                tableRoot.sortColumn === column.prop &&
                tableRoot.sortType === 'desc'
            }
          ]"
          @click="handleIconClick('desc')"
        ></icon>
      </span>
    </template>
    <template v-else-if="renderType === RENDER_TYPE_LIST[2]">
      <table-slot
        :row="row"
        :column="column"
        :index="row.$index"
        :slot-render="column.slotRender"
      ></table-slot>
    </template>
    <template v-else-if="renderType === RENDER_TYPE_LIST[3]">
      <table-slot
        :column="column"
        :slot-render="column.headerSlotRender"
      ></table-slot>
    </template>
  </div>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";

import TableSlot from "./table-slot.vue";
import Icon from "../../icon/index.js";

const RENDER_TYPE_LIST = ["nomal", "head", "slot", "headerSlot"],
  PREFIX = "table-cell";

export default {
  name: "MTableCell",

  components: { Icon, TableSlot },

  inject: ["tableRoot"],

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
        padding: this.tableRoot.cellpadding
      };
    }
  },

  methods: {
    handleIconClick(orderType) {
      const tableRoot = this.tableRoot;
      orderType === "asc"
        ? tableRoot.handleSortByAsc(this.column)
        : tableRoot.handleSortByDesc(this.column);
    },

    handleCellClick(e) {
      this.tableRoot.handleCellClick(e, this.row, this.column);
    }
  }
};
</script>
