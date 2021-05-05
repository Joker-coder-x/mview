<template>
  <div class="m-collapse-panel" @click="handlePanelClick">
    <div class="header" @click="handleOpen">
      <m-icon
        :name="iconName"
        class="icon"
        style="margin-right:10px;"
        v-if="!hideArrow && arrowPosition === 'front'"
      ></m-icon>
      <slot></slot>
      <m-icon
        :name="iconName"
        class="icon"
        v-if="!hideArrow && arrowPosition === 'behind'"
      ></m-icon>
    </div>
    <transition name="fold">
      <div class="body" v-if="isOpen" :style="getBodyStyle">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import MIcon from "../../icon/index.js";

const ARROW_POSITION_LIST = ["front", "behind"];

export default {
  name: "MCollapsePanel",

  props: {
    hideArrow: {
      type: Boolean,
      default: false
    },
    arrowPosition: {
      type: String,
      default: ARROW_POSITION_LIST[0],
      validator(value) {
        return ARROW_POSITION_LIST.indexOf(value) !== -1;
      }
    },
    name: {
      type: [String, Number],
      default: ""
    }
  },

  data() {
    return {
      isOpen: false,
      iconName: "right",
      isLastChild: false,
      index: ""
    };
  },

  watch: {
    isOpen(newVal) {
      this.iconName = newVal === true ? "down" : "right";
    }
  },

  computed: {
    getBodyStyle() {
      const border = "1px solid #ccc";
      const styleObj = {
        borderLeft: border,
        borderRight: border
      };

      if (this.isLastChild) {
        styleObj.borderBottom = border;
      }

      return styleObj;
    }
  },

  methods: {
    getName() {
      return this.name === "" ? this.index : this.name;
    },

    setLastChildFlag(flag) {
      this.isLastChild = flag;
    },

    setIndex(index) {
      this.index = index;
    },

    handlePanelClick() {
      this.$parent.handlePanelClick(this.getName(), this.isOpen);
    },

    handleOpen() {
      this.isOpen = !this.isOpen;
    }
  },

  mounted() {
    this.$parent.setActive();
  },

  components: {
    MIcon
  }
};
</script>

<style scoped>
.m-collapse-panel {
  cursor: pointer;
  font-size: 15px;
  color: var(--text);
}

.m-collapse-panel .header {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  padding: 10px;
}

.m-collapse-panel .body {
  padding: 15px;
}

.fold-enter-active {
  animation: fold-vertical-in 0.05s reverse;
}

.fold-leave-active {
  animation: fold-vertical-in 0.05s;
}
</style>
