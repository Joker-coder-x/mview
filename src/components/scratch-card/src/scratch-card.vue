<template>
  <div class="m-scratch-card" :style="getScratchCardStyle">
    <canvas
      :id="canvasId"
      class="m-scratch-card-canvas"
      v-draw="handleMove"
      ref="canvas"
      :width="width"
      :height="height"
      >您的浏览器版本过低，暂不支持canvas，请更新您的浏览器。</canvas
    >
    <div class="m-scratch-card-result">
      <slot>
        <h1>就你个臭屌丝还想中奖？下辈子吧!</h1>
      </slot>
    </div>
  </div>
</template>

<script>
import { genrateUiniqueId } from "@/utils/index.js";

//导入自定义指令
import Draw from "./directives/draw.js";

function getMousePosOfCanvas(canvas, clientX, clientY) {
  let x, y;
  x = clientX - canvas.getBoundingClientRect().left;
  y = clientY - canvas.getBoundingClientRect().top;
  return { x, y };
}

function drawPoint(context, x, y, brushSize = 10) {
  context.fillStyle = "white";
  context.beginPath();
  context.arc(x, y, brushSize, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}

export default {
  name: "MScratchCard",

  directives: { Draw },

  props: {
    canvasId: {
      type: String,
      default: genrateUiniqueId()
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    //最顶层的覆盖颜色
    maskColor: {
      type: String,
      default: "#aaa"
    },
    //笔刷的大小 单位像素
    brushSize: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      canvas: null,
      context: null
    };
  },

  computed: {
    getScratchCardStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    }
  },

  methods: {
    getMousePosOfCanvas(clientX, clientY) {
      return getMousePosOfCanvas(this.canvas, clientX, clientY);
    },

    drawPoint(x, y) {
      return drawPoint(this.context, x, y);
    },

    handleMove(e) {
      const { x, y } = this.getMousePosOfCanvas(e.clientX, e.clientY);
      this.drawPoint(x, y, this.brushSize);
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = this.maskColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = "destination-out";
  }
};
</script>

<style scoped>
.m-scratch-card {
  position: relative;
  display: inline-block;
}

.m-scratch-card-canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  cursor: pointer;
}

.m-scratch-card-result {
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
