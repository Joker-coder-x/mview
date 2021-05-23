<template>
  <tr
    v-if="draggable && row"
    @click="handleTrClick"
    draggable="true"
    @dragstart="handleDragStart($event, row.$index)"
    @drop="handleDrop($event, row.$index)"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    :class="dragHover ? 'drag-hover' : ''"
    :data-fixed-left="tableRoot.fiexdLeftColumns.length > 0 ? 'true' : 'false'"
  >
    <slot></slot>
  </tr>
  <tr
    v-else
    @click="handleTrClick"
    :data-fixed-left="tableRoot.fiexdLeftColumns.length > 0 ? 'true' : 'false'"
  >
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: "MtableTr",

  inject: ["tableRoot"],

  props: {
    row: Object
  },

  data() {
    return {
      dragHover: false
    };
  },

  computed: {
    draggable() {
      return this.tableRoot.draggable;
    }
  },

  methods: {
    handleTrClick(e) {
      this.tableRoot.handleRowClick(e, this.row);
    },

    handleDragStart(e, index) {
      e.dataTransfer.setData("index", index);
    },

    handleDrop(e, index) {
      const dragIndex = e.dataTransfer.getData("index");
      if (e.dataTransfer.clearData) {
        e.dataTransfer.clearData("index");
      }

      this.tableRoot.handleDrop(dragIndex, index);
      this.dragHover = false;

      e.preventDefault();
    },

    handleDragOver(e) {
      e.preventDefault();
      if (!this.dragHover) {
        this.dragHover = true;
      }
    },

    handleDragEnter(e) {
      this.dragHover = true;
      e.preventDefault();
    },

    handleDragLeave(e) {
      this.dragHover = false;
      e.preventDefault();
    }
  }
};
</script>
