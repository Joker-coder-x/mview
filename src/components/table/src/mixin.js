export default {
  methods: {
    setCellWidth(column) {
      let width = "";
      if (column.width) {
        width = column.width;
      } else if (this.columnsWidth[column._index]) {
        width = this.columnsWidth[column._index];
      }
      if (width === "0") width = "";
      return width;
    }
  }
};