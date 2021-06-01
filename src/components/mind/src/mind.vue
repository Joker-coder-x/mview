<template>
  <div class="m-mind" :style="getMindStyle" ref="wrapper">
    <svg
      :xmlns="SVG_NS"
      :viewBox="getViewBox"
      @keydown="handleKeyDown"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      tabindex="0"
      version="1.1"
      style="width:100%;height:calc(100% - 30px);"
    >
      <label-node :value="currentData.centralNode"></label-node>
    </svg>
    <bottom-tool-bar :zoomRate="zoomRate"></bottom-tool-bar>
  </div>
</template>

<script>
// 定义常量
const SVG_NS = "http://www.w3.org/2000/svg";

const NODE_TYPE = ["central", "other", "line"];

import LabelNode from "./mind-label-node.vue";
import { jsonClone, genrateUiniqueId } from "@/utils/index.js";

import BottomToolBar from "./bottom-toolbar";

export default {
  name: "MMind",

  components: {
    LabelNode,
    BottomToolBar
  },

  provide() {
    return {
      mindInstance: this
    };
  },

  props: {
    width: {
      type: String,
      default: "800px",
      required: true
    },
    height: {
      type: String,
      default: "600px",
      required: true
    },
    data: Object
  },

  data() {
    return {
      SVG_NS: SVG_NS,
      NODE_TYPE: NODE_TYPE,
      wrapperWidth: 0,
      wrapperHeight: 0,
      currentData: null,
      viewportStartX: 0,
      viewPortStartY: 0,
      viewportWidth: 800,
      viewportHeight: 600,
      scaleWidthSize: 0,
      scaleHeightSize: 0,
      zoomRate: 100,
      isMouseDown: false,
      lastX: 0,
      lastY: 0,
      activeNode: null,
      // 默认配置信息
      DEFAULT_CONFIG: {
        MAX_ZOOM_RATE: 200, // 最大缩放率
        MIN_ZOOM_RATE: 40 // 最小缩放率
      }
    };
  },

  computed: {
    getMindStyle() {
      return {
        width: this.width,
        height: this.height
      };
    },

    getViewBox() {
      return `${this.viewportStartX} ${this.viewPortStartY} ${this.viewportWidth} ${this.viewportHeight}`;
    }
  },

  created() {
    this.currentData = this.initOptions(jsonClone(this.data));

    this.scaleWidthSize = this.viewportWidth / 10;
    this.scaleHeightSize = this.viewportHeight / 10;
  },

  mounted() {
    this._warpper = this.$refs.wrapper;
    const currentData = this.currentData;
    if (this._warpper) {
      // 计算中心节点的位置
      this.wrapperWidth = this._warpper.offsetWidth;
      this.wrapperHeight = this._warpper.offsetHeight;

      currentData.centralNode.x = this.wrapperWidth / 2;
      currentData.centralNode.y = this.wrapperHeight / 2;
    }
  },

  methods: {
    // 初始化数据
    initOptions(data) {
      this.walkNode(data.centralNode);

      const otherNodes = data.otherNodes;
      if (otherNodes && Array.isArray(otherNodes)) {
        otherNodes.forEach(node => {
          this.walkNode(node);
        });
      }

      return data;
    },

    // 遍历数据
    walkNode(node) {
      this.makeUpConfig(node);

      const children = node.children;
      if (children && Array.isArray(children)) {
        children.forEach(c => {
          this.walkNode(c);
        });
      }
    },

    // 补齐配置
    makeUpConfig(node) {
      node.name = node.name || "默认标题";
      node.x = node.x || 0;
      node.y = node.y || 0;
      node.key = node.key || genrateUiniqueId();
      node.width = node.width || 80;
      node.height = node.height || 40;
      node.color = node.color || "#fff";
      node.background = node.background || "#409EFF";
      node.fontSize = node.fontSize || 14;
      node.borderRadius = node.borderRadius || "20px";
      node.children = node.children || [];
    },

    scalePlus() {
      const DEFAULT_CONFIG = this.DEFAULT_CONFIG;

      if (this.zoomRate < DEFAULT_CONFIG.MAX_ZOOM_RATE) {
        this.viewportWidth -= this.scaleWidthSize;
        this.viewportHeight -= this.scaleHeightSize;
        this.zoomRate += 10;

        if (this.viewportWidth <= 0) {
          this.viewportWidth = this.scaleWidthSize;
        }
        if (this.viewportHeight <= 0) {
          this.viewportHeight = this.scaleHeightSize;
        }
      }
    },

    scaleReduce() {
      const DEFAULT_CONFIG = this.DEFAULT_CONFIG;
      if (this.zoomRate > DEFAULT_CONFIG.MIN_ZOOM_RATE) {
        this.viewportWidth += this.scaleWidthSize;
        this.viewportHeight += this.scaleHeightSize;
        this.zoomRate -= 10;
      }
    },

    handleKeyDown(e) {
      const keyCode = e.keyCode || e.which || e.charCode,
        ctrlKey = e.ctrlKey;

      if (ctrlKey && keyCode == 107) {
        //Crtl +
        this.scalePlus();
        e.preventDefault();
      } else if (ctrlKey && keyCode == 109) {
        //Crtl -
        this.scaleReduce();
        e.preventDefault();
      }
    },

    handleMouseDown(e) {
      this.isMouseDown = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    },

    handleMouseMove(e) {
      if (this.isMouseDown) {
        requestAnimationFrame(() => {
          if (this.isMouseDown) {
            const currentX = e.clientX,
              currentY = e.clientY,
              offsetX = currentX - this.lastX,
              offsetY = currentY - this.lastY;

            if (this.activeNode && this.activeNode.isRoot()) {
              this.activeNode.setOffset(offsetX, offsetY);
            } else if (!this.activeNode) {
              this.viewportStartX += offsetX * -1;
              this.viewPortStartY += offsetY * -1;
            }

            this.lastX = currentX;
            this.lastY = currentY;
          }
        });
      }
    },

    handleMouseUp(e) {
      this.isMouseDown = false;
      if (e.target.tagName.toLowerCase() === "svg") {
        this.deleteActiveNode();
      }
    },

    setActiveNode(node) {
      if (this.activeNode) {
        this.deleteActiveNode();
      }
      this.activeNode = node;
      this.activeNode.setActive();
    },

    deleteActiveNode() {
      if (this.activeNode) {
        this.activeNode.deleteActive();
        this.activeNode = null;
      }
    }
  }
};
</script>

<style lang="less">
.m-mind {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  outline: none;

  svg {
    display: block;
    margin: 0;
    padding: 0;
    background: #5c5c5c;

    &:active {
      margin: 0;
      padding: 0;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
