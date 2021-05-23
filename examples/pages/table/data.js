import { createDocPropItem, createDocEventItem } from "../../utils/index.js";

const tablePropsData = [
  createDocPropItem("data", "需要显示的数据", "array"),
  createDocPropItem(
    "height",
    "表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头",
    "string"
  ),
  createDocPropItem("stripe", "是否为斑马纹 table", "boolean", "false"),
  createDocPropItem("border", "是否带有纵向边框", "boolean", "false"),
  createDocPropItem("show-header", "是否显示表头", "boolean", "true"),
  createDocPropItem("draggable", "是否开启拖拽调整行顺序", "boolean", "false"),
  createDocPropItem(
    "text-align",
    "cell单元格中的水平对齐方式",
    "string",
    "center",
    "left / center / right / start / end / justify"
  ),
  createDocPropItem(
    "vertical-align",
    "cell单元格中的垂直对齐方式",
    "string",
    "middle",
    "top / middle / bottom / baseline /sub / text-top / text-bottom / length单位"
  ),
  createDocPropItem("cellpadding", "cell单元格中的内边距", "string", "10px"),
  createDocPropItem("default-sort", "默认排序方式", "object"),
  createDocPropItem(
    "row-class-name",
    "行的 className 的回调方法，传入参数：row：当前行数据、index：当前行的索引",
    "function"
  )
];

const tableEventData = [
  createDocEventItem("row-click", "当某一行被点击时会触发该事件", "event,row"),
  createDocEventItem(
    "cell-click",
    "当某个单元格被点击时会触发该事件",
    " event,row, column"
  ),
  createDocEventItem("sort-change", "当点击排序时触发", "prop,order,data"),
  createDocEventItem(
    "drag-drop",
    "拖拽排序松开时触发，返回置换的两行数据索引",
    "indexA,indexB,data"
  )
];

export { tablePropsData, tableEventData };