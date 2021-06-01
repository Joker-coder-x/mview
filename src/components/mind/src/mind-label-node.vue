<template>
  <g class="m-mind-node">
    <g class="m-mind-node__content" @mousedown="handleNodeClick">
      <foreignObject
        :x="currentValue.x"
        :y="currentValue.y"
        :class="{ active: active }"
        :width="currentValue.width"
        :height="currentValue.height"
      >
        <div
          :style="getStyle"
          @dblclick="handleDblClick"
          :draggable="!isRoot()"
          @dragstart="handleDragStart"
          @dragover="allowDrag"
        >
          <input
            @focus="handleFocus"
            @input="handleInput"
            style="padding:5px;"
            ref="inputEl"
            :value="currentValue.name"
          />
          <!-- <span>你好</span> -->
          <!-- <span
            contenteditable="true"
            @focus="handleFocus"
            @input="handleInput"
            style="padding:5px;"
            ref="inputEl"
            >{{ currentValue.name }}</span
          > -->
        </div>
      </foreignObject>
    </g>
    <g class="m-mind-node__children">
      <polyline
        :points="points"
        style="fill:none; stroke:#E8EAEC;stroke-width:2"
      ></polyline>
      <m-mind-label-node
        v-for="(c, index) in currentValue.children"
        v-model="currentValue.children[index]"
        :key="c.key"
      ></m-mind-label-node>
    </g>
  </g>
</template>

<script>
import { selectNodeContents, getTreeChildNodeCount } from "./util.js";
import { jsonClone } from "@/utils/index.js";

export default {
  name: "MMindLabelNode",

  inject: ["mindInstance"],

  props: {
    value: {
      type: Object
    }
  },

  data() {
    return {
      currentValue: jsonClone(this.value),
      points: "",
      childNodeCount: 0,
      active: false,
      isDblClick: false
    };
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.currentValue = jsonClone(val);
      }
    },

    currentValue: {
      deep: true,
      immediate: true,
      handler(val) {
        // this.$emit("input", val);
        // this.$emit("update:value", val);
        this.updateLayout();
        this.childNodeCount = getTreeChildNodeCount(val);
      }
    }
  },

  computed: {
    getStyle() {
      const currentValue = this.currentValue;

      return {
        color: currentValue.color,
        fontSize: currentValue.fontSize + "px",
        background: currentValue.background,
        borderRadius: currentValue.borderRadius,
        width: "100%",
        height: "100%"
      };
    }
  },

  created() {
    this.childNodeCount = getTreeChildNodeCount(this.currentValue);
  },

  methods: {
    isRoot() {
      return this.$parent.$options.name !== this.$options.name;
    },

    setOffset(offsetX, offsetY) {
      this.currentValue.x += offsetX;
      this.currentValue.y += offsetY;

      const data = jsonClone(this.currentValue);
      this.$emit("input", data);
      this.$emit("update:value", data);
    },

    setActive() {
      this.active = true;
    },

    deleteActive() {
      this.active = false;
    },

    handleDblClick() {
      this.isDblClick = true;

      const inputEl = this.$refs.inputEl;
      if (inputEl) {
        inputEl.focus();
      }
    },
    handleFocus(e) {
      const target = e.target;
      if (!this.isDblClick) {
        target.blur();
        return;
      }

      this.isDblClick = false;
      selectNodeContents(target);
    },
    handleInput(e) {
      console.log("222222222");
      const name = e.target.value;

      console.log(name);
      this.currentValue.name = name;
      const textWidth = name.length * this.currentValue.fontSize;
      this.currentValue.width = textWidth + 30;
      // this.$emit("input", this.currentValue);
    },

    updateLayout() {
      const currentValue = this.currentValue,
        x = currentValue.x,
        y = currentValue.y,
        gutter = 50,
        children = this.currentValue.children;

      if (children && children.length) {
        const totalChildWidth = children.reduce((a, b) => a + b.width, 0);
        const totalWidth = totalChildWidth + (children.length - 1) * gutter;
        const centerX = x + currentValue.width / 2;
        const centerY = y + currentValue.height / 2;

        let startX = centerX - totalWidth / 2;
        const pointStartY = centerY + currentValue.height / 2;
        const middleY = centerY + 50;
        let points = `${centerX},${pointStartY} ${centerX},${middleY}`;

        children.forEach(c => {
          c.y = y + 100;
          c.x = startX;
          const pointX = c.x + c.width / 2;
          points += ` ${pointX},${middleY} ${pointX},${c.y} ${pointX},${middleY} `;
          startX += c.width + gutter;
        });
        this.points = points;
      }
    },

    handleNodeClick() {
      this.mindInstance.setActiveNode(this);
    },

    handleDragStart() {
      console.log("start drag");
    },

    allowDrag(e) {
      if (!this.isRoot()) {
        e.preventDefault();
      }
    }
  }
};
</script>

<style lang="less">
.m-mind-node div {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
}

.active {
  border: 2px solid #60a5ee !important;
}

.m-mind-node input {
  border: none;
  outline: none;
  background: none;
  width: 100%;
  text-align: center;
  color: white;
  cursor: pointer;
}

.m-mind-node input:focus {
  background: #fff;
  color: #555;
}

.polyline {
  position: relative;
  z-index: -10;
}
</style>
