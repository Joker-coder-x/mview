<template>
  <div :class="getWrapClass">
    <div :class="getTableClass" :style="getTableStyle">
      <scroll-container
        v-if="showHeader"
        v-model="scrollHeadInfo"
        :width="tableHeadWrapWidth + 'px'"
        :height="tableHeadWrapHeight + 'px'"
        overflow-x="auto"
        overflow-y="hidden"
      >
        <div
          :class="'table-head-wrap' | prefixClass"
          :style="getTableHeadContainerStyle"
          ref="head-wrap"
        >
          <table-head
            :columns="excludeFixedColumns(currentColumns)"
            :columnsWidth="columnsWidth"
            :styleObject="{ width: tableBodyScrollWidth + 'px' }"
            ref="head"
          ></table-head>
        </div>
      </scroll-container>
      <div
        ref="body-wrap"
        :class="getTableBodyWrapClass"
        :style="{ height: height }"
        @scroll="handleTableScroll($event, true)"
      >
        <div :style="getTableBodyContainerStyle">
          <table-body
            :data="currentData"
            :columns="excludeFixedColumns(currentColumns)"
            :columnsWidth="columnsWidth"
            :styleObject="{ width: tableBodyScrollWidth + 'px' }"
            ref="body"
          ></table-body>
        </div>
      </div>
      <template v-if="fiexdLeftColumns.length > 0">
        <div :class="getFixedLeftClass" :style="getFixedLeftStyle">
          <table-head
            :columns="fiexdLeftColumns"
            :columnsWidth="columnsWidth"
          ></table-head>
          <scroll-container
            v-model="scrollFixedLeftInfo"
            :width="fixedLeftWidth + 'px'"
            :height="tableWrapClientHeight + 'px'"
            @scroll="handleTableScroll"
            prevent
          >
            <table-body
              :data="currentData"
              :columns="fiexdLeftColumns"
              :columnsWidth="columnsWidth"
              :styleObject="getFixedTableBodyStyle"
            ></table-body>
          </scroll-container>
        </div>
      </template>
      <template v-if="fiexdRightColumns.length > 0">
        <div :class="getFixedRightClass" :style="getFixedRightStyle">
          <table-head
            :columns="fiexdRightColumns"
            :columnsWidth="columnsWidth"
          ></table-head>
          <scroll-container
            v-model="scrollFixedRightInfo"
            :width="fixedRightWidth + 'px'"
            :height="tableWrapClientHeight + 'px'"
            @scroll="handleTableScroll"
            prevent
          >
            <table-body
              :data="currentData"
              :columns="fiexdRightColumns"
              :columnsWidth="columnsWidth"
              :styleObject="getFixedTableBodyStyle"
            ></table-body>
          </scroll-container>
        </div>
      </template>
    </div>
    <div :class="'table-slot' | prefixClass"><slot></slot></div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

import {
  jsonClone,
  hasOwn,
  $on,
  $off,
  deleteProp,
  ExportHelper
} from "@/utils/index.js";
import { filterCsvData } from "./util.js";

import { StyleMixin } from "@/mixins/index.js";

import TableHead from "./table-head.vue";
import TableBody from "./table-body.vue";
import ScrollContainer from "../../scroll-container/index.js";

export default {
  name: "MTable",

  components: {
    TableHead,
    TableBody,
    ScrollContainer
  },

  mixins: [StyleMixin],

  provide() {
    return {
      tableRoot: this
    };
  },

  props: {
    rowClassName: Function,
    data: {
      type: Array,
      default: () => []
    },
    // 是否带有斑马条纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: false
    },
    height: String,
    textAlign: {
      type: String,
      default: "center"
    },
    verticalAlign: {
      type: String,
      default: "middle"
    },
    cellpadding: {
      type: String,
      default: "10px"
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    //默认排序方式
    defaultSort: Object
  },

  data() {
    return {
      currentData: [],
      currentColumns: [],
      fiexdLeftColumns: [],
      fiexdRightColumns: [],
      columnsWidth: {},
      tableWidth: 0,
      tableHeight: 0,
      tableBodyWrapHeight: 0,
      tableBodyWrapWidth: 0,
      tableBodyScrollHeight: 0,
      tableBodyScrollWidth: 0,
      scrollYBarWidth: 0,
      scrollXBarHeight: 0,
      fixedLeftWidth: 0,
      fixedRightWidth: 0,
      tableWrapClientWidth: 0,
      tableWrapClientHeight: 0,
      tableHeadWrapWidth: 0,
      tableHeadWrapHeight: 0,
      isShowFixedLeftShadow: false,
      isShowFixedRightShadow: false,
      scrollHeadInfo: {
        scrollLeft: 0,
        scrollTop: 0
      },
      scrollFixedLeftInfo: {
        scrollLeft: 0,
        scrollTop: 0
      },
      scrollFixedRightInfo: {
        scrollLeft: 0,
        scrollTop: 0
      },
      preventScrollEvent: false,
      sortColumn: "",
      sortType: ""
    };
  },

  computed: {
    getWrapClass() {
      return [
        `${this.cssPrefix}table-wrap`,
        {
          "is--border": this.border,
          "is--stripe": this.stripe
        }
      ];
    },

    getTableClass() {
      return [`${this.cssPrefix}table`];
    },

    getTableBodyWrapClass() {
      return [
        `${this.cssPrefix}table-body-wrap`,
        {
          "overflow-y": this.isShowScrollYBar,
          "overflow-x": this.isShowScrollXBar
        }
      ];
    },

    getFixedLeftClass() {
      return [
        "fixed-left",
        {
          shadow: this.isShowFixedLeftShadow
        }
      ];
    },

    getFixedRightClass() {
      return [
        "fixed-right",
        {
          shadow: this.isShowFixedRightShadow
        }
      ];
    },

    getTableStyle() {
      return {
        textAlign: this.textAlign,
        verticalAlign: this.verticalAlign
      };
    },

    getTableHeadContainerStyle() {
      return {
        width:
          this.tableBodyScrollWidth +
          this.fixedLeftWidth +
          this.fixedRightWidth +
          (this.isShowScrollYBar ? 1 : 0) +
          "px",
        paddingLeft: this.fixedLeftWidth + "px",
        paddingRight: this.fixedRightWidth + "px"
      };
    },

    getTableBodyContainerStyle() {
      return {
        width:
          this.tableBodyScrollWidth +
          this.fixedLeftWidth +
          this.fixedRightWidth -
          this.scrollYBarWidth -
          2 +
          "px",
        paddingLeft: this.fixedLeftWidth + "px",
        paddingRight: this.fixedRightWidth + "px"
      };
    },

    getFixedTableBodyStyle() {
      return {
        height: this.tableBodyScrollHeight + "px"
      };
    },

    getFixedLeftStyle() {
      return {
        width: this.fixedRightWidth + "px",
        height: this.tableHeight - 2 + "px"
      };
    },

    getFixedRightStyle() {
      return {
        width: this.fixedRightWidth + "px",
        height: this.tableHeight - 2 + "px",
        right: (this.isShowScrollYBar ? this.scrollYBarWidth : 0) + "px"
      };
    },

    isShowScrollYBar() {
      return this.height;
    },

    isShowScrollXBar() {
      return (
        this.fiexdLeftColumns.length > 0 || this.fiexdRightColumns.length > 0
      );
    }
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.makeData();
      }
    }
  },

  mounted() {
    this.makeColumns();
    this.makeData();

    if (this.defaultSort) {
      this.initSort();
    }

    if (this.rowClassName) {
      this.currentData.forEach((row, index) => {
        let className = this.rowClassName({ row: jsonClone(row), index });

        if (typeof className !== "string") {
          className = "";
        }

        row.rowClassName = className;
      });
    }

    this.$nextTick(() => {
      this.handleResize();

      $on(window, "resize", this.handleResize);
      this.__handleResize__ = this.handleResize;

      this.observer = elementResizeDetectorMaker();
      this.observer.listenTo(this.$el, this.handleResize);
    });
  },

  beforeDestroy() {
    if (this.__handleResize__) {
      $off(window, "resize", this.__handleResize__);
      this.__handleResize__ = null;
      deleteProp(this, "__handleResize__");

      this.observer.removeListener(this.$el, this.handleResize);
    }
  },

  methods: {
    initSort() {
      const defaultSort = this.defaultSort;
      if (defaultSort) {
        let { prop = "", order = "" } = defaultSort;

        if (
          typeof prop === "string" &&
          typeof order === "string" &&
          ["asc", "desc"].indexOf(order.trim()) > -1
        ) {
          order.trim() === "asc"
            ? this.handleSortByAsc({ prop: prop })
            : this.handleSortByDesc({ prop: prop });
        }
      }
    },

    setScroll(scrollInfo, isSetScrollLeft) {
      const scrollElm = this.$refs["body-wrap"];
      if (scrollElm) {
        if (scrollElm.scrollTop != scrollInfo.scrollTop) {
          scrollElm.scrollTop = scrollInfo.scrollTop;
        }

        if (
          isSetScrollLeft &&
          this.scrollHeadInfo.scrollLeft != scrollInfo.scrollLeft
        ) {
          this.scrollHeadInfo.scrollLeft = scrollInfo.scrollLeft;
        }

        if (this.scrollFixedLeftInfo.scrollTop != scrollInfo.scrollTop) {
          this.scrollFixedLeftInfo.scrollTop = scrollInfo.scrollTop;
        }
        if (this.scrollFixedRightInfo.scrollTop != scrollInfo.scrollTop) {
          this.scrollFixedRightInfo.scrollTop = scrollInfo.scrollTop;
        }
      }
    },

    makeData() {
      this.currentData = this.data.map((row, index) => {
        const $row = jsonClone(row);
        $row.$index = index;
        if (!hasOwn($row, "cellClassName")) {
          $row.cellClassName = {};
        }
        return $row;
      });
    },

    makeColumns() {
      const defaultSlot = this.$slots.default,
        columns = [],
        fiexdLeftColumns = [],
        fiexdRightColumns = [];

      if (defaultSlot && Array.isArray(defaultSlot)) {
        defaultSlot.forEach((vnode, index) => {
          const componentOptions = vnode.componentOptions,
            componentInstance = vnode.componentInstance;

          if (componentOptions && componentOptions.tag === "m-table-column") {
            const propData = componentOptions.propsData,
              columnOpts = {
                prop: propData.prop,
                label: propData.label || "",
                className: propData.className || "",
                width: propData.width || "",
                _index: index,
                slotRender:
                  componentInstance && componentInstance.$scopedSlots.default
                    ? componentInstance.$scopedSlots.default
                    : null,
                headerSlotRender:
                  componentInstance && componentInstance.$scopedSlots.header
                    ? componentInstance.$scopedSlots.header
                    : null,
                sortable:
                  (hasOwn(propData, "sortable") && propData.sortable === "") ||
                  propData.sortable === true
                    ? true
                    : false
              };

            columns.push(columnOpts);

            if (hasOwn(propData, "fixed")) {
              const fixed = propData.fixed;
              if (fixed === "" || fixed === "left") {
                fiexdLeftColumns.push(columnOpts);
              } else if (fixed === "right") {
                fiexdRightColumns.push(columnOpts);
              }

              this.fiexdLeftColumns = fiexdLeftColumns;
              this.fiexdRightColumns = fiexdRightColumns;
            }
          }
        });
      }
      this.currentColumns = columns;
    },

    excludeFixedColumns(columns) {
      return columns.filter(col => {
        if (
          this.fiexdLeftColumns.indexOf(col) === -1 &&
          this.fiexdRightColumns.indexOf(col) === -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },

    exportCsv(params = { isHeader: true }) {
      if (params.filename) {
        if (params.filename.indexOf(".csv") === -1) {
          params.filename += ".csv";
        }
      } else {
        params.filename = "table.csv";
      }

      const exportData = filterCsvData(
        this.currentColumns,
        this.currentData,
        params.isHeader || false
      );

      ExportHelper.exportCsv(exportData, { header: false }, params.filename);
    },

    handleResize() {
      requestAnimationFrame(() => {
        const refs = this.$refs,
          elm = this.$el,
          theadVm = refs.head,
          tbodyVm = refs.body,
          tbodyWrap = refs["body-wrap"],
          tableWidth = elm.offsetWidth - 1,
          hasWidthColumns = [],
          noWidthColumns = [],
          columnsWidth = {},
          columns = this.currentColumns,
          scrollYBarWidth = tbodyWrap.offsetWidth - tbodyWrap.clientWidth,
          scrollBottomBarHeight =
            tbodyWrap.offsetHeight - tbodyWrap.clientHeight;

        this.scrollXBarHeight = scrollBottomBarHeight;
        this.scrollYBarWidth = scrollYBarWidth;
        this.tableWrapWidth = tableWidth;
        this.tableWrapHeight = elm.offsetHeight;
        this.tableWrapClientWidth = tbodyWrap.clientWidth;
        this.tableWrapClientHeight = tbodyWrap.clientHeight;

        if (theadVm) {
          this.tableHeadWrapWidth = tableWidth;
          this.tableHeadWrapHeight = theadVm.$el.offsetHeight;
        }
        if (tbodyVm) {
          const tbodyElm = tbodyVm.$el;
          this.tableBodyScrollHeight = tbodyElm.clientHeight;
          this.tableBodyScrollWidth = tbodyElm.clientWidth;
        }

        columns.forEach(col => {
          col.width ? hasWidthColumns.push(col) : noWidthColumns.push(col);
        });

        let unUsableWidth = hasWidthColumns
          .map(cell => parseFloat(cell.width))
          .reduce((a, b) => a + b, 0);
        let usableWidth = tableWidth - unUsableWidth - scrollYBarWidth;
        let usableLength = noWidthColumns.length;
        let columnWidth = 0;
        if (usableWidth > 0 && usableLength > 0) {
          columnWidth = parseFloat(usableWidth / usableLength);
        }

        let col;
        for (let i = 0, l = columns.length; i < l; i++) {
          col = columns[i];
          let width = columnWidth;

          if (col.width) {
            width = col.width;
          }

          columnsWidth[col._index] = width;
          col._width = width;
        }

        this.columnsWidth = columnsWidth;
        this.tableWidth =
          columns
            .map(cell => parseFloat(cell._width))
            .reduce((a, b) => a + b, 0) + scrollYBarWidth;
        this.tableHeight = elm.offsetHeight - scrollBottomBarHeight;
        this.fixedLeftWidth = this.fiexdLeftColumns
          .map(cell => parseFloat(cell._width))
          .reduce((a, b) => a + b, 0);
        this.fixedRightWidth = this.fiexdRightColumns
          .map(cell => parseFloat(cell._width))
          .reduce((a, b) => a + b, 0);
      });
    },

    handleTableScroll({ target }, isSetScrollLeft = false) {
      requestAnimationFrame(() => {
        const scrollLeft = target.scrollLeft,
          scrollTop = target.scrollTop;

        this.setScroll(
          {
            scrollTop,
            scrollLeft
          },
          isSetScrollLeft
        );

        this.isShowFixedLeftShadow = scrollLeft === 0 ? false : true;
        this.isShowFixedRightShadow =
          target.scrollWidth - (scrollLeft + target.offsetWidth) <= 1
            ? false
            : true;
      });
    },

    handleSortByAsc({ prop }) {
      this.currentData.sort((a, b) => {
        return a[prop] > b[prop] ? 1 : -1;
      });

      this.sortColumn = prop;
      this.sortType = "asc";

      this.$emit("sort-change", { prop: prop, order: this.sortType });
    },

    handleSortByDesc({ prop }) {
      this.currentData.sort((a, b) => {
        return a[prop] < b[prop] ? 1 : -1;
      });

      this.sortColumn = prop;
      this.sortType = "desc";

      this.$emit("sort-change", { prop: prop, order: this.sortType });
    }
  }
};
</script>
