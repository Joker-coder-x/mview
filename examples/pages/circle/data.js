import { createDocPropItem } from "../../utils/index.js";

const CirclePropsData = [
  createDocPropItem("percent", "百分比", "number", "0"),
  createDocPropItem("size", "图表的宽度和高度，单位 px", "number", "120"),
  createDocPropItem(
    "stroke-linecap",
    "进度环顶端的形状，可选值为square（方）和round（圆）",
    "string",
    "round",
    "square / round"
  ),
  createDocPropItem("stroke-width", "进度环的线宽，单位 px", "number", "6"),
  createDocPropItem("stroke-color", "进度环的颜色", "string", "#409eff"),
  createDocPropItem("trail-width", "进度环背景的线宽，单位 px", "number", "5"),
  createDocPropItem("trail-color", "进度环背景的颜色", "string", "#e5e9f2"),
  createDocPropItem("dashboard", "是否显示为仪表盘", "boolean", "false")
];

export { CirclePropsData };